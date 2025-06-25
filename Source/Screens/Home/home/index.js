import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Height } from '@constants';
import Header from '../../../otherComponents/home/header';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import ProductCategories from '../../../otherComponents/home/productCategories';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import ErrorView from '../../../Components/Common/errorView';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import { styles } from './styles';
import { COLORS } from '@constants/index';

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const dispatch = useDispatch();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);

  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useSelector((state) => state.subCategory);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  // Handle errors
  useEffect(() => {
    const apiError = categoriesError || subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
    }
  }, [categoriesError, subCategoriesError, productsError]);

  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    setError(null);
    try {
      await Promise.all([
        dispatch(getCategories()),
        dispatch(getSubCategories())
      ]);
      setInitialLoadComplete(true);
    } catch (err) {
      setError('Failed to load initial data');
    }
  }, [dispatch]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      await Promise.all([
        dispatch(getCategories()),
        selectedCategoryIndex && dispatch(getProductsByCategory(selectedCategoryIndex)),
        dispatch(getSubCategories())
      ]);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, selectedCategoryIndex]);

  // Set initial category when categories are loaded
  useEffect(() => {
    if (categories?.length > 0 && selectedCategoryIndex === null) {
      setSelectedCategoryIndex(categories[0]._id);
    }
  }, [categories, selectedCategoryIndex]);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategoryIndex && initialLoadComplete) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, [selectedCategoryIndex, dispatch, initialLoadComplete]);

  // Initial data load
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Memoized filtered data
  const filteredSubcategories = useMemo(() => {
    if (!subCategories || !selectedCategoryIndex) return [];
    return subCategories.filter(item => item.category?._id === selectedCategoryIndex);
  }, [subCategories, selectedCategoryIndex]);

  const brands = useMemo(() => {
    if (!products) return [];
    const brandMap = {};
    products.forEach(product => {
      if (product.brand && !brandMap[product.brand._id]) {
        brandMap[product.brand._id] = product.brand;
      }
    });
    return Object.values(brandMap);
  }, [products]);

  // Loading states
  const isLoading = useMemo(() => {
    return categoriesLoading || subCategoriesLoading || productsLoading;
  }, [categoriesLoading, subCategoriesLoading, productsLoading]);

  // Header component
  const stickyHeader = (
    <View style={{ backgroundColor: '#A3B9C3' }}>
      <LinearGradient
        colors={['#A3B9C3', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientHeader}
      >
        <Header navigation={navigation} />
      </LinearGradient>
    </View>
  );

  // Skeleton loader for different sections
  const renderSkeleton = () => (
    <>
      {/* Categories Skeleton */}
      <View style={styles.skeletonCategoryContainer}>
        {[...Array(5)].map((_, i) => (
          <View key={i} style={styles.skeletonCategory} />
        ))}
      </View>
      
      {/* Brands Skeleton */}
      <HorizontalLine lineStyle={styles.lineStyle} />
      <View style={styles.skeletonBrandContainer}>
        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.skeletonBrand} />
        ))}
      </View>
      
      {/* Products Skeleton */}
      <HorizontalLine lineStyle={styles.horizontalLine} />
      <View style={styles.skeletonProductContainer}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.skeletonProduct} />
        ))}
      </View>
    </>
  );

  // Main content
  const renderMainContent = () => {
    if (error) {
      return (
        <ErrorView 
          message={error} 
          onRetry={handleRefresh} 
          containerStyle={{ marginVertical: Height(20) }} 
        />
      );
    }

    if (!initialLoadComplete || isLoading) {
      return renderSkeleton();
    }

    if (categories?.length === 0) {
      return (
        <ErrorView 
          message="No categories available" 
          onRetry={handleRefresh} 
          containerStyle={{ marginVertical: Height(20) }} 
        />
      );
    }

    return (
      <>
        <GetCategory
          categories={categories}
          navigation={navigation}
          selectedIndex={selectedCategoryIndex}
          setSelectedIndex={setSelectedCategoryIndex}
        />
        <View style={styles.mainContent}>
          {brands.length > 0 && <HorizontalLine lineStyle={styles.lineStyle} />}
          {brands.length > 0 && (
            <Brandcarousel 
              imageStyle={styles.imageStyle} 
              contentContainerStyle={styles.contentContainerStyle}  
              cardStyle={styles.cardStyle}  
              paginationStyle={styles.paginationStyle} 
              dotStyle={styles.dotStyle} 
              brands={brands} 
            />
          )}
          <HorizontalLine lineStyle={styles.horizontalLine} />
          {filteredSubcategories.length > 0 && (
            <ProductCategories
              navigation={navigation}
              subcategories={filteredSubcategories}
              selectedCategoryId={selectedCategoryIndex}
              selectedCategoryItems={selectedCategoryItems}
              setSelectedCategoryItems={setSelectedCategoryItems}
              gotoScreen={'ProdcutCategory'}
              mainStyle={styles.mainStyle}
            />
          )}
          <HorizontalLine containerStyle={{ marginBottom: 2 }} />
          <ProductCarousel horizontal={true} navigation={navigation} products={products} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[stickyHeader, renderMainContent()]}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.green, COLORS.green]} 
            tintColor="#FFFFFF"
            title="Refreshing..."
            titleColor="#FFFFFF"
          />
        }
      />
    </View>
  );
};

export default HomeScreen;