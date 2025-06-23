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
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [initialCategoriesLoaded, setInitialCategoriesLoaded] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
  useCallback(() => {
    if (categories?.length > 0) {
      setSelectedCategoryIndex(categories[0]._id);
      setSelectedCategoryItems([]);
    }
  }, [categories])
);

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
      // First load categories only
      await dispatch(getCategories());
      setInitialCategoriesLoaded(true);
      
      // Then load other data in background
      dispatch(getSubCategories());
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

  // Set initial category as soon as categories are available
  useEffect(() => {
    if (categories?.length > 0 && selectedCategoryIndex === null) {
      setSelectedCategoryIndex(categories[0]._id);
    }
  }, [categories]);

  // Fetch products when category changes
  useEffect(() => {
    if (selectedCategoryIndex && initialCategoriesLoaded) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, [selectedCategoryIndex, dispatch, initialCategoriesLoaded]);

  // Initial data load
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Memoized filtered data
  const filteredSubcategories = useMemo(() => {
    return subCategories?.filter(item => item.category?._id === selectedCategoryIndex) || [];
  }, [subCategories, selectedCategoryIndex]);

  const brands = useMemo(() => {
    const brandMap = {};
    products?.forEach(product => {
      if (product.brand && !brandMap[product.brand._id]) {
        brandMap[product.brand._id] = product.brand;
      }
    });
    return Object.values(brandMap);
  }, [products]);

  // Loading states
  const showSkeleton = useMemo(() => {
    return (subCategoriesLoading || productsLoading) && initialCategoriesLoaded;
  }, [subCategoriesLoading, productsLoading, initialCategoriesLoaded]);

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

    if (showSkeleton) {
      return <ContentSkeletonLoader type="home" itemCount={3} />;
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
          <Brandcarousel 
            imageStyle={styles.imageStyle} 
            contentContainerStyle={styles.contentContainerStyle}  
            cardStyle={styles.cardStyle}  
            paginationStyle={styles.paginationStyle} 
            dotStyle={styles.dotStyle} 
            brands={brands} 
          />
          <HorizontalLine lineStyle={styles.horizontalLine} />
          <ProductCategories
            navigation={navigation}
            subcategories={filteredSubcategories}
            selectedCategoryId={selectedCategoryIndex}
            selectedCategoryItems={selectedCategoryItems}
            setSelectedCategoryItems={setSelectedCategoryItems}
            gotoScreen={'ProdcutCategory'}
            mainStyle={styles.mainStyle}
          />
          <HorizontalLine containerStyle={{ marginBottom: 2 }} />
          <ProductCarousel horizontal={true} navigation={navigation} products={products} />
        </View>
      </>
    );
  };

  // Only show full screen loader if we don't have categories yet
  if (categoriesLoading && !categories?.length) {
    return <FullScreenLoader />;
  }

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