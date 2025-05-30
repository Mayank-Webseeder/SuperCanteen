import React from 'react';
import {  Text, ScrollView,View, Image, Linking, TouchableOpacity } from 'react-native';
import CustomCommonHeader from '../../../Components/Common/customCommonHeader';
import OrderStatusCard from '../../../otherComponents/orders/statusCard/OrderStatusCard';
import OrderTimeline from '../../../otherComponents/orders/timeLine/OrderTimeline';
import DeliveryAddress from '../../../otherComponents/orders/DeliveryAddress';
import RatingSection from '../../../otherComponents/orders/rating/ratingSection';
import CustomSimilarProducts from '../../../Components/order/similarProducts/customSimilarProdcuts';
import PriceSummaryCard from '../../../Components/Common/priceSummaryCard';
import { SimilarProductData } from '../../../Mock/Data/SimilarProductData';
import { styles } from './styles';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  
  // Determine available actions based on order status
  const getAvailableActions = () => {
    switch(order.status) {
      case 'arriving':
        return ['cancel', 'track'];
      case 'delivered':
        if (order.isExchangeReturnOpen) {
          return ['reorder', 'exchange', 'return'];
        }
        return ['reorder', 'rate'];
      case 'cancelled':
        return [];
      case 'exchange_initiated':
        return ['cancel', 'track'];
      default:
        return [];
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Order Details" />
      
      {/* Order ID */}
      <Text style={styles.orderId}>ORDER ID: {order.id}</Text>
      
      {/* Order Status Card */}
      <OrderStatusCard 
        order={order}
        actions={getAvailableActions()}
        onActionPress={(action) => handleAction(action, order.id)}
      />
      
      {/* Order Timeline for tracking */}
    <View style={{flexDirection:"row"}}>
       {['arriving', 'exchange_initiated'].includes(order.status) && (
        <OrderTimeline status={order.status} />
      )} 
    </View>
      
      {/* Rating Section for delivered orders */}
      {order.status === 'delivered' && order.status == 'exchange_initiated' && !order.isRated && (
        <RatingSection orderId={order.id} />
      )}
      
      {/* Similar Products */}

      <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Similar Products for You</Text>
            <CustomSimilarProducts data={ SimilarProductData} />
            <View style={styles.blank}/>
              <PriceSummaryCard/>
                 {order.status !== 'cancelled' && <View style={styles.paymentBox}>
        <View style={styles.row}>
            <Image
             style={styles.currencyIcon}
             source={require('../../../../assets/Icons/money_bag.png')}
           />
           <Text style={styles.paymentText}>Cash on Delivery</Text>
         </View>
       </View>}

             <Text style={[styles.sellerText,{marginTop: order.status === 'cancelled' ? 20 : ''}]}>
         Seller:{' '}
         <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://example.com')}>
          EliteEdge Pvt Limited
        </Text>
      </Text>

      {/* Download Invoice Button (Disabled) */}
      {order.status !== 'cancelled' &&  <TouchableOpacity style={styles.disabledButton} disabled={true}>
              <Text style={styles.disabledButtonText}>Download Invoice</Text>
            </TouchableOpacity>}
          </View> 
      {/* Delivery Address */}
      <DeliveryAddress address={order.deliveryAddress} />
    </ScrollView>
  );
};



export default OrderDetailScreen;




