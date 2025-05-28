import React from 'react';
import {  Text, ScrollView, StyleSheet,View, Image, Linking, TouchableOpacity } from 'react-native';
import CustomCommonHeader from '../../Components/Common/CustomCommonHeader';
import OrderStatusCard from '../../otherComponents/orders/OrderStatusCard';
import OrderTimeline from '../../otherComponents/orders/OrderTimeline';
import DeliveryAddress from '../../otherComponents/orders/DeliveryAddress';
import RatingSection from '../../otherComponents/orders/RatingSection';
import CustomSimilarProducts from '../../Components/customSimilarProdcuts';
import { SimilarProductData } from '../../Mock/Data/SimilarProductData';
import { Height, Width } from '../../constants/constants';
import PriceSummaryCard from '../../Components/Common/PriceSummaryCard';

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
             source={require('../../../assets/Icons/money_bag.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  contentContainerStyle:{
      paddingBottom:Height(20)
  },
  orderId: {
    color: '#666',
    fontSize: 14,
    padding: 16,
    paddingBottom: 8,
  },
   sectionWrapper: {
        paddingHorizontal: 16,
        paddingVertical: Height(5),
        paddingTop:Height(15)
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily:'Inter-SemiBold',
        color: '#000',
        marginBottom: 8,
      
      },
      blank:{
        height:Height(10)
      },
        paymentBox: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    marginTop:Height(20)
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
    row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    currencyIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
    sellerText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  link: {
    color: '#2E6074E8',
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: Height(10),
    width: Width(190),
  },
  disabledButtonText: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default OrderDetailScreen;




