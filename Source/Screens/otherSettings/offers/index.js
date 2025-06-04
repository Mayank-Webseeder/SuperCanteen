import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';
import { OFFERS } from '../../../Mock/Data/offers';
import CustomCommonHeader from '@components/Common/CustomCommonHeader'
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import { styles } from './styles';
import CouponCard from '../../../otherComponents/otherSettings/couponCard';
import FilterTabs from '../Coupons/filterTabs';

const FILTER_CATEGORIES = [
  'All',
  'UPI',
  'Cards',
  '₹299+',
  'New',
  'Combo'
];

const OffersScreen = ({navigation}) => {
 const [selectedCategory, setSelectedCategory] = useState('All');

const handleCategoryPress = (category) => {
  setSelectedCategory(category);
};

const offersdCoupons = selectedCategory === 'All'
  ? OFFERS
  : OFFERS.filter((coupon) => coupon.category === selectedCategory);


const renderCouponCard = ({ item, index }) => {
  const isSingleCard = offersdCoupons.length % 2 !== 0 && index === offersdCoupons.length - 1;
  return <CouponCard  isCoupons={false}  item={item} isSingleCard={isSingleCard} />;
};
  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Offers'}/>
      <HorizontalLine lineStyle={styles.lineStyle}/>
     <View>
      <FilterTabs
  data={FILTER_CATEGORIES}
  selected={selectedCategory}
  onSelect={handleCategoryPress}
/> 
     </View>  
     <Text style={styles.titleStyle}>Your Offers</Text>
  <FlatList
  data={OFFERS}
  keyExtractor={(item) => item.id}
  numColumns={2}
  columnWrapperStyle={offersdCoupons.length > 1 ? styles.row : null}
  contentContainerStyle={styles.listContent}
  renderItem={({ item, index }) => renderCouponCard({ item, index })}
/>
    </View>
  );
};



export default OffersScreen;
