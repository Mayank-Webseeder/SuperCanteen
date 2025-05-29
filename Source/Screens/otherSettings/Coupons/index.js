import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import { COUPONSDATA } from '../../../mock/Data/couponsData';
import CustomCommonHeader from '../../../components/common/customCommonHeader';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import { styles } from './styles';
import CouponCard from '../../../otherComponents/otherSettings/couponCard';
import FilterTabs from './filterTabs';

const FILTER_CATEGORIES = [
  'All',
  'Trending',
  'Biggest Discount',
  'Expiring Soon',
  'Recently Added',
];

const CouponScreen = ({navigation}) => {
 const [selectedCategory, setSelectedCategory] = useState('All');

const handleCategoryPress = (category) => {
  setSelectedCategory(category);
};

const filteredCoupons = selectedCategory === 'All'
  ? COUPONSDATA
  : COUPONSDATA.filter((coupon) => coupon.category === selectedCategory);


const renderCouponCard = ({ item, index }) => {
  const isSingleCard = filteredCoupons.length % 2 !== 0 && index === filteredCoupons.length - 1;
  return <CouponCard  isCoupons={true}  item={item} isSingleCard={isSingleCard} />;
};
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
  data={filteredCoupons}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={filteredCoupons.length > 1 ? styles.row : null}
  contentContainerStyle={styles.listContent}
  renderItem={({ item, index }) => renderCouponCard({ item, index })}
/>
    </View>
  );
};



export default CouponScreen;
