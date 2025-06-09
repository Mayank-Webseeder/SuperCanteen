import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import { COLORS, Height, Width } from '../../../constants';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import CustomProductCard from '../../../Components/productCard';
import CustomBottomSheet from '../../../Components/modals/bottomSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WatchStoreData from '../../../Mock/Data/WatchStoreData';
import SortBottomSheet from '../../../Components/modals/sortBottomsheet';
import SponsordSection from '../../../otherComponents/home/sponsord';
import { styles } from '../product/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import FullScreenLoader from '../../../Components/Common/fullScreenLoader';
import PullToRefresh from '../../../Components/Common/pullToRefresh';
import ErrorView from '../../../Components/Common/errorView';
import ContentSkeletonLoader from '../../../Components/Common/contentSkeletonLoader';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import CustomFilterBtn from '../../../Components/CustomFilterBtn'
import {formateSubCategoryProducts} from '../../../utils/dataFormatters'

const ProductCategoryScreen = ({ navigation, route }) => {
  const { selectedCategory, categoryData } = route?.params || {};
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();

  console.log("SELECTED CATEGORY",selectedCategory)
  
  // Redux state
  const { 
    productsBySubcategory, 
    loading: productsLoading, 
    error: productsError 
  } = useSelector((state) => state.subCategoryProducts);

  // Fetch products on mount
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        if (selectedCategory) {
          await dispatch(fetchProductsBySubcategory(selectedCategory));
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setPageLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory]);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      if (selectedCategory) {
        await dispatch(fetchProductsBySubcategory(selectedCategory));
      }
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  // Get products for the current category
  const products = productsBySubcategory[selectedCategory] || [];

  // Render each section of the screen
  const renderSection = ({ item }) => item;

  const sections = [
    <View key="product-category-content">
      {/* Header */}
      <View style={styles.headerView}>
        <CustomHeader navigation={navigation} label={categoryData?.name || 'Products'} />
      </View>

      {/* Category List */}
      <View style={styles.categoryList}>
        <CustomCategoryList
          height={50}
          width={62}
          gap={15}
          horizontal={true}
          borderRadius={5}
          data={WatchStoreData}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.bottomSheetContainer}>
        <SortBottomSheet visible={sortSheetVisible} onClose={() => setSortSheetVisible(false)} />
        <CustomFilterBtn
          title="Filter"
          width={80}
          height={30}
          onPress={() => setShowSheet(true)}
          icon={<Icon name="filter-list" size={20} color="#1C1B1F7D" />}
        />
        <CustomFilterBtn
          title="Sort"
          width={80}
          height={30}
          onPress={() => setSortSheetVisible(true)}
          icon={
            <View style={{ transform: [{ rotate: '270deg' }] }}>
              <Icon name="sync-alt" size={20} color="#1C1B1F7D" />
            </View>
          }
        />
      </View>

      {/* Filter Bottom Sheet */}
      <CustomBottomSheet visible={showSheet} onClose={() => setShowSheet(false)}>
        <CustomFilterBtn onPress={() => console.log('Filter pressed')} label="Filter Options" />
      </CustomBottomSheet>

      <HorizontalLine />

      {/* Products Section */}
      {error ? (
        <ErrorView
          message={error}
          onRetry={handleRefresh}
          containerStyle={{ marginVertical: Height(20) }}
        />
      ) : productsLoading ? (
        <ContentSkeletonLoader type="grid" itemCount={4} />
      ) : products.length > 0 ? (
        <View style={styles.mainContainer}>
          <CustomProductCard
            height={Height(120)}
            imageSize={Width(130)}
            navigation={navigation}
            bgColor="#D4DEF226"
            numColumns={2}
            width={Width(140)}
            horizontal={false}
            data={formateSubCategoryProducts(products)}
          />
        </View>
      ) : (
        <Text style={{ textAlign: 'center', color: '#999', marginVertical: Height(20) }}>
          No products found
        </Text>
      )}

      {/* Sponsored Section */}
      {/* <SponsordSection navigation={navigation} /> */}
    </View>
  ];

  // Show full screen loader during initial load
  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
   <View style={styles.container}>
     <PullToRefresh refreshing={refreshing} onRefresh={handleRefresh}>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Height(20) }}
      />
    </PullToRefresh>
   </View>
  );
};

export default ProductCategoryScreen;