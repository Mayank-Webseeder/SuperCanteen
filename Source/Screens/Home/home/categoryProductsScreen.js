import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Animated,
  InteractionManager,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
// Component imports
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import ProductCategories from '../../../otherComponents/home/productCategories';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import SectionRenderer from '../../../otherComponents/home/sections';

import { styles } from './styles';
import { COLORS } from '@constants/index';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import EmptyState from '@components/emptyComponent/EmptyState';
import { fetchSections } from '../../../redux/slices/sectionSlice'
import CustomHeader from '@components/CustomHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomSearch from '../../../Components/searchInput';


const { width } = Dimensions.get('window');


const CategoryProductsScreen = ({ navigation, route }) => {
  // State management
    const { categoryId } = route.params || {}; 
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(categoryId);
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

  // Track mount state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Find category name by ID if not passed in params
const categoryName = useMemo(() => {
  const found = categories.find(cat => cat._id === categoryId);
  return found ? found.name : "Category";
}, [categoryId, categories]);


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


useEffect(() => {
  const interval = setInterval(() => {
    if (selectedCategoryIndex) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, 1000 * 60 * 5); // every 5 minutes

  return () => clearInterval(interval);
}, [selectedCategoryIndex]);
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
  // Keep content visible during refresh by not resetting isReady
  try {
    await Promise.all([
      dispatch(getCategories()),
      dispatch(getSubCategories()),
      dispatch(fetchSections()),
      selectedCategoryIndex && dispatch(getProductsByCategory(selectedCategoryIndex)),
    ]);
  } catch (error) {
    console.error('Refresh failed:', error);
  } finally {
    // Always ensure refresh ends
    setTimeout(() => {
      if (isMounted) {
        setRefreshing(false);
      }
    }, 1000); // Minimum loading indicator duration
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
        <View style={{flex:1,backgroundColor:COLORS.white,paddingLeft:3}}>
             <CustomHeader label={categoryName} navigation={navigation} showCartIcon={true} />
        
            <Pressable 
                     style={styles.searchPressable}
                     onPress={() => navigation.navigate('Search')}
                   >
                     <CustomSearch
                       disabledStyle={styles.disabledStyle}
                       backgroundColor={'#fff'}
                       disabled
                       containerStyle={styles.searchInput}
                       inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2}}
                     />
                   </Pressable>
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
       styles.skeletonStyle,
        {
          width,
          height,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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

  const renderSection = useCallback(() => (
  <SectionRenderer navigation={navigation} />
), [navigation]);

  // Main content renderer
  const renderContent = () => {
    if ((!isReady && !refreshing) || (productsLoading && !initialLoadComplete)) {
    return renderSkeleton();
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
  (!brands || brands.length === 0) &&
  (!filteredSubcategories || filteredSubcategories.length === 0)
  // (!products || products.length === 0)

  console.log("Is all data empty is",isAllDataEmpty,products)

  if (isAllDataEmpty) {
    return (
     <View style={styles.emptyStateContainer}>
           <Icon name="close" size={40} color="#888"/>
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
    );
  }

    return (
      <Animated.View style={{ opacity }}>
        <View style={[styles.mainContent,{marginTop:10}]}>
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

          {filteredSubcategories.length > 0 && (
            <>
              <ProductCategories
              navigation={navigation}
              subcategories={filteredSubcategories}
              selectedCategoryId={selectedCategoryIndex}
              gotoScreen={'ProdcutCategory'}
              mainStyle={styles.mainStyle}
              headerStyle={{marginTop:0}}
              paddingTop={0.1}
            />
            </>
          )}
          
        {renderSection()}
          
      {/* {products.length > 0 &&  <HorizontalLine containerStyle={{ marginBottom: 2 }} />}
          {productsLoading ? (
            <ActivityIndicator size="large" color={COLORS.green} />
          ) : (
           <View style={{marginHorizontal:8}}>
 <ProductCarousel
              horizontal={false}
              navigation={navigation}
              products={products}
             
            />
            </View>
          )}  */}
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
      />
    </View>
  );
};

export default React.memo(CategoryProductsScreen);