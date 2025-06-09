import { View, FlatList, Text } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import { Height } from '../../../constants';
import CustomCasual from '../../../Components/CustomCasual';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import ProductCategories from '../../../otherComponents/home/productCategories';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import ClosestProductsData from '../../../Mock/Data/closestProductData';
import { getProductsByCategory } from '../../../redux/slices/productSlice';

const ProductsScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData } = route?.params || {};
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  
  // Redux state
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

useEffect(() => {
  if (selectedCategory) {
    dispatch(getProductsByCategory(selectedCategory));
  }
}, [selectedCategory]);



  // Handle errors
  useEffect(() => {
    const apiError = subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
      setPageLoading(false);
    }
  }, [subCategoriesError, productsError]);

  // Pull to refresh
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

  // Fetch initial data
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

  // Auto-select first subcategory when subCategories load
  useEffect(() => {
    if (!subCategoriesLoading && filteredSubCategories.length > 0 && !selectedSubCategoryId) {
      setSelectedSubCategoryId(filteredSubCategories[0]._id);
    }
  }, [subCategoriesLoading, filteredSubCategories]);

  // Fetch products when selected subcategory changes
  useEffect(() => {
    if (selectedSubCategoryId) {
      dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
    }
  }, [selectedSubCategoryId]);


  

  // Track page loading state
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

  // Show full screen loader during first page load
  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
      <View style={styles.container}>
    <PullToRefresh  refreshing={refreshing} onRefresh={handleRefresh}>
   
       <FlatList
        data={[1]} // Single item array for our content
        renderItem={() => (
          <View>
            {/* Header */}
            <View style={styles.headerView}>
              <CustomHeader showRightIcons navigation={navigation} label={categoryData?.name} />
            </View> 

            {/* Banner */}
              <View style={styles.sectionSpacing}>
                <CustomCasual
                  containerStyle={styles.CasualStyle}
                  cardStyle={styles.cardStyle}
                  data={Sliders}
                  borderWidth={0}
                  cardRadius={Height(15)}
                  resizeMode={'cover'}
                />
              </View>
            <HorizontalLine />

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
              <Text style={{ textAlign: 'center', color: '#999', marginBottom: Height(10), marginTop: Height(20) }}>
                No subcategories found
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
                <HorizontalLine  lineStyle={{marginTop:6}}/>
                  <View style={styles.productContainer}>
                <ProductCarousel navigation={navigation} products={products} />
                </View>

              </>
            ) : (
              <Text style={{ textAlign: 'center', color: '#999', marginBottom: Height(20), marginTop: Height(10) }}>
                No products found
              </Text>
            )}

            {/* Closest Called */}
            {/* <ClosesCalled
              navigation={navigation}
              data={ClosestProductsData}
              containerStyle={styles.containerStyle}
              listContentStyle={styles.listContentStyle}
            /> */}
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