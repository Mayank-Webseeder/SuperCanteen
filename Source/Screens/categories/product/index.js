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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
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

  // Extract unique brands from products - now reacts instantly to category changes
  const brands = useMemo(() => {
    if (!products || products.length === 0) return [];
    const brandMap = {};
    products.forEach(product => {
      if (product.brand && !brandMap[product.brand._id]) {
        brandMap[product.brand._id] = product.brand;
      }
    });
    return Object.values(brandMap);
  }, [products]);

  // Load products when category changes
  useEffect(() => {
    if (selectedCategory) {
      setInitialLoad(true);
      dispatch(getProductsByCategory(selectedCategory))
        .unwrap()
        .then(() => setInitialLoad(false))
        .catch(() => setInitialLoad(false));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    const apiError = subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
    }
  }, [subCategoriesError, productsError]);

  const handleRefresh = async () => {
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
  };

  // Load subcategories
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getSubCategories());
    }
  }, [selectedCategory]);

  // Set initial subcategory
  useEffect(() => {
    if (!subCategoriesLoading && filteredSubCategories.length > 0 && !selectedSubCategoryId) {
      setSelectedSubCategoryId(filteredSubCategories[0]._id);
    }
  }, [subCategoriesLoading, filteredSubCategories]);

  // Load products for subcategory
  useEffect(() => {
    if (selectedSubCategoryId && !initialLoad) {
      dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
    }
  }, [selectedSubCategoryId, initialLoad]);

  const Sliders = [
    {
      id: categoryData?.id,
      image: { uri: categoryData?.image }
    }
  ];

  if (initialLoad && (!products || products.length === 0)) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <FlatList
          data={[1]} // dummy item to render layout
          renderItem={() => (
            <View>
              {/* Header - unchanged */}
              <View style={styles.headerView}>
                <CustomHeader navigation={navigation} label={categoryData?.name} />
                <View style={styles.searchView}>
                  <Pressable onPress={() => navigation.navigate('Search')}>
                    <CustomSearch
                      disabledStyle={styles.disabledStyle}
                      backgroundColor={'#fff'}
                      disabled
                      containerStyle={styles.searchInput}
                      inputStyle={{ fontSize: 14, paddingVertical: 11, marginLeft: 2}}
                    />
                  </Pressable>
                </View>
              </View>

              {/* Brand carousel or banner - now updates instantly */}
              {brands.length > 0 ? (
                <Brandcarousel 
                  carouselContainerStyle={styles.carouselContainerStyle} 
                  brands={brands}  
                  imageStyle={styles.imageStyle} 
                  contentContainerStyle={styles.mainViewcontainerStyle}  
                  cardStyle={styles.cardStyle}  
                  paginationStyle={styles.paginationStyle} 
                  dotStyle={styles.dotStyle}
                  key={`brands-${selectedCategory}`} // Force re-render on category change
                />
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

              {/* Subcategories - unchanged */}
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

              {/* Products - unchanged */}
              {error ? (
                <ErrorView
                  message={error}
                  onRetry={handleRefresh}
                  containerStyle={{ marginVertical: Height(20) }}
                />
              ) : (productsLoading && !initialLoad) ? (
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