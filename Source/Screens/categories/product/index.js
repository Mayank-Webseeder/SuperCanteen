import { View, FlatList, Text, Pressable } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import { Height } from '../../../constants';
import CustomCasual from '../../../Components/CustomCasual';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import ProductCategories from '../../../otherComponents/home/productCategories'
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import CustomSearch from '../../../Components/searchInput';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';


const ProductsScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData } = route?.params || {};
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const {
    products,
    loading: productsLoading,
    error: productsError
  } = useSelector((state) => state.product);

  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError
  } = useSelector(state => state.subCategory);

  // Filter subcategories for this category
  const filteredSubCategories = useMemo(() => {
    return subCategories?.filter(item => item?.category?._id === selectedCategory) || [];
  }, [subCategories, selectedCategory]);

  // Extract unique brands from products
  const brands = useMemo(() => {
    const brandMap = {};
    products?.forEach(product => {
      if (product.brand && !brandMap[product.brand._id]) {
        brandMap[product.brand._id] = product.brand;
      }
    });
    return Object.values(brandMap);
  }, [products]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const apiError = subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
      setPageLoading(false);
    }
  }, [subCategoriesError, productsError]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      await dispatch(getSubCategories());
      if (selectedSubCategoryId) {
        await dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        await dispatch(getSubCategories());
      } catch (err) {
        setError('Failed to load data');
      }
    };

    if (selectedCategory) {
      fetchData();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!subCategoriesLoading && filteredSubCategories.length > 0 && !selectedSubCategoryId) {
      setSelectedSubCategoryId(filteredSubCategories[0]._id);
    }
  }, [subCategoriesLoading, filteredSubCategories]);

  useEffect(() => {
    if (selectedSubCategoryId) {
      dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
    }
  }, [selectedSubCategoryId]);

  useEffect(() => {
    if (!subCategoriesLoading && !productsLoading) {
      setPageLoading(false);
    }
  }, [subCategoriesLoading, productsLoading]);

  const Sliders = [
    {
      id: categoryData?.id,
      image: { uri: categoryData?.image }
    }
  ];

  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <FlatList
          data={[1]} // dummy item to render layout
          renderItem={() => (
            <View>
              {/* Header */}
              <View style={styles.headerView}>
                <CustomHeader  navigation={navigation} label={categoryData?.name} />
                <View style={styles.searchView}>
                  <Pressable onPress={() => navigation.navigate('Search')}>
                    <CustomSearch
            disabledStyle={styles.disabledStyle}
            backgroundColor={'#fff'}
            disabled
            containerStyle={styles.searchInput}
            inputStyle={{ fontSize: 14, paddingVertical: 11,  marginLeft: 2}}
          />
                  </Pressable>
                </View>
              </View>

              {/* Brand carousel or banner */}
              {brands.length > 0 ? (
                <Brandcarousel carouselContainerStyle={styles.carouselContainerStyle} brands={brands}  imageStyle={styles.imageStyle} contentContainerStyle={styles.mainViewcontainerStyle}  cardStyle={styles.cardStyle}  paginationStyle={styles.paginationStyle} dotStyle={styles.dotStyle}/>
              ) : (
                <View style={styles.sectionSpacing}>
                  <CustomCasual
                    containerStyle={styles.CasualStyle}
                    cardStyle={{marginTop:15}}
                    data={Sliders}
                    borderWidth={0}
                    cardRadius={Height(15)}
                    resizeMode={'cover'}
                  />
                </View>
              )}

              <HorizontalLine lineStyle={styles.lineStyle} />

              {/* Subcategories */}
              {filteredSubCategories.length > 0 ? (
                <View style={styles.productContainer}>
                  <ProductCategories
                    navigation={navigation}
                    subcategories={filteredSubCategories}
                    selectedCategoryId={selectedSubCategoryId}
                    setSelectedCategoryId={setSelectedSubCategoryId}
                    gotoScreen={'ProdcutCategory'}
                  />
                </View>
              ) : !subCategoriesLoading && (
                <Text style={{ textAlign: 'center', color: '#999' }}>
                  {/* No subcategories found */}
                </Text>
              )}

              {/* Products */}
              {error ? (
                <ErrorView
                  message={error}
                  onRetry={handleRefresh}
                  containerStyle={{ marginVertical: Height(20) }}
                />
              ) : productsLoading ? (
                <ContentSkeletonLoader type="list" itemCount={4} />
              ) : products.length > 0 ? (
                <>
                  <HorizontalLine lineStyle={{ marginTop: 6 }} />
                  <View style={styles.productContainer}>
                    <ProductCarousel navigation={navigation} products={products} />
                  </View>
                </>
              ) : (
                <Text style={{ textAlign: 'center', color: '#999', marginBottom: Height(20), marginTop: Height(10) }}>
                  No products found
                </Text>
              )}
            </View>
          )}
          keyExtractor={() => 'product-screen-content'}
          showsVerticalScrollIndicator={false}
        />
      </PullToRefresh>
    </View>
  );
};

export default ProductsScreen;
