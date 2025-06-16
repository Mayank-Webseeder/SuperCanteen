import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Height, Width } from '@constants';
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import ProductCategories from '../../../otherComponents/home/productCategories';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import Header from '../../../otherComponents/home/header';
import HotDealsSection from '../../../otherComponents/home/hotDeals';
import SponsordSection from '../../../otherComponents/home/sponsord';
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import ProductCarousel from '../../../otherComponents/home/ProductCarousel';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import FastImage from 'react-native-fast-image';
import { getCategories } from '../../../redux/slices/categorySlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { getProductsByCategory } from '../../../redux/slices/productSlice';
import { styles } from './styles';

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);

  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useSelector((state) => state.subCategory);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  useEffect(() => {
    const apiError = categoriesError || subCategoriesError || productsError;
    if (apiError) {
      setError(apiError);
      setPageLoading(false);
    }
  }, [categoriesError, subCategoriesError, productsError]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
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

  useEffect(() => {
    if (!categoriesLoading && categories?.length > 0 && selectedCategoryIndex === null) {
      setSelectedCategoryIndex(categories[0]._id);
    }
  }, [categoriesLoading, categories]);

  useEffect(() => {
    if (selectedCategoryIndex) {
      dispatch(getProductsByCategory(selectedCategoryIndex));
    }
  }, [selectedCategoryIndex]);

  useEffect(() => {
    if (!categoriesLoading && !subCategoriesLoading && !productsLoading) {
      setPageLoading(false);
    }
  }, [categoriesLoading, subCategoriesLoading, productsLoading]);

  const filteredSubcategories = useMemo(() => {
    return subCategories?.filter(item => item.category?._id === selectedCategoryIndex) || [];
  }, [subCategories, selectedCategoryIndex]);

  const brands = useMemo(() => {
    const brandMap = {};
    products?.forEach(product => {
      if (product.brand && !brandMap[product.brand._id]) {
        brandMap[product.brand._id] = product.brand;
      }
    });
    return Object.values(brandMap);
  }, [products]);

  const contentLoading = subCategoriesLoading || productsLoading;

  if (pageLoading) {
    return <FullScreenLoader />;
  }

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

  const mainContent = (
    <>
     <GetCategory
          categories={categories}
          navigation={navigation}
          selectedIndex={selectedCategoryIndex}
          setSelectedIndex={setSelectedCategoryIndex}
        />
    <View style={styles.mainContent}>
    
      {error ? (
        <ErrorView message={error} onRetry={handleRefresh} containerStyle={{ marginVertical: Height(20) }} />
      ) : contentLoading ? (
        <ContentSkeletonLoader type="home" itemCount={3} />
      ) : (
        <>
        { brands.length > 0 && <HorizontalLine lineStyle={styles.lineStyle} /> }
          <Brandcarousel imageStyle={styles.imageStyle} contentContainerStyle={styles.contentContainerStyle}  cardStyle={styles.cardStyle}  paginationStyle={styles.paginationStyle} dotStyle={styles.dotStyle} brands={brands} />
          <HorizontalLine lineStyle={styles.horizontalLine} />
          <ProductCategories
            navigation={navigation}
            subcategories={filteredSubcategories}
            selectedCategoryId={selectedCategoryIndex}
            selectedCategoryItems={selectedCategoryItems}
            setSelectedCategoryItems={setSelectedCategoryItems}
            gotoScreen={'ProdcutCategory'}
          />
          <HorizontalLine containerStyle={{ marginBottom: 2 }} />
          <ProductCarousel horizontal={true} navigation={navigation} products={products} />
        </>
      )}
    </View>
    </>
  );


  const sections = [stickyHeader, mainContent];

  return (
    <View style={styles.container}>
      <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
        <FlatList
          data={sections}
          renderItem={({ item }) => item}
          keyExtractor={(_, index) => index.toString()}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        />
      </PullToRefresh>
    </View>
  );
};

export default HomeScreen;
