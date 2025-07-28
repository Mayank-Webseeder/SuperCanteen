import { View, FlatList, Text, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import CustomFilterBtn from '../../../Components/CustomFilterBtn';
import { formateSubCategoryProducts, formateSubCategorySegments, formatProductBySegment } from '../../../utils/dataFormatters';
import CustomSearch from '../../../Components/searchInput'
import { fetchGetSegmentsByCategory } from '../../../redux/slices/segmentSlice';
import { fetchProductsBySegment, clearSegmentProducts } from '../../../redux/slices/productBySegmentSlice';
import EmptyComponent from '@components/emptyComponent';
import { fetchProductsByBrand } from '../../../redux/slices/productsByBrandSlice';
import SortBottomSheet from '@components/modals/sortBottomsheet';

const ProductCategoryScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData, brandId } = route?.params || {};
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [customFormattedProducts, setCustomFormattedProducts] = useState([]);

  // Filter and sort states
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    brands: [],
    isNew: false,
    isPopular: false
  });
  const [sortOption, setSortOption] = useState('Popular');

  const dispatch = useDispatch();
  
  // Redux state selectors with memoization
  const { 
    productsBySubcategory, 
    loading: productsLoading, 
    error: productsError 
  } = useSelector((state) => state.subCategoryProducts);

  const { 
    segmentsByCategory, 
    loading: segmentsLoading 
  } = useSelector((state) => state.segment);

  const {
    brandProducts,
    loading: brandLoading
  } = useSelector((state) => state.productsByBrand);

  const { segmentProducts } = useSelector(state => state.productsBySegment);

  // Memoized data transformations
  const products = useMemo(() => productsBySubcategory[selectedCategory] || [], [productsBySubcategory, selectedCategory]);
  
  const segments = useMemo(() => segmentsByCategory.segments || [], [segmentsByCategory]);
 const formattedSegments = useMemo(() => {
  if (brandId) {
    // Return brand-specific segments if available
    return brandProducts.segments ? formateSubCategorySegments(brandProducts.segments) : [];
  }
  return formateSubCategorySegments(segments);
}, [segments, brandId, brandProducts]);


const modifiedformattedSegments = [
    ...formattedSegments,
    {
      _id: 'all-icons',
      name: 'All',
      icon: require('../../../../assets/Icons/AlIcons.png'),
      isAllIcon: true,
    },
  ];

  const formattedProducts = useMemo(() => formatProductBySegment(segmentProducts), [segmentProducts]);
  const formattedBrandProducts = useMemo(() => brandProducts, [brandProducts]);

  // Filter options extraction with memoization
const filterOptions = useMemo(() => {
  const brands = new Set();
  let hasNewProducts = false;
  let hasPopularProducts = false;

  // Use either segment products or main products
  const productsToUse = selectedSegment && selectedSegment !== "all-icons" 
    ? segmentProducts 
    : products;

  productsToUse.forEach(product => {
    // 1. Extract brands
    if (product.brand?.name) {
      brands.add(product.brand.name);
    }

    // 2. Check for new products (created in last 30 days)
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    if (new Date(product.createdAt) > oneMonthAgo) {
      hasNewProducts = true;
    }

    // 3. Check for popular products
    if (product.isBestSeller || (product.rating || 0) >= 4) {
      hasPopularProducts = true;
    }
  });

  return {
    brands: Array.from(brands).sort(), // Sorted alphabetically
    hasNewProducts,
    hasPopularProducts,
  };
}, [products, segmentProducts, selectedSegment]); // Recompute when these change

  // Apply filters and sorting with memoization
  const filteredProducts = useMemo(() => {
    if (products.length === 0) return [];

    let result = [...products];

    // Sort first
    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => (a.offerPrice || a.mrp) - (b.offerPrice || b.mrp));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => (b.offerPrice || b.mrp) - (a.offerPrice || a.mrp));
        break;
      case 'Discount':
        result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case 'Rating: High to Low':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Rating: Low to High':
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case 'Best Seller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'Popular':
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    // Apply filters after sorting
    if (filters.colors.length > 0) {
      result = result.filter(product =>
        product.variants?.some(variant => {
          const color = typeof variant.color === 'string' ? variant.color.trim() : '';
          return color && filters.colors.includes(color);
        })
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter(product =>
        product.variants?.some(variant => {
          if (typeof variant.size !== 'string') return false;
          const sizes = variant.size.split(',').map(s => s.trim());
          return sizes.some(size => filters.sizes.includes(size));
        })
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter(product =>
        product.brand?.name && filters.brands.includes(product.brand.name)
      );
    }

    if (filters.isNew) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      result = result.filter(product => new Date(product.createdAt) > oneMonthAgo);
    }

    if (filters.isPopular) {
      result = result.filter(product => product.isBestSeller);
    }

    return result;
  }, [products, filters, sortOption]);
  

  // Dynamic Sort Options Based on Available Product Data
  const availableSortOptions = useMemo(() => {
    if (products.length === 0) return ['Popular'];

    const hasOfferPrice = products.some(p => p.offerPrice || p.mrp);
    const hasDiscount = products.some(p => (p.discountPercent || 0) > 0);
    const hasRating = products.some(p => (p.rating || 0) > 0);
    const hasBestSeller = products.some(p => p.isBestSeller === true);

    const options = ['Popular'];

    if (hasOfferPrice) {
      options.push('Price: Low to High', 'Price: High to Low');
    }

    if (hasDiscount) {
      options.push('Discount');
    }

    if (hasBestSeller) {
      options.push('Best Seller');
    }

    if (hasRating) {
      options.push('Rating: High to Low', 'Rating: Low to High');
    }

    return options;
  }, [products]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      colors: [],
      sizes: [],
      brands: [],
      isNew: false,
      isPopular: false
    });
    setSortOption('Popular');
  }, []);

  // Handle segment selection
const handleSegmentSelect = useCallback((segmentId) => {
  setSelectedSegment(segmentId);

  if (segmentId === "all-icons") {
    const formatted = formateSubCategoryProducts(filteredProducts);
    setCustomFormattedProducts(formatted);
  } else {
    dispatch(clearSegmentProducts());
    dispatch(fetchProductsBySegment(segmentId));
  }
}, [dispatch, filteredProducts]);

  // Fetch data functions
  const fetchBrandProducts = useCallback(async () => {
    if (!brandId) return;
    setError(null);
    try {
      await dispatch(fetchProductsByBrand(brandId));
    } catch (err) {
      setError('Failed to load brand products');
    } finally {
      setPageLoading(false);
    }
  }, [brandId, dispatch]);

  const fetchCategoryData = useCallback(async () => {
    if (!selectedCategory) return;
    setError(null);
    try {
      await Promise.all([
        dispatch(fetchProductsBySubcategory(selectedCategory)),
        dispatch(fetchGetSegmentsByCategory(selectedCategory))
      ]);
    } catch (err) {
      setError('Failed to load category products or segments');
    } finally {
      setPageLoading(false);
    }
  }, [selectedCategory, dispatch]);

  // Initial data loading
  useEffect(() => {
    if (brandId) {
      setSelectedSegment(null);
      fetchBrandProducts();
    } else if (selectedCategory) {
      fetchCategoryData();
    }
  },  [brandId, selectedCategory, fetchBrandProducts, fetchCategoryData]);

 useEffect(() => {
  if (selectedSegment === 'all-icons') {
    setCustomFormattedProducts(formateSubCategoryProducts(filteredProducts));
  }
}, [filteredProducts, selectedSegment]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      if (brandId) {
        await fetchBrandProducts();
      } else if (selectedCategory) {
        await fetchCategoryData();
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  }, [brandId, selectedCategory, fetchBrandProducts, fetchCategoryData]);

  // Handle sort apply
  const handleSortApply = useCallback((option) => {
    setSortOption(option);
    setSortSheetVisible(false);
  }, []);

  // Handle filter apply
  const handleFilterApply = useCallback((newFilters) => {
    setFilters(newFilters);
    setShowSheet(false);
  }, []);

  

  // Optimized render sections
  const renderSection = useCallback(({ item }) => item, []);
  
  const sections = useMemo(() => [
    <View key="product-category-content">
      {/* Header */}
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
              inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2}}
            />
          </Pressable>
        </View>
      </View>

      {/* Category List */}
      {formattedSegments.length > 0 && (
        <View style={styles.categoryList}>
          <CustomCategoryList
            width={53}
            height={53}
            gap={10}
            horizontal={true}
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

      {/* Filter Buttons */}
     {!brandId && <View style={styles.bottomSheetContainer}>
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
          products={products}
          onReset={resetFilters}
        />

        <CustomFilterBtn
          title={'Filter'}
          width={80}
          height={30}
          onPress={() => setShowSheet(true)}
          icon={<Icon name="filter-list" size={20} color="#1C1B1F7D" />}
        />

        <CustomFilterBtn
          title="Sort"
          width={80}
          height={30}
          onPress={() => setSortSheetVisible(true)}
          icon={
            <View style={{ transform: [{ rotate: '270deg' }] }}>
              <Icon name="sync-alt" size={20} color="#1C1B1F7D" />
            </View>
          }
        />
      </View> }

      <HorizontalLine />

      {/* Products Section */}
      {brandId ? (
        // Brand products display
        brandLoading ? (
          <ContentSkeletonLoader 
            type="grid" 
            itemCount={4} 
            containerStyle={styles.skeletonContainer}
          />
        ) : formattedBrandProducts?.length > 0 ? (
          <View style={styles.mainContainer}>
            <CustomProductCard
              height={Height(120)}
              imageSize={Width(130)}
              navigation={navigation}
              bgColor="#D4DEF226"
              numColumns={2}
              width={Width(140)}
              horizontal={false}
              data={formattedBrandProducts}
            />
          </View>
        ) : (
          <EmptyComponent resetFilters={resetFilters} />
        )
      ) : productsLoading ? (
        <ContentSkeletonLoader 
          type="grid" 
          itemCount={4} 
          containerStyle={styles.skeletonContainer}
        />
      ) : error ? (
        <ErrorView
          message={error}
          onRetry={handleRefresh}
          containerStyle={styles.errorContainer}
        />
      ) : selectedSegment ? (
     (selectedSegment === "all-icons" ? customFormattedProducts : formattedProducts)?.length > 0 ? (
          <View style={styles.mainContainer}>
            <CustomProductCard
              height={Height(120)}
              imageSize={Width(130)}
              navigation={navigation}
              bgColor="#D4DEF226"
              numColumns={2}
              width={Width(140)}
              horizontal={false}
           data={selectedSegment === "all-icons" ? customFormattedProducts : formattedProducts}
            />
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Icon name="package-variant-closed-remove" size={40} color="#888" />
            <Text style={styles.emptyStateText}>
              No products available in this category
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Search')}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Browse Other Categories</Text>
            </TouchableOpacity>
          </View>
        )
      ) : filteredProducts.length > 0 ? (
        <View style={styles.mainContainer}>
          <CustomProductCard
            height={Height(120)}
            imageSize={Width(130)}
            navigation={navigation}
            bgColor="#D4DEF226"
            numColumns={2}
            width={Width(140)}
            horizontal={false}
            data={formateSubCategoryProducts(filteredProducts)}
          />
        </View>
      ) : (
        <EmptyComponent resetFilters={resetFilters} />
      )}
    </View>
  ], [
    navigation, 
    categoryData, 
    formattedSegments, 
    selectedSegment, 
    handleSegmentSelect,
    sortSheetVisible, 
    handleSortApply, 
    showSheet, 
    handleFilterApply, 
    filters, 
    filterOptions, 
    products, 
    resetFilters,
    brandId,
    brandLoading,
    formattedBrandProducts,
    productsLoading,
    error,
    handleRefresh,
    formattedProducts,
    filteredProducts,
    availableSortOptions
  ]);

  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Height(20) }}
          windowSize={5}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={100}
        />
      </PullToRefresh>
    </View>
  );
};

export default ProductCategoryScreen;