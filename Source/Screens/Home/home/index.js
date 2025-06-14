// HomeScreen.js
import { View, FlatList } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Height } from "@constants";
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import ProductCategories from '../../../otherComponents/home/productCategories';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../otherComponents/home/header';
import { styles } from './styles';
import HotDealsSection from '../../../otherComponents/home/hotDeals';
import SponsordSection from '../../../otherComponents/home/sponsord';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../redux/slices/categorySlice';
import { useDispatch } from 'react-redux';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '.././../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import ClosestProductsData from '../../../Mock/Data/closestProductData';
import FastImage from 'react-native-fast-image';


const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useSelector((state) => state.category);
  
  const { 
    subCategories, 
    loading: subCategoriesLoading, 
    error: subCategoriesError 
  } = useSelector((state) => state.subCategory);
  
  const { 
    products, 
    loading: productsLoading, 
    error: productsError 
  } = useSelector((state) => state.product);
  
  const dispatch = useDispatch();

  // Handle errors
  useEffect(() => {
    const apiError = categoriesError || subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
      setPageLoading(false);
    }
  }, [categoriesError, subCategoriesError, productsError]);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      // Refresh all necessary data
      await Promise.all([
        dispatch(getCategories()),
        selectedCategoryIndex && dispatch(getProductsByCategory(selectedCategoryIndex)),
        dispatch(getSubCategories())
      ]);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      setError(null);
      try {
        await Promise.all([
          dispatch(getCategories()),
          dispatch(getSubCategories())
        ]);
      } catch (err) {
        setError('Failed to load initial data');
        setPageLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Set initial category when categories load
  useEffect(() => {
    if (!categoriesLoading && categories?.length > 0 && selectedCategoryIndex === null) {
      setSelectedCategoryIndex(categories[0]._id);
    }
  }, [categoriesLoading, categories]);

  // Fetch products when category is selected
  useEffect(() => {
    if (selectedCategoryIndex) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, [selectedCategoryIndex]);

  // Track page loading state
  useEffect(() => {
    if (!categoriesLoading && !subCategoriesLoading && !productsLoading) {
      setPageLoading(false);
    }
  }, [categoriesLoading, subCategoriesLoading, productsLoading]);

  // Filter subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    return subCategories?.filter(item => item.category?._id === selectedCategoryIndex) || [];
  }, [subCategories, selectedCategoryIndex]);

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

  // Check if content is loading
  const contentLoading = useMemo(() => {
    return subCategoriesLoading || productsLoading;
  }, [subCategoriesLoading, productsLoading]);

  // Render each section of the home screen
  const renderSection = ({ item }) => item;

  const sections = [
     <View key="main-content" style={styles.mainContainer}>
    {/* Gradient Header - Only for the top section */}
    <LinearGradient
      colors={['#A3B9C3', '#FFFFFF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }} // Adjust this to control gradient length
      style={styles.gradientHeader}
    >
   
   
      <Header navigation={navigation} />
      <GetCategory
        categories={categories}
        navigation={navigation}
        selectedIndex={selectedCategoryIndex}
        setSelectedIndex={setSelectedCategoryIndex}
      />
    </LinearGradient>
  {/* Main Content Area - White background below gradient */}
    <View style={styles.mainContent}>
         <HorizontalLine lineStyle={styles.lineStyle}/>
      {error ? (
        <ErrorView 
          message={error} 
          onRetry={handleRefresh} 
          containerStyle={{ marginVertical: Height(20) }}
        />
      ) : contentLoading ? (
        <ContentSkeletonLoader 
          type="home"
          itemCount={3}
        />
      ) : (
        <>
          <Brandcarousel paginationStyle={styles.paginationStyle} dotStyle={styles.dotStyle} brands={brands} />
          <HorizontalLine lineStyle={styles.horizontalLine}/>
          <ProductCategories
            navigation={navigation}
            subcategories={filteredSubcategories}
            selectedCategoryId={selectedCategoryIndex}
            selectedCategoryItems={selectedCategoryItems}
            setSelectedCategoryItems={setSelectedCategoryItems}
            gotoScreen={'ProdcutCategory'}
          /> 
           <HorizontalLine  containerStyle={{marginBottom:2}}/>
       <ProductCarousel  horizontal={true} navigation={navigation} products={products} /> 
              {/* <ClosesCalled
                navigation={navigation}
                key={"slider"}
                  data={ClosestProductsData}
              
              /> */}
          {/* <HotDealsSection navigation={navigation} /> */}
          {/* <SponsordSection navigation={navigation} /> */}
       </>
      )}
    
      </View>
    
    </View>
  ];

  // Show full screen loader during first page load
  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles.container  }>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
       <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      /> 
    </PullToRefresh>
    </View>
   
  );
};

export default HomeScreen;