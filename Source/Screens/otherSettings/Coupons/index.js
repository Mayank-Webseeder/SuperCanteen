import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import { styles } from './styles';
import CouponCard from '../../../otherComponents/otherSettings/couponCard';
import FilterTabs from './filterTabs';
import { getAllCoupons } from '../../../redux/slices/couponSlice';
import { useSelector } from 'react-redux';
import { GETALLPRODUCTS } from '../../../api';
import { getData } from '../../../utils/apiClient';

const FILTER_CATEGORIES = [
  'All',
  'Trending',
  'Biggest Discount',
  'Expiring Soon',
  'Recently Added',
];

const CouponScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { coupons, loading, error, appliedCoupons } = useSelector((state) => state.coupon);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { productId } = route.params || {};

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

 const handleApplyCoupon = async (coupon) => {
  const response = await getData(GETALLPRODUCTS);
  console.log("RESPONSE IS",response.data)
 
  const eligibleProducts = response.data.filter(p => 
    p.coupons?.includes(coupon._id)
  );

 navigation.navigate('CouponProduct', { 
    coupon,
    products: eligibleProducts
  });
};

  const filteredCoupons = () => {
    const now = new Date();
    let filtered = [...coupons];

    switch (selectedCategory) {
      case 'Trending':
        filtered = filtered.filter(coupon => coupon.percentage > 50);
        break;
      case 'Biggest Discount':
        filtered.sort((a, b) => b.percentage - a.percentage);
        break;
      case 'Expiring Soon':
        filtered = filtered
          .filter(coupon => new Date(coupon.expire) > now)
          .sort((a, b) => new Date(a.expire) - new Date(b.expire));
        break;
      case 'Recently Added':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  const renderCouponCard = ({ item, index }) => {
   const isApplied = productId 
    ? appliedCoupons[productId]?._id === item._id 
    : Object.values(appliedCoupons).some(c => c._id === item._id); 
    const couponData = {
      ...item,
      title: `${item.percentage}% OFF`,
      description: item.name,
      code: item.name,
      expiry: formatDate(item.expire),
      isApplied
    };

    const isSingleCard = filteredCoupons().length % 2 !== 0 && index === filteredCoupons().length - 1;
    
    return (
      <CouponCard 
        item={couponData} 
        isSingleCard={isSingleCard} 
        isCoupons={true}
        onApply={handleApplyCoupon}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title={'Coupons'}/>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title={'Coupons'}/>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Coupons'}/>
      <HorizontalLine lineStyle={styles.lineStyle}/>
      <View>
        <FilterTabs
          data={FILTER_CATEGORIES}
          selected={selectedCategory}
          onSelect={handleCategoryPress}
        /> 
      </View>  
      <Text style={styles.titleStyle}>Your Coupons</Text>
      <FlatList
        data={filteredCoupons()}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={filteredCoupons().length > 1 ? styles.row : null}
        contentContainerStyle={styles.listContent}
        renderItem={renderCouponCard}
      />
    </View>
  );
};

export default CouponScreen;