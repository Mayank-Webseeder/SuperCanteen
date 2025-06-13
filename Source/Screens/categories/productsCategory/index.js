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
import { fetchProductsByBrand  } from '../../../redux/slices/productsByBrandSlice';
import SortBottomSheet from '@components/modals/sortBottomsheet';

const ProductCategoryScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData, brandId } = route?.params || {};
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);


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
  const formattedSegments = useMemo(() => formateSubCategorySegments(segments), [segments]);
  const formattedProducts = useMemo(() => formatProductBySegment(segmentProducts), [segmentProducts]);
  const formattedBrandProducts = useMemo(() => brandProducts, [brandProducts]);

  // Filter options extraction with memoization
  const filterOptions = useMemo(() => {
    const brands = new Set();
    const colors = new Set();
    const sizes = new Set();
    let hasNewProducts = false;
    let hasPopularProducts = false;

    products.forEach(product => {
      if (product.brandName) brands.add(product.brandName);
      
      product.variants?.forEach(variant => {
        if (variant.color && variant.color.trim() !== '') {
          colors.add(variant.color.trim());
        }
        if (variant.size) {
          variant.size.split(',').forEach(size => {
            const trimmedSize = size.trim();
            if (trimmedSize !== '') sizes.add(trimmedSize);
          });
        }
      });
      
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      if (new Date(product.createdAt) > oneMonthAgo) hasNewProducts = true;
      
      if (product.isBestSeller) hasPopularProducts = true;
    });

    return {
      brands: Array.from(brands).filter(Boolean),
      colors: Array.from(colors).filter(Boolean),
      sizes: Array.from(sizes).filter(Boolean),
      hasNewProducts,
      hasPopularProducts
    };
  }, [products]);

  // Apply filters and sorting with memoization
  const filteredProducts = useMemo(() => {
    if (products.length === 0) return [];

    let result = [...products];

    // Apply filters
    if (filters.colors.length > 0) {
      result = result.filter(product => 
        product.variants?.some(variant => 
          variant.color && filters.colors.includes(variant.color.trim())
        )
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter(product => 
        product.variants?.some(variant => {
          if (!variant.size) return false;
          const sizes = variant.size.split(',').map(s => s.trim());
          return sizes.some(size => filters.sizes.includes(size));
        })
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter(product => 
        product.brandName && filters.brands.includes(product.brandName)
      );
    }

    if (filters.isNew) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      result = result.filter(product => 
        new Date(product.createdAt) > oneMonthAgo
      );
    }

    if (filters.isPopular) {
      result = result.filter(product => product.isBestSeller);
    }

    // Apply sorting
    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
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

    return result;
  }, [products, filters, sortOption]);

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
    dispatch(clearSegmentProducts());
    dispatch(fetchProductsBySegment(segmentId));
  }, [dispatch]);

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
      fetchBrandProducts();
    } else if (selectedCategory) {
      fetchCategoryData();
    }
  }, [brandId, selectedCategory, fetchBrandProducts, fetchCategoryData]);

  // Set initial segment when segments load
  useEffect(() => {
    if (!segmentsLoading && segments.length > 0 && selectedSegment === null) {
      setSelectedSegment(segments[0]._id);
    }
  }, [segmentsLoading, segments, selectedSegment]);

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

  // Render sections
  const renderSection = useCallback(({ item }) => item, []);
  
  const sections = useMemo(() => [
    <View key="product-category-content">
      {/* Header */}
      <View style={styles.headerView}>
        <CustomHeader navigation={navigation} label={categoryData?.name || 'Products'} />
        <View style={styles.searchView}>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <CustomSearch
              disabledStyle={styles.disabledStyle}
              WidthSize={'98%'}
              backgroundColor={'#fff'}
              disabled
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
            gap={15}
            horizontal={true}
            borderRadius={32}
            data={formattedSegments}
            colors={['#2E6074', '#3CAEA3']}
            textStyle={styles.text}
            selected={selectedSegment}
            onSelect={handleSegmentSelect}
            selectedBorderColor={COLORS.green}
            bgColor="#D4E7F2"
            imageSize={38}
          />
        </View>
      )}

      {/* Filter Buttons */}
      <View style={styles.bottomSheetContainer}>
        <SortBottomSheet 
          visible={sortSheetVisible} 
          onClose={() => setSortSheetVisible(false)}
          onApply={handleSortApply}
          selectedOption={sortOption}
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
          title="Filter"
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
      </View>

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
        formattedProducts?.length > 0 ? (
          <View style={styles.mainContainer}>
            <CustomProductCard
              height={Height(120)}
              imageSize={Width(130)}
              navigation={navigation}
              bgColor="#D4DEF226"
              numColumns={2}
              width={Width(140)}
              horizontal={false}
              data={formattedProducts}
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
    filteredProducts
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
        />
      </PullToRefresh>
    </View>
  );
};

export default ProductCategoryScreen;