import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import CustomCasual from '../../../Components/CustomCasual';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import ProductCategories from '../../../otherComponents/home/productCategories';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import CustomSearch from '../../../Components/searchInput';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import { styles } from './styles';
import { Height } from '../../../constants';

const ProductsScreen = ({ navigation, route }) => {
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  const { selectedCategory, categoryData } = route?.params || {};

  const { products, error: productsError } = useSelector(
    state => ({
      products: state.product.products,
      error: state.product.error
    }),
    shallowEqual
  );

  const { subCategories, loading: subCategoriesLoading, error: subCategoriesError } = useSelector(
    state => ({
      subCategories: state.subCategory.subCategories,
      loading: state.subCategory.loading,
      error: state.subCategory.error
    }),
    shallowEqual
  );

  const filteredSubCategories = useMemo(() => {
    return subCategories?.filter(item => item?.category?._id === selectedCategory) || [];
  }, [subCategories, selectedCategory]);

  const brands = useMemo(() => {
    const brandMap = new Map();
    products?.forEach(product => {
      if (product.brand && !brandMap.has(product.brand._id)) {
        brandMap.set(product.brand._id, product.brand);
      }
    });
    return Array.from(brandMap.values());
  }, [products]);

  const Sliders = useMemo(() => [{
    id: categoryData?.id,
    image: { uri: categoryData?.image }
  }], [categoryData]);

  // 🚀 Load all main data instantly without InteractionManager
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setError(null);
        await Promise.all([
          dispatch(getProductsByCategory(selectedCategory)),
          dispatch(getSubCategories())
        ]);
        if (isMounted) setIsReady(true);
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [selectedCategory, dispatch]);

  // Auto-select first subcategory when available
  useEffect(() => {
    if (!subCategoriesLoading && filteredSubCategories.length > 0 && !selectedSubCategoryId) {
      setSelectedSubCategoryId(filteredSubCategories[0]._id);
    }
  }, [subCategoriesLoading, filteredSubCategories]);

  // Load products by subcategory when selected
  useEffect(() => {
    if (selectedSubCategoryId) {
      dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
    }
  }, [selectedSubCategoryId]);

  // Handle errors from store
  useEffect(() => {
    const apiError = subCategoriesError || productsError;
    if (apiError) setError(apiError);
  }, [subCategoriesError, productsError]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      await Promise.all([
        dispatch(getSubCategories()),
        dispatch(getProductsByCategory(selectedCategory)),
        selectedSubCategoryId && dispatch(fetchProductsBySubcategory(selectedSubCategoryId))
      ]);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  }, [selectedCategory, selectedSubCategoryId, dispatch]);

  const renderHeader = () => (
    <>
      <View style={styles.headerView}>
        <CustomHeader 
          showCartIcon 
          navigation={navigation} 
          label={categoryData?.name} 
          screenName={'Categories'}
        />
        <View style={styles.searchView}>
          <Pressable onPress={() => navigation.navigate('Search')} style={styles.searchPressable}>
            <CustomSearch
              disabledStyle={styles.disabledStyle}
              backgroundColor={'#fff'}
              disabled
              containerStyle={styles.searchInput}
              inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2 }}
            />
          </Pressable>
        </View>
      </View>

      {/* Brand Carousel or Banner */}
      {isReady ? (
        brands.length > 0 ? (
          <Brandcarousel
            carouselContainerStyle={styles.carouselContainerStyle}
            brands={brands}
            imageStyle={styles.imageStyle}
            contentContainerStyle={styles.mainViewcontainerStyle}
            cardStyle={styles.cardStyle}
            paginationStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
          />
        ) : (
          <View style={styles.sectionSpacing}>
            <CustomCasual
              containerStyle={styles.CasualStyle}
              cardStyle={{ marginTop: 15 }}
              data={Sliders}
              borderWidth={0}
              cardRadius={Height(15)}
              resizeMode={'cover'}
            />
          </View>
        )
      ) : <ContentSkeletonLoader type="brand" />}

      <HorizontalLine lineStyle={styles.lineStyle} />

      {/* Subcategories */}
      {isReady ? (
        filteredSubCategories.length > 0 ? (
          <View style={styles.categoryContainer}>
            <ProductCategories
              navigation={navigation}
              subcategories={filteredSubCategories}
              selectedCategoryId={selectedSubCategoryId}
              setSelectedCategoryId={setSelectedSubCategoryId}
              gotoScreen={'ProdcutCategory'}
              containerStyle={styles.categortTitleStyle}
            />
          </View>
        ) : (
          <Text style={{ textAlign: 'center', color: '#999' }}>No subcategories found</Text>
        )
      ) : <ContentSkeletonLoader type="category" />}

      <HorizontalLine lineStyle={{ marginTop: 6 }} />
    </>
  );

  const renderItem = () => (
    isReady && products.length > 0 ? (
      <View style={styles.productContainer}>
       <ProductCarousel 
          navigation={navigation}
          products={products}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          containerStyle={{ marginBottom: 0 }}
        /> 
      </View>
    ) : (
      <Text style={{ textAlign: 'center', color: '#999', marginVertical: Height(20) }}>
        {/* No products found */}
      </Text>
    )
  );

  return (
    <View style={styles.container}>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <FlatList
          data={[{}]} // dummy to trigger renderItem once
          keyExtractor={() => 'products-carousel'}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={error && (
            <ErrorView
              message={error}
              onRetry={handleRefresh}
              containerStyle={{ marginVertical: Height(20) }}
            />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </PullToRefresh>
    </View>
  );
};

export default React.memo(ProductsScreen);
