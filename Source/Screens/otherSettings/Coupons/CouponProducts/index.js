import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
} from 'react-native';
import { IMGURL } from '../../../../utils/dataFormatters';
import { styles } from './styles';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';

const CouponProductsScreen = ({ route, navigation }) => {
  const { coupon } = route.params;
  const eligibleProducts = route.params.products.filter(p => 
    p.coupons?.includes(coupon._id)
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
    >
      <Image 
        source={{ uri: `${IMGURL}${item.images[0]}` }} 
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.brandName}>{item.brand.name}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
          <Text style={styles.mrpPrice}>₹{item.mrp}</Text>
          <Text style={styles.discount}>
            {Math.round(((item.mrp - item.offerPrice) / item.mrp) * 100)}% OFF
          </Text>
        </View>

        {item.isBestSeller && (
          <View style={styles.bestSellerTag}>
            <Text style={styles.bestSellerText}>BESTSELLER</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
     <CustomCommonHeader navigation={navigation} title={'Coupons'}/>
       <View style={styles.header}>
<Text style={styles.couponCode}>{coupon.code}</Text>
       </View>
      {/* Products List */}
      {eligibleProducts.length > 0 ? (
        <FlatList
          data={eligibleProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No eligible products found</Text>
          <Text style={styles.emptySubtext}>
            This coupon cannot be applied to any current products
          </Text>
        </View>
      )}
    </View>
  );
};

export default CouponProductsScreen;