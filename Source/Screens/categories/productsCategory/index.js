import { View, Text, TouchableOpacity, Pressable, InteractionManager, FlatList } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import { COLORS, Height, Width } from '../../../constants';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import CustomProductCard from '../../../Components/productCard';
import CustomBottomSheet from '../../../Components/modals/bottomSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../product/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import CustomSearch from '../../../Components/searchInput';
import { fetchGetSegmentsByCategory } from '../../../redux/slices/segmentSlice';
import { fetchProductsBySegment, clearSegmentProducts } from '../../../redux/slices/productBySegmentSlice';
import { fetchProductsByBrand } from '../../../redux/slices/productsByBrandSlice';
import SortBottomSheet from '@components/modals/sortBottomsheet';
import { formateSubCategoryProducts, formateSubCategorySegments, formatProductBySegment } from '../../../utils/dataFormatters';

const MemoizedProductCard = React.memo(CustomProductCard);

const ProductCategoryScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData, brandId } = route?.params || {};
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [customFormattedProducts, setCustomFormattedProducts] = useState([]);
  const isMounted = useRef(true);

  const [filters, setFilters] = useState({ colors: [], sizes: [], brands: [], isNew: false, isPopular: false });
  const [sortOption, setSortOption] = useState('Popular');

  const dispatch = useDispatch();

  const { productsBySubcategory, loading: productsLoading, error: productsError } = useSelector(state => state.subCategoryProducts);
  const { segmentsByCategory, loading: segmentsLoading } = useSelector(state => state.segment);
  const { brandProducts, loading: brandLoading } = useSelector(state => state.productsByBrand);
  const { segmentProducts } = useSelector(state => state.productsBySegment);

  const products = useMemo(() => productsBySubcategory[selectedCategory] || [], [productsBySubcategory, selectedCategory]);
  const segments = useMemo(() => (segmentsByCategory && segmentsByCategory.segments) ? segmentsByCategory.segments : [], [segmentsByCategory]);

 const formattedSegments = useMemo(() => {
  if (brandId) {
    const availableSegments = brandProducts?.segments?.filter(seg => seg?.isAvailable) || [];
    return formateSubCategorySegments(availableSegments);
  }

  const availableSegments = (segments || [])?.filter(seg => seg?.isAvailable);
  return formateSubCategorySegments(availableSegments);
}, [segments, brandId, brandProducts]);


  const modifiedformattedSegments = useMemo(() => ([
    ...formattedSegments.filter(item => item.isAvailable),
    { _id: 'all-icons', name: 'All', icon: require('../../../../assets/Icons/AlIcons.png'), isAllIcon: true },
  ]), [formattedSegments]);

  const formattedProducts = useMemo(() => formatProductBySegment(segmentProducts || []), [segmentProducts]);
  const formattedBrandProducts = useMemo(() => brandProducts || [], [brandProducts]);

  const filterOptions = useMemo(() => {
    const brands = new Set();
    let hasNewProducts = false;
    let hasPopularProducts = false;
    const productsToUse = (selectedSegment && selectedSegment !== "all-icons") ? (segmentProducts || []) : (products || []);
    const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    for (let i = 0; i < productsToUse.length; i++) {
      const product = productsToUse[i];
      if (product?.brand?.name) brands.add(product.brand.name);
      if (!hasNewProducts && product?.createdAt && (new Date(product.createdAt) > oneMonthAgo)) hasNewProducts = true;
      if (!hasPopularProducts && (product.isBestSeller || (product.rating || 0) >= 4)) hasPopularProducts = true;
      if (hasNewProducts && hasPopularProducts) break;
    }

    return { brands: Array.from(brands).sort(), hasNewProducts, hasPopularProducts };
  }, [products, segmentProducts, selectedSegment]);

  const filteredProducts = useMemo(() => {
    const src = (selectedSegment && selectedSegment !== "all-icons") ? (segmentProducts || []) : (products || []);
    if (!src || src.length === 0) return [];
    let result = src.slice();

    switch (sortOption) {
      case 'Price: Low to High': result.sort((a,b) => (a.offerPrice||a.mrp||0)-(b.offerPrice||b.mrp||0)); break;
      case 'Price: High to Low': result.sort((a,b) => (b.offerPrice||b.mrp||0)-(a.offerPrice||a.mrp||0)); break;
      case 'Discount': result.sort((a,b) => (b.discountPercent||0)-(a.discountPercent||0)); break;
      case 'Rating: High to Low': result.sort((a,b) => (b.rating||0)-(a.rating||0)); break;
      case 'Rating: Low to High': result.sort((a,b) => (a.rating||0)-(b.rating||0)); break;
      case 'Best Seller': result.sort((a,b) => (b.isBestSeller?1:0)-(a.isBestSeller?1:0)); break;
      case 'Popular':
      default: result.sort((a,b) => (b.isBestSeller?1:0)-(a.isBestSeller?1:0)); break;
    }

    if (filters.colors.length > 0) result = result.filter(p => p.variants?.some(v => filters.colors.includes((v.color||'').trim())));
    if (filters.sizes.length > 0) result = result.filter(p => p.variants?.some(v => (v.size||'').split(',').some(s => filters.sizes.includes(s.trim()))));
    if (filters.brands.length > 0) result = result.filter(p => p.brand?.name && filters.brands.includes(p.brand.name));
    if (filters.isNew) { const oneMonthAgo = new Date(); oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); result = result.filter(p => p.createdAt && (new Date(p.createdAt) > oneMonthAgo)); }
    if (filters.isPopular) result = result.filter(p => p.isBestSeller);

    return result;
  }, [products, segmentProducts, filters, sortOption, selectedSegment]);

  const availableSortOptions = useMemo(() => {
    const src = products || [];
    if (!src.length) return ['Popular'];
    const hasOfferPrice = src.some(p => p.offerPrice || p.mrp);
    const hasDiscount = src.some(p => (p.discountPercent || 0) > 0);
    const hasRating = src.some(p => (p.rating || 0) > 0);
    const hasBestSeller = src.some(p => p.isBestSeller);
    const options = ['Popular'];
    if (hasOfferPrice) options.push('Price: Low to High','Price: High to Low');
    if (hasDiscount) options.push('Discount');
    if (hasBestSeller) options.push('Best Seller');
    if (hasRating) options.push('Rating: High to Low','Rating: Low to High');
    return options;
  }, [products]);

  const resetFilters = useCallback(() => {
    setFilters({ colors: [], sizes: [], brands: [], isNew: false, isPopular: false });
    setSortOption('Popular');
  }, []);

  const handleSegmentSelect = useCallback((segmentId) => {
    setSelectedSegment(segmentId);
    if (segmentId === "all-icons") {
      InteractionManager.runAfterInteractions(() => {
        if (!isMounted.current) return;
        const formatted = formateSubCategoryProducts(filteredProducts || []);
        setCustomFormattedProducts(formatted);
      });
    } else {
      dispatch(clearSegmentProducts());
      dispatch(fetchProductsBySegment(segmentId));
    }
  }, [dispatch, filteredProducts]);

  const fetchBrandProducts = useCallback(async () => {
    if (!brandId) return; 
    setError(null);
    try { await dispatch(fetchProductsByBrand(brandId)); } 
    catch { if (!isMounted.current) return; setError('Failed to load brand products'); } 
    finally { if (!isMounted.current) return; setPageLoading(false); }
  }, [brandId, dispatch]);

  const fetchCategoryData = useCallback(async () => {
    if (!selectedCategory) return; 
    setError(null);
    try { await Promise.all([ dispatch(fetchProductsBySubcategory(selectedCategory)), dispatch(fetchGetSegmentsByCategory(selectedCategory)) ]); } 
    catch { if (!isMounted.current) return; setError('Failed to load category products or segments'); } 
    finally { if (!isMounted.current) return; setPageLoading(false); }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    isMounted.current = true;
    if (brandId) { setSelectedSegment(null); fetchBrandProducts(); } 
    else if (selectedCategory) fetchCategoryData(); 
    else setPageLoading(false);
    return () => { isMounted.current = false; };
  }, [brandId, selectedCategory, fetchBrandProducts, fetchCategoryData]);

  useEffect(() => {
    if (selectedSegment === 'all-icons') {
      InteractionManager.runAfterInteractions(() => {
        if (!isMounted.current) return;
        const formatted = formateSubCategoryProducts(filteredProducts || []);
        setCustomFormattedProducts(formatted);
      });
    } else { setCustomFormattedProducts([]); }
  }, [filteredProducts, selectedSegment]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true); 
    setError(null);
    try { if (brandId) await fetchBrandProducts(); else if (selectedCategory) await fetchCategoryData(); } 
    catch { if (!isMounted.current) return; setError('Failed to refresh data'); } 
    finally { if (!isMounted.current) return; setRefreshing(false); }
  }, [brandId, selectedCategory, fetchBrandProducts, fetchCategoryData]);

  const handleSortApply = useCallback((option) => { setSortOption(option); setSortSheetVisible(false); }, []);
  const handleFilterApply = useCallback((newFilters) => { setFilters(newFilters); setShowSheet(false); }, []);

  const renderHeader = () => (
    <View>
      <View style={styles.headerView}>
        <CustomHeader showCartIcon navigation={navigation} label={categoryData?.name || 'Products'} />
        <View style={styles.searchView}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <CustomSearch
              disabledStyle={styles.disabledStyle}
              WidthSize={'98%'}
              backgroundColor={'#fff'}
              disabled
              containerStyle={styles.searchInput}
              inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2 }}
            />
          </Pressable>
        </View>
      </View>
      {formattedSegments.length > 0 && (
        <View style={styles.categoryList}>
          <CustomCategoryList
            width={53}
            height={53}
            gap={10}
            horizontal
            borderRadius={32}
            data={modifiedformattedSegments}
            colors={['#2E6074', '#3CAEA3']}
            textStyle={styles.text}
            selected={selectedSegment}
            onSelect={handleSegmentSelect}
            selectedBorderColor={COLORS.green}
            bgColor="#D4E7F2"
            imageSize={38}
            imageStyle={styles.imageStyle}
          />
        </View>
      )}
    </View>
  );

  if (pageLoading) return <FullScreenLoader />;

  let productData = [];
  if (brandId) productData = formattedBrandProducts;
  else if (selectedSegment) productData = selectedSegment === "all-icons" ? customFormattedProducts : formattedProducts;
  else productData = formateSubCategoryProducts(filteredProducts);

  const renderEmpty = () => (
    <View style={styles.emptyStateContainer}>
      <Icon name="package-variant-closed-remove" size={40} color="#888" />
      <Text style={styles.emptyStateText}>No products available in this category</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Browse Other Categories</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SortBottomSheet 
        visible={sortSheetVisible} 
        onClose={() => setSortSheetVisible(false)}
        onApply={handleSortApply}
        selectedOption={sortOption}
        options={availableSortOptions}
      />

      <CustomBottomSheet 
        visible={showSheet} 
        onClose={() => setShowSheet(false)}
        onApply={handleFilterApply}
        initialFilters={filters}
        filterOptions={filterOptions}
        products={(selectedSegment && selectedSegment !== 'all-icons') ? (segmentProducts || []) : products}
        onReset={resetFilters}
      />

     <FlatList
        ListHeaderComponent={renderHeader}
        data={productData?.filter(item => item?.isEnable)} 
        keyExtractor={(item, index) => item._id || index.toString()}
        numColumns={2}
        
        renderItem={({ item }) => (
          <MemoizedProductCard
            imageSize={Width(130)}
            navigation={navigation}
            bgColor="#D4DEF226"
            horizontal={false}
            data={[item]}
          />
        )}
        contentContainerStyle={{ paddingBottom: Height(50) }}
        ListEmptyComponent={productData?.length === 0 ? renderEmpty : null}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    
    </View>
  );
}

export default ProductCategoryScreen;
