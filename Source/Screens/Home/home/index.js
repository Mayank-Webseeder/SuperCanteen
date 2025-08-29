import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Animated,
  InteractionManager,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../../otherComponents/home/header';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import SectionRenderer from '../../../otherComponents/home/sections';
import { styles } from './styles';
import { COLORS } from '@constants/index';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import EmptyState from '@components/emptyComponent/EmptyState';
import { fetchSections } from '../../../redux/slices/sectionSlice';
import ModernProductGrid from '../../../otherComponents/home/productCard';
import { getAllProducts, resetProducts } from '../../../redux/slices/allProductsSlice';
import ContentSkeletonLoader from '@components/Common/contentSkeletonLoader';
const DATA_CACHE_TIME = 5 * 60 * 1000;

const HomeScreen = ({ navigation, route }) => {
  // State management
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [viewMode, setViewMode] = useState('all');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  // Refs for cleanup and caching
  const isMountedRef = useRef(true);
  const dataCacheRef = useRef({
    categories: null,
    subCategories: null,
    sections: null,
    timestamp: 0
  });

  const dispatch = useDispatch();

  // Redux selectors
  const { categories, loading: categoriesLoading, error: categoriesError } = 
    useSelector(state => state.category, shallowEqual);
  const { subCategories, loading: subCategoriesLoading, error: subCategoriesError } = 
    useSelector(state => state.subCategory, shallowEqual);
  const { products, loading: productsLoading, error: productsError } = 
    useSelector(state => state.product, shallowEqual);
  const { items, loading: allProductsLoading, page, pagination, limit } = 
    useSelector(state => state.allProducts);
  const { items: sections, loading: sectionsLoading } = 
    useSelector(state => state.section, shallowEqual);

  // Track mount state
  useEffect(() => {
    isMountedRef.current = true;
    
    const now = Date.now();
    if (dataCacheRef.current.timestamp > 0 && 
        now - dataCacheRef.current.timestamp < DATA_CACHE_TIME) {
      setIsReady(true);
      setInitialLoadComplete(true);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Initial data load
  useEffect(() => {
    const now = Date.now();
    if (now - dataCacheRef.current.timestamp > DATA_CACHE_TIME) {
      dispatch(resetProducts());
      dispatch(getAllProducts({ page: 1, limit: 20 }));
    }
  }, []);

  // Data loading with useFocusEffect
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const now = Date.now();
          const isDataFresh = now - dataCacheRef.current.timestamp < DATA_CACHE_TIME;
          
          if (isDataFresh && dataCacheRef.current.categories) {
            if (isActive && isMountedRef.current) {
              setInitialLoadComplete(true);
              setIsReady(true);
            }
            return;
          }

          const promises = [];
          let needsFetch = false;

          if (!categories?.length || !isDataFresh) {
            promises.push(dispatch(getCategories()));
            needsFetch = true;
          }
          if (!subCategories?.length || !isDataFresh) {
            promises.push(dispatch(getSubCategories()));
            needsFetch = true;
          }
          if (!sections?.length || !isDataFresh) {
            promises.push(dispatch(fetchSections()));
            needsFetch = true;
          }

          if (needsFetch) {
            await Promise.all(promises);
            dataCacheRef.current = {
              categories: categories,
              subCategories: subCategories,
              sections: sections,
              timestamp: Date.now()
            };
          }

          if (isActive && isMountedRef.current) {
            setInitialLoadComplete(true);
            setIsReady(true);
            setLastFetchTime(Date.now());
          }
        } catch (error) {
          console.error('Data fetch error:', error);
          if (isActive && isMountedRef.current) setIsReady(true);
        }
      };

      const timeoutId = setTimeout(() => {
        InteractionManager.runAfterInteractions(fetchData);
      }, 300);

      return () => {
        isActive = false;
        clearTimeout(timeoutId);
      };
    }, [categories, subCategories, sections])
  );

  // Auto-refresh interval
  useEffect(() => {
    let interval;
    if (viewMode === 'category' && selectedCategoryIndex) {
      interval = setInterval(() => {
        const now = Date.now();
        if (now - lastFetchTime > DATA_CACHE_TIME) {
          dispatch(getProductsByCategory(selectedCategoryIndex));
          setLastFetchTime(now);
        }
      }, DATA_CACHE_TIME);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedCategoryIndex, viewMode, lastFetchTime]);

  const handleCategoryChange = useCallback((categoryId) => {
    const category = categories?.find(c => c._id === categoryId);
    
    if (categoryId !== selectedCategoryIndex) {
      setIsReady(false);
      setSelectedCategoryIndex(categoryId);
      setViewMode('category');
      
      dispatch(getProductsByCategory(categoryId))
        .then(() => {
          if (isMountedRef.current) setIsReady(true);
        })
        .catch(() => {
          if (isMountedRef.current) setIsReady(true);
        });
    }
    
    if (category) {
      navigation.navigate('categoryProductsScreen', { 
        categoryId: categoryId,
        category: category
      });
    }
  }, [navigation, categories, selectedCategoryIndex]);

  const handleShowAllProducts = useCallback(() => {
    setViewMode('all');
    setSelectedCategoryIndex(null);
    setIsReady(false);
    
    dispatch(getAllProducts({ page: 1, limit: 20 }))
      .then(() => {
        if (isMountedRef.current) setIsReady(true);
      })
      .catch(() => {
        if (isMountedRef.current) setIsReady(true);
      });
  }, [dispatch]);

  // Fade-in animation when content is ready
  useEffect(() => {
    if (isReady) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isReady, opacity]);

  const handleRefresh = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setRefreshing(true);
    try {
      dataCacheRef.current = {
        categories: null,
        subCategories: null,
        sections: null,
        timestamp: 0
      };

      const promises = [
        dispatch(getCategories()),
        dispatch(getSubCategories()),
        dispatch(fetchSections()),
      ];

      if (viewMode === 'all') {
        promises.push(dispatch(getAllProducts({ page: 1, limit: 20 })));
      } else if (viewMode === 'category' && selectedCategoryIndex) {
        promises.push(dispatch(getProductsByCategory(selectedCategoryIndex)));
      }

      await Promise.all(promises);
      setLastFetchTime(Date.now());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => {
        if (isMountedRef.current) {
          setRefreshing(false);
        }
      }, 1000);
    }
  }, [dispatch, selectedCategoryIndex, viewMode]);

  const loadMore = useCallback(() => {
    if (viewMode === 'all' && !allProductsLoading && !isLoadingMore && 
        pagination && page < pagination.totalPages) {
      setIsLoadingMore(true);
      dispatch(getAllProducts({ page: page + 1, limit }))
        .finally(() => setIsLoadingMore(false));
    }
  }, [allProductsLoading, isLoadingMore, pagination, page, limit, viewMode, dispatch]);

  // Memoized data
  const filteredSubcategories = useMemo(() => {
    if (!subCategories || !selectedCategoryIndex) return [];
    return subCategories.filter(item => item.category?._id === selectedCategoryIndex);
  }, [subCategories, selectedCategoryIndex]);

  const brands = useMemo(() => {
    if (!products) return [];
    const seen = new Set();
    return products.reduce((acc, product) => {
      if (product.brand && !seen.has(product.brand._id)) {
        seen.add(product.brand._id);
        acc.push(product.brand);
      }
      return acc;
    }, []);
  }, [products]);

  // Current products to display
  const currentProducts =items;
  const currentLoading =  allProductsLoading 

  // Header component
  const renderHeader = useCallback(() => (
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
  ), [navigation]);

  const renderSection = useCallback(() => (
    <SectionRenderer navigation={navigation} />
  ), [navigation]);

  // Main content renderer
  const renderContent = useCallback(() => {
    // Show skeleton loader while loading
    if ((!isReady && !refreshing) || (currentLoading && !initialLoadComplete)) {
      return <ContentSkeletonLoader />;
    }

    if (categoriesError || subCategoriesError || productsError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load data. Please try again.</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const isAllDataEmpty = 
      (!categories || categories.length === 0) &&  
      (!brands || brands.length === 0) &&
      (!filteredSubcategories || filteredSubcategories.length === 0) &&
      (!currentProducts || currentProducts.length === 0);

    if (isAllDataEmpty) {
      return (
        <View style={localStyles.emptyContainer}>
          <EmptyState allEmpty />
        </View>
      );
    }

    return (
      <Animated.View style={{ opacity }}>
        <GetCategory
          categories={categories}
          navigation={navigation}
          selectedIndex={selectedCategoryIndex}
          setSelectedIndex={handleCategoryChange}
          onShowAllProducts={handleShowAllProducts}
          viewMode={viewMode}
        />
        
        <View style={styles.mainContent}>
          <ModernProductGrid 
            products={currentProducts} 
            navigation={navigation}
            loadMore={viewMode === 'all' ? loadMore : undefined}
            loading={viewMode === 'all' ? isLoadingMore || allProductsLoading : false}
          />
          {renderSection()}   
        </View> 
      </Animated.View>
    );
  }, [
    isReady, refreshing, currentLoading, initialLoadComplete, 
    categoriesError, subCategoriesError, productsError, 
    categories, brands, filteredSubcategories, currentProducts,
    navigation, selectedCategoryIndex, viewMode, 
    handleCategoryChange, handleShowAllProducts, handleRefresh,
    loadMore, isLoadingMore, allProductsLoading, renderSection,
    opacity
  ]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.green]}
            tintColor={COLORS.green}
          />
        }
        stickyHeaderIndices={[0]}
      >
        {renderHeader()}
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
  },
});

export default React.memo(HomeScreen);