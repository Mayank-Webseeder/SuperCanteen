import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import { COLORS, Height, Width } from '../../../constants';
import CustomCasual from '../../../Components/CustomCasual';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import ClosestProductsData from '../../../Mock/Data/closestProductData';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { formatProductData } from '../../../utils/dataFormatters';
import ProductCategories from '../../../../Source/otherComponents/home/productCategories';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ProductCarousel from '../../../../Source/otherComponents/home/ProductCarousel';

const ProductsScreen = ({ navigation, route }) => {
  const { productsBySubcategory, loading: productsLoading, error: productsError } = useSelector(state => state.subCategoryProducts);
  const { subCategories, loading: subCategoriesLoading, error: subCategoriesError } = useSelector(state => state.subCategory);
  const { selectedCategory, categoryData } = route?.params || {};

  const dispatch = useDispatch();

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filter subcategories for this category
  const filteredSubCategories = useMemo(() => {
    return subCategories?.filter(item => item?.category?._id === selectedCategory) || [];
  }, [subCategories, selectedCategory]);

  // Products for selected subcategory
  const currentProducts = 
    selectedSubCategoryId ? productsBySubcategory[selectedSubCategoryId] || [] : []
  ;

  // Fetch subcategories for this category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getSubCategories());
    }
  }, [selectedCategory]);

  // Auto-select first subcategory when subCategories load
  useEffect(() => {
    if (!subCategoriesLoading && filteredSubCategories.length > 0 && selectedSubCategoryId == null) {
      setSelectedSubCategoryId(filteredSubCategories[0]._id);
    }
  }, [subCategoriesLoading, filteredSubCategories]);

  // Fetch products when selected subcategory changes
  useEffect(() => {
    if (selectedSubCategoryId) {
      dispatch(fetchProductsBySubcategory(selectedSubCategoryId));
    }
  }, [selectedSubCategoryId]);

  // Page loading logic
  useEffect(() => {
    if (!subCategoriesLoading && !productsLoading) {
      setPageLoading(false);
    }
  }, [subCategoriesLoading, productsLoading]);

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

  const Sliders = [
    {
      id: categoryData?.id,
      image: { uri: categoryData?.image }
    }
  ];

  // Final render
  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
    <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }} showsVerticalScrollIndicator={false}>
        {/* Header */}
       <View style={styles.headerView}>
          <CustomHeader showRightIcons navigation={navigation} label={categoryData?.name} />
        </View> 

        {/* Banner */}
        <View style={styles.mainView}>
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
        </View>

        <HorizontalLine />

        {/* Subcategories */}
        {error ? (
          <ErrorView
            message={error}
            onRetry={handleRefresh}
            containerStyle={{ marginVertical: Height(20) }}
          />
        ) : filteredSubCategories.length > 0 ? (
          <ProductCategories
            navigation={navigation}
            subcategories={filteredSubCategories}
            selectedCategoryId={selectedSubCategoryId}
            selectedCategoryItems={selectedCategoryItems}
            setSelectedCategoryItems={setSelectedCategoryItems}
            containerStyle={styles.productContainer}
          />
        ) : (
          <Text style={{ textAlign: 'center', color: '#999', marginBottom: Height(10), marginTop: Height(20) }}>
            No subcategories found
          </Text>
        )}

        <HorizontalLine />

        {/* Products */}
       
            {productsLoading ? (
              <FullScreenLoader />
            ) : currentProducts.length > 0 ? (
          <ProductCarousel   navigation={navigation} products={currentProducts} />
            ) : (
              <Text style={{ textAlign: 'center', color: '#999', marginBottom: Height(20), marginTop: Height(10) }}>
                No products found
              </Text>
            )}
          

          {/* Closest Called */}
          <ClosesCalled
            navigation={navigation}
            key={'slider'}
            data={ClosestProductsData}
            containerStyle={styles.containerStyle}
            listContentStyle={styles.listContentStyle}
          />
      </ScrollView>
    </PullToRefresh>
  );
};

export default ProductsScreen;
