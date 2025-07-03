import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../../../redux/slices/orderSlice';
import { COLORS } from '@constants';
import { styles } from './styles';
import { IMGURL } from '../../../../utils/dataFormatters'

const OrderConfirmFinal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { orderId } = route.params;
  const { currentOrder } = useSelector(state => state.orders);
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    dispatch(fetchOrderById(orderId))
      .then(() => setLoading(false));
      
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderOrderItem = (item, index) => (
    <View key={index} style={styles.itemCard}>
      <FastImage
        source={{ uri: `${IMGURL}${item.image}` }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemBrand}>{item.name.split(' ')[0]}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <Text style={styles.itemQty}>Qty: {item.qty}</Text>
        </View>
        {item.variantDetails && (
          <View style={styles.variantContainer}>
            {item.variantDetails.color && (
              <View style={styles.variantItem}>
                <Text style={styles.variantLabel}>Color: </Text>
                <View 
                  style={[
                    styles.colorBox, 
                    { backgroundColor: item.variantDetails.color.code }
                  ]} 
                />
              </View>
            )}
            {item.variantDetails.size && (
              <View style={styles.variantItem}>
                <Text style={styles.variantLabel}>Size: </Text>
                <Text style={styles.variantValue}>{item.variantDetails.size}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Animated.View style={styles.container}>
      <CustomCommonHeader 
        navigation={navigation} 
        title="Order Details"
        showBack={false}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="check-circle" size={24} color="#4CAF50" />
            <Text style={styles.summaryTitle}>Order Confirmed</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order ID:</Text>
            <Text style={styles.summaryValue}>{currentOrder?.orderId}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Date:</Text>
            <Text style={styles.summaryValue}>
              {new Date(currentOrder?.createdAt).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount:</Text>
            <Text style={styles.totalPrice}>₹{currentOrder?.totalPrice}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Icon name="map-marker-outline" size={20} color={COLORS.green} />
            <Text style={styles.addressType}>
              {currentOrder?.shippingAddress?.addressType}
            </Text>
          </View>
          <Text style={styles.addressName}>{currentOrder?.shippingAddress?.name}</Text>
          <Text style={styles.addressText}>
            {currentOrder?.shippingAddress?.address}
          </Text>
          <Text style={styles.addressText}>
            {currentOrder?.shippingAddress?.city}, {currentOrder?.shippingAddress?.state} - {currentOrder?.shippingAddress?.postalCode}
          </Text>
          <Text style={styles.addressText}>
            {currentOrder?.shippingAddress?.country}
          </Text>
          <Text style={styles.addressContact}>
            Phone: {currentOrder?.shippingAddress?.contactNo}
          </Text>
        </View>

        {/* Order Items */}
        <Text style={styles.sectionTitle}>Order Items ({currentOrder?.orderItems?.length})</Text>
        {currentOrder?.orderItems?.map(renderOrderItem)}

        {/* Delivery Timeline */}
        <Text style={styles.sectionTitle}>Delivery Timeline</Text>
        <View style={styles.timelineCard}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Order Confirmed</Text>
              <Text style={styles.timelineDate}>
                {new Date(currentOrder?.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#BDBDBD' }]} />
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, { color: '#757575' }]}>Shipped</Text>
              <Text style={styles.timelineDate}>Expected soon</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#BDBDBD' }]} />
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, { color: '#757575' }]}>Delivered</Text>
              <Text style={styles.timelineDate}>
                Expected by {new Date(currentOrder?.createdAt).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Item Total</Text>
            <Text style={styles.paymentValue}>₹{currentOrder?.itemsPrice}</Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Delivery</Text>
            <Text style={styles.paymentValue}>₹{currentOrder?.shippingPrice}</Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Taxes</Text>
            <Text style={styles.paymentValue}>₹{currentOrder?.taxPrice}</Text>
          </View>
          
          {currentOrder?.discount > 0 && (
            <View style={styles.paymentRow}>
              <Text style={[styles.paymentLabel, { color: '#4CAF50' }]}>Discount</Text>
              <Text style={[styles.paymentValue, { color: '#4CAF50' }]}>-₹{currentOrder?.discount}</Text>
            </View>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{currentOrder?.totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>    
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.shopButtonText}>CONTINUE SHOPPING</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};



export default OrderConfirmFinal;