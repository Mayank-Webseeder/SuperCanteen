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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Header from '../../../otherComponents/home/header';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import ProductCategories from '../../../otherComponents/home/productCategories';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';

import { styles } from './styles';
import { COLORS } from '@constants/index';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import SectionRenderer from '../../../otherComponents/home/sections';


const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  const dispatch = useDispatch();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector(state => state.category, shallowEqual);

  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useSelector(state => state.subCategory, shallowEqual);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector(state => state.product, shallowEqual);

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

  // Fade-in animation
  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: isReady ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    });

    if (isReady) animation.start();
    return () => animation.stop();
  }, [isReady, opacity]);

  // Initial data fetch
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      fetchInitialData();
    });

    return () => task.cancel();
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(getCategories()),
      ]);
      InteractionManager.runAfterInteractions(async () => {
        await dispatch(getSubCategories());
        setIsReady(true);
      });
    } catch (err) {
      console.error('Initial Load Error:', err);
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

  // Memoized filtered subcategories
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
    return categoriesError || subCategoriesError || productsError ;
  }, [categoriesError, subCategoriesError, productsError]);

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

  const renderError = () => (
    <View style={styles.errorContainer}>
      {/* <Text style={styles.errorText}>
        {typeof error === 'string' && error.length > 0 ? error : 'Something went wrong'}
      </Text> */}
      <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSkeleton = () => (
    <View style={styles.fullScreenSkeleton}>
      <View style={styles.skeletonHeader} />
      <View style={styles.skeletonRow}>
        {[...Array(5)].map((_, i) => (
          <View key={`cat-${i}`} style={styles.skeletonCategory} />
        ))}
      </View>
      <View style={styles.skeletonSection}>
        <View style={styles.skeletonTitle} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(3)].map((_, i) => (
            <View key={`brand-${i}`} style={styles.skeletonBrand} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.skeletonSection}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonGrid}>
          {[...Array(6)].map((_, i) => (
            <View key={`prod-${i}`} style={styles.skeletonProduct} />
          ))}
        </View>
      </View>
    </View>
  );

 

  const renderContent = () => {
     if (error) return renderError();
    if (!isReady || isLoading) return renderSkeleton();

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
          
          {/* Updated Hot Deals Section */}
      <SectionRenderer navigation={navigation}  />
          
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