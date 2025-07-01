import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Animated,
  TouchableOpacity,
  InteractionManager,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Header from '../../../otherComponents/home/header';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import ProductCategories from '../../../otherComponents/home/productCategories';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import SectionRenderer from '../../../otherComponents/home/sections';

import { styles } from './styles';
import { COLORS } from '@constants/index';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];
  const [skeletonAnimation] = useState(new Animated.Value(0));

  const dispatch = useDispatch();

  // Redux selectors
  const { categories, loading: categoriesLoading, error: categoriesError } = 
    useSelector(state => state.category, shallowEqual);
  const { subCategories, loading: subCategoriesLoading, error: subCategoriesError } = 
    useSelector(state => state.subCategory, shallowEqual);
  const { products, loading: productsLoading, error: productsError } = 
    useSelector(state => state.product, shallowEqual);

  // Animation for skeleton loader
  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
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
      ).start();
    };

    if (!initialLoadComplete) {
      animateSkeleton();
    }

    return () => {
      skeletonAnimation.stopAnimation();
    };
  }, [initialLoadComplete]);

  // Set selected category and fetch products
  useEffect(() => {
    if (categories?.length > 0 && !selectedCategoryIndex) {
      const firstCategoryId = categories[0]._id;
      setSelectedCategoryIndex(firstCategoryId);
      dispatch(getProductsByCategory(firstCategoryId));
    }
  }, [categories, selectedCategoryIndex, dispatch]);

  // Trigger product fetch on category change
  useEffect(() => {
    if (selectedCategoryIndex) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, [selectedCategoryIndex, dispatch]);

  // Fade-in animation when content is ready
  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: isReady ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    });

    if (isReady) animation.start();
    return () => animation.stop();
  }, [isReady, opacity]);

  // Initial data fetch with timeout fallback
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      fetchInitialData();
      
      // Fallback in case requests stall
      const timeout = setTimeout(() => {
        if (!initialLoadComplete) {
          setIsReady(true);
          setInitialLoadComplete(true);
        }
      }, 5000);

      return () => clearTimeout(timeout);
    });

    return () => task.cancel();
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(getCategories()),
        dispatch(getSubCategories()),
      ]);
      setInitialLoadComplete(true);
      setIsReady(true);
    } catch (err) {
      console.error('Initial Load Error:', err);
      setIsReady(true); // Still show UI even if error occurs
    }
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(getCategories()),
        dispatch(getSubCategories()),
        selectedCategoryIndex ? dispatch(getProductsByCategory(selectedCategoryIndex)) : null,
      ]);
    } catch (err) {
      console.error('Refresh Error:', err);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, selectedCategoryIndex]);

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

  const isLoading = useMemo(() => {
    return categoriesLoading || subCategoriesLoading || productsLoading;
  }, [categoriesLoading, subCategoriesLoading, productsLoading]);

  const error = useMemo(() => {
    return categoriesError || subCategoriesError || productsError;
  }, [categoriesError, subCategoriesError, productsError]);

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

  // Error component
  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        {error?.message || 'Could not load data. Please check your connection.'}
      </Text>
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={handleRefresh}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  // Skeleton component
  const renderSkeleton = () => {
    const shimmerAnimation = skeletonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-100%', '100%']
    });

    const SkeletonElement = ({ width, height, style = {} }) => (
      <View 
        style={[
          {
            width,
            height,
            backgroundColor: '#E1E9EE',
            borderRadius: 4,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#F2F8FC',
            transform: [{ translateX: shimmerAnimation }],
          }}
        />
      </View>
    );

    return (
      <View style={styles.skeletonContainer}>
        {/* Header Skeleton */}
        <SkeletonElement width={width - 32} height={60} style={{ marginBottom: 16 }} />
        
        {/* Categories Skeleton */}
        <View style={styles.skeletonCategoryRow}>
          {[...Array(5)].map((_, i) => (
            <SkeletonElement key={`cat-${i}`} width={60} height={60} style={{ borderRadius: 30 }} />
          ))}
        </View>
        
        {/* Brands Skeleton */}
        <View style={styles.skeletonSection}>
          <SkeletonElement width={120} height={20} style={{ marginBottom: 12 }} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(3)].map((_, i) => (
              <SkeletonElement key={`brand-${i}`} width={100} height={100} style={{ marginRight: 12 }} />
            ))}
          </ScrollView>
        </View>
        
        {/* Products Skeleton */}
        <View style={styles.skeletonSection}>
          <SkeletonElement width={120} height={20} style={{ marginBottom: 22 }} />
          <View style={styles.skeletonProductGrid}>
            {[...Array(6)].map((_, i) => (
              <SkeletonElement 
        key={`prod-${i}`} 
        width={(width / 2) - 24} 
        height={150} 
        style={{ 
          marginBottom: 16, 
          marginRight: i % 2 === 0 ? 16 : 0 
        }}
      />
            ))}
          </View>
        </View>
      </View>
    );
  };

  // Main content renderer
  const renderContent = () => {
    if (error && initialLoadComplete) {
      return renderError();
    }

    if (!initialLoadComplete || isLoading) {
      return renderSkeleton();
    }

    return (
      <Animated.View style={{ opacity }}>
        <GetCategory
          categories={categories}
          navigation={navigation}
          selectedIndex={selectedCategoryIndex}
          setSelectedIndex={setSelectedCategoryIndex}
        />
        <View style={styles.mainContent}>
          {brands.length > 0 && (
            <>
              <HorizontalLine lineStyle={styles.lineStyle} />
              <Brandcarousel
                brands={brands}
                imageStyle={styles.imageStyle}
                contentContainerStyle={styles.contentContainerStyle}
                cardStyle={styles.cardStyle}
                paginationStyle={styles.paginationStyle}
                dotStyle={styles.dotStyle}
              />
            </>
          )}
          <HorizontalLine lineStyle={styles.horizontalLine} />
          {filteredSubcategories.length > 0 && (
            <ProductCategories
              navigation={navigation}
              subcategories={filteredSubcategories}
              selectedCategoryId={selectedCategoryIndex}
              gotoScreen={'ProdcutCategory'}
              mainStyle={styles.mainStyle}
            />
          )}
          
          <SectionRenderer navigation={navigation} />
          
          <HorizontalLine containerStyle={{ marginBottom: 2 }} />
          <ProductCarousel
            horizontal={true}
            navigation={navigation}
            products={products}
          /> 
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
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
      />
    </View>
  );
};


export default React.memo(HomeScreen);