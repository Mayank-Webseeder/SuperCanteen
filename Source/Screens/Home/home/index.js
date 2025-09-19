import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  RefreshControl,
  Animated,
  InteractionManager,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList
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
const PRODUCT_BATCH_SIZE = 15; // Reduced batch size for better performance

const HomeScreen = ({ navigation, route }) => {
  // State management
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [viewMode, setViewMode] = useState('all');
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

  // Debounce refs to prevent rapid state updates
  const loadMoreDebounceRef = useRef(false);
  const categoryChangeDebounceRef = useRef(false);

  const dispatch = useDispatch();

  // Optimized Redux selectors with minimal re-renders
  const categories = useSelector(state => state.category.categories, shallowEqual);
  const categoriesLoading = useSelector(state => state.category.loading);
  const categoriesError = useSelector(state => state.category.error);
  
  const subCategories = useSelector(state => state.subCategory.subCategories, shallowEqual);
  const products = useSelector(state => state.product.products, shallowEqual);
  
  const allProductsItems = useSelector(state => state.allProducts.items, shallowEqual);
  const allProductsLoading = useSelector(state => state.allProducts.loading);
  const allProductsPage = useSelector(state => state.allProducts.page);
  const allProductsPagination = useSelector(state => state.allProducts.pagination);
  const allProductsLimit = useSelector(state => state.allProducts.limit);
  
  const sections = useSelector(state => state.section.items, shallowEqual);
  const sectionsLoading = useSelector(state => state.section.loading);

  // Track mount state
  useEffect(() => {
    isMountedRef.current = true;
    
    const now = Date.now();
    if (dataCacheRef.current.timestamp > 0 && 
        now - dataCacheRef.current.timestamp < DATA_CACHE_TIME) {
      setIsReady(true);
    }

    // Initial data load with debounce
    if (now - dataCacheRef.current.timestamp > DATA_CACHE_TIME) {
      const timer = setTimeout(() => {
        dispatch(resetProducts());
        dispatch(getAllProducts({ page: 1, limit: PRODUCT_BATCH_SIZE }));
      }, 100);
      
      return () => clearTimeout(timer);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [dispatch]);

  // Data loading with useFocusEffect - optimized with cleanup
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let timeoutId = null;

      const fetchData = async () => {
        try {
          if (!isActive) return;
          
          const now = Date.now();
          const isDataFresh = now - dataCacheRef.current.timestamp < DATA_CACHE_TIME;
          
          if (isDataFresh && dataCacheRef.current.categories) {
            if (isActive && isMountedRef.current) {
              setIsReady(true);
            }
            return;
          }

          const promises = [];

          if (!categories?.length || !isDataFresh) {
            promises.push(dispatch(getCategories()));
          }
          if (!subCategories?.length || !isDataFresh) {
            promises.push(dispatch(getSubCategories()));
          }
          if (!sections?.length || !isDataFresh) {
            promises.push(dispatch(fetchSections()));
          }

          if (promises.length > 0) {
            await Promise.all(promises);
            // Update cache only with necessary data
            dataCacheRef.current = {
              categories: categories,
              subCategories: subCategories,
              sections: sections,
              timestamp: Date.now()
            };
          }

          if (isActive && isMountedRef.current) {
            setIsReady(true);
          }
        } catch (error) {
          console.error('Data fetch error:', error);
          if (isActive && isMountedRef.current) setIsReady(true);
        }
      };

      // Use debounced data fetching
      timeoutId = setTimeout(() => {
        InteractionManager.runAfterInteractions(fetchData);
      }, 150);

      return () => {
        isActive = false;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [categories, subCategories, sections, dispatch])
  );

  // Debounced category change handler
  const handleCategoryChange = useCallback((categoryId) => {
    if (categoryChangeDebounceRef.current) return;
    categoryChangeDebounceRef.current = true;
    
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
        })
        .finally(() => {
          setTimeout(() => {
            categoryChangeDebounceRef.current = false;
          }, 300);
        });
    } else {
      categoryChangeDebounceRef.current = false;
    }
    
    if (category) {
      navigation.navigate('categoryProductsScreen', { 
        categoryId: categoryId,
        category: category
      });
    }
  }, [navigation, categories, selectedCategoryIndex, dispatch]);

  const handleShowAllProducts = useCallback(() => {
    setViewMode('all');
    setSelectedCategoryIndex(null);
    setIsReady(false);
    
    dispatch(getAllProducts({ page: 1, limit: PRODUCT_BATCH_SIZE }))
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
        dispatch(getAllProducts({ page: 1, limit: PRODUCT_BATCH_SIZE })),
      ];

      await Promise.all(promises);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      if (isMountedRef.current) {
        setRefreshing(false);
      }
    }
  }, [dispatch]);

  // Debounced load more function
  const loadMore = useCallback(() => {
    if (loadMoreDebounceRef.current) return;
    
    if (viewMode === 'all' && 
        !allProductsLoading && 
        allProductsPagination && 
        allProductsPage < allProductsPagination.totalPages) {
      
      loadMoreDebounceRef.current = true;
      
      dispatch(getAllProducts({ page: allProductsPage + 1, limit: PRODUCT_BATCH_SIZE }))
        .finally(() => {
          setTimeout(() => {
            loadMoreDebounceRef.current = false;
          }, 500);
        });
    }
  }, [viewMode, allProductsLoading, allProductsPagination, allProductsPage, dispatch]);

  // Memoized data with optimized filtering
  const filteredSubcategories = useMemo(() => {
    if (!subCategories || !selectedCategoryIndex) return [];
    return subCategories.filter(item => item.category?._id === selectedCategoryIndex);
  }, [subCategories, selectedCategoryIndex]);

  // Current products to display with efficient filtering
  const currentProducts = useMemo(() => 
    allProductsItems.filter(product => product.isEnable),
    [allProductsItems]
  );

  // Memoized header component
  const renderHeader = useMemo(() => (
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

  // Memoized section renderer
  const renderSection = useMemo(() => (
    <SectionRenderer navigation={navigation} />
  ), [navigation]);

  // Main content renderer with optimized conditions
  const renderContent = useCallback(() => {
    // Show skeleton loader while loading
    if ((!isReady && !refreshing) || (allProductsLoading && !isReady)) {
      return <ContentSkeletonLoader />;
    }

    if (categoriesError) {
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
            loading={allProductsLoading}
            hasMore={allProductsPagination ? allProductsPage < allProductsPagination.totalPages : false}
          />
          {renderSection}   
        </View> 
      </Animated.View>
    );
  }, [
    isReady, refreshing, allProductsLoading, 
    categoriesError, categories, currentProducts, navigation, selectedCategoryIndex, 
    viewMode, handleCategoryChange, handleShowAllProducts, handleRefresh,
    loadMore, allProductsPagination, allProductsPage, renderSection, opacity
  ]);

  // Optimized FlatList configuration
  const flatListProps = useMemo(() => ({
    data: [],
    keyExtractor: (_, index) => index.toString(),
    ListHeaderComponent: (
      <>
        {renderHeader}
        {renderContent()}
      </>
    ),
    refreshControl: (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={handleRefresh}
        colors={[COLORS.green]}
        tintColor={COLORS.green}
      />
    ),
    showsVerticalScrollIndicator: false,
    initialNumToRender: 5,
    maxToRenderPerBatch: 7,
    windowSize: 10,
    removeClippedSubviews: true,
    updateCellsBatchingPeriod: 50,
  }), [renderHeader, renderContent, refreshing, handleRefresh]);

  return (
    <View style={styles.container}>
      <FlatList {...flatListProps} />
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