import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Animated,
  InteractionManager,
  TouchableOpacity,
  Text
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


const HomeScreen = ({ navigation, route }) => {
  // State management
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [skeletonAnimation] = useState(new Animated.Value(0));
  const [isMounted, setIsMounted] = useState(true);

  const dispatch = useDispatch();

  // Redux selectors
  const { categories, loading: categoriesLoading, error: categoriesError } = 
    useSelector(state => state.category, shallowEqual);
  const { subCategories, loading: subCategoriesLoading, error: subCategoriesError } = 
    useSelector(state => state.subCategory, shallowEqual);
  const { products, loading: productsLoading, error: productsError } = 
    useSelector(state => state.product, shallowEqual);
  const { items, loading, page, pagination, limit } = useSelector(state => state.allProducts);



  useEffect(() => {
    dispatch(resetProducts());
    dispatch(getAllProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  // Track mount state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);


  const loadMore = useCallback(() => {
    if (!loading && pagination && page < pagination.totalPages) {
      dispatch(getAllProducts({ page: page + 1, limit }));
    }
  }, [loading, pagination, page, limit]);

  // Animation for skeleton loader
  useEffect(() => {
    if (!initialLoadComplete) {
      const animateSkeleton = Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      animateSkeleton.start();
      
      return () => animateSkeleton.stop();
    }
  }, [initialLoadComplete]);

  // Data loading with useFocusEffect
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const promises = [];

          // Fetch categories & subcategories only if not already fetched
          if (!categories?.length) promises.push(dispatch(getCategories()));
          if (!subCategories?.length) promises.push(dispatch(getSubCategories()));
          if (!sections?.length) promises.push(dispatch(fetchSections()));

          // Only fetch products if not already loaded
          if (!products?.length && selectedCategoryIndex) {
            promises.push(dispatch(getProductsByCategory(selectedCategoryIndex)));
          }

          await Promise.all(promises);
          if (isActive && isMounted) {
            setInitialLoadComplete(true);
            setIsReady(true);
          }
        } catch (error) {
          if (isActive && isMounted) setIsReady(true);
        }
      };

      InteractionManager.runAfterInteractions(() => fetchData());

      return () => {
        isActive = false;
      };
    }, [categories, subCategories, selectedCategoryIndex])
  );

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCategoryIndex) {
        dispatch(getProductsByCategory(selectedCategoryIndex));
      }
    }, 1000 * 60 * 5); // every 5 minutes

    return () => clearInterval(interval);
  }, [selectedCategoryIndex]);

  const handleCategoryChange = useCallback((categoryId) => {
    const category = categories.find(c => c._id === categoryId);
    if (categoryId !== selectedCategoryIndex) {
      setIsReady(false);
      setSelectedCategoryIndex(categoryId);
      dispatch(getProductsByCategory(categoryId))
        .then(() => {
          if (isMounted) setIsReady(true);
        })
        .catch(() => {
          if (isMounted) setIsReady(true);
        });
    }
    navigation.navigate('categoryProductsScreen', { 
      categoryId: categoryId,
      category: category
    });
  }, [navigation, categories, selectedCategoryIndex, isMounted]);

  // Fade-in animation when content is ready
  useEffect(() => {
    if (isMounted) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isReady, opacity, isMounted]);

  const handleRefresh = useCallback(async () => {
    if (!isMounted) return;
    
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(getCategories()),
        dispatch(getSubCategories()),
        dispatch(fetchSections()),
        dispatch(getAllProducts()), // Refresh all products
        selectedCategoryIndex && dispatch(getProductsByCategory(selectedCategoryIndex)),
      ]);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setTimeout(() => {
        if (isMounted) {
          setRefreshing(false);
        }
      }, 1000);
    }
  }, [dispatch, selectedCategoryIndex, isMounted]);



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

  // Skeleton component (keep your existing implementation)
  const renderSkeleton = () => {/* ... */};

  const renderSection = useCallback(() => (
    <SectionRenderer navigation={navigation} />
  ), [navigation]);

  // Main content renderer
  const renderContent = () => {
    if ((!isReady && !refreshing) || (productsLoading && !initialLoadComplete)) {
      return renderSkeleton();
    }

    if (categoriesError || subCategoriesError || productsError ) {
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
      (!categories.length === 0) &&  
      (!brands || brands.length === 0) &&
      (!filteredSubcategories || filteredSubcategories.length === 0) &&
      (!allProducts || allProducts.length === 0);

    if (isAllDataEmpty) {
      return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
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
        />
        <View style={styles.mainContent}>
          <ModernProductGrid 
            products={items} 
            navigation={navigation}
            loadMore={loadMore}
            onEndReachedThreshold={0.5}
            loading={loading}
          />
          {renderSection()}   
        </View> 
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom:40}}
        data={[stickyHeader, renderContent()]}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.green]}
            tintColor={COLORS.green}
          />
        }
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        key={`home-${selectedCategoryIndex}`}
        extraData={selectedCategoryIndex}
        ListEmptyComponent={
          !refreshing && isReady && products.length === 0 ? (
            <EmptyState allEmpty />
          ) : null
        }
      />
    </View>
  );
};

export default React.memo(HomeScreen);