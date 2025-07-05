import React from 'react';
import { 
  Text, 
  ScrollView, 
  View, 
  Linking, 
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import FastImage from 'react-native-fast-image';
import { COLORS } from '@constants/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters'

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  console.log("ORDER IS",order)

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Format date like Amazon/Myntra ("5 Jul 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Format date with time ("5 Jul 2025, 3:30 PM")
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes} ${ampm}`;
  };

  const getStatusDetails = () => {
    switch(order.status.toLowerCase()) {
      case 'awaited':
        return {
          color: '#F29339', // Orange
          message: 'We have received your order',
          icon: 'hourglass-empty',
          progress: 25
        };
      case 'processing':
        return {
          color: '#F29339',
          message: 'Preparing your shipment',
          icon: 'settings',
          progress: 50
        };
      case 'shipped':
        return {
          color: '#2E90FA', // Blue
          message: `Shipped on ${formatDate(order.updatedAt)}`,
          icon: 'local-shipping',
          progress: 75
        };
      case 'delivered':
        return {
          color: '#12B76A', // Green
          message: `Delivered on ${formatDate(order.updatedAt)}`,
          icon: 'check-circle',
          progress: 100
        };
      case 'cancelled':
        return {
          color: '#F04438', // Red
          message: `Cancelled on ${formatDate(order.updatedAt)}`,
          icon: 'cancel',
          progress: 0
        };
      default:
        return {
          color: COLORS.primary,
          message: `Order ${order.status}`,
          icon: 'info',
          progress: 0
        };
    }
  };

  const statusDetails = getStatusDetails();

  const renderOrderItems = () => {
    
    return order.orderItems.map((item) => {
     const matchedVariant = item.product?.variants?.find(
    variant => variant._id === item.variantId
  );

  // Get image from variant or fallback to item image
  const imageUrl = matchedVariant?.images?.[0]
    ? `${IMGURL}${matchedVariant.images[0]}`
    : `${IMGURL}${item.image}`;

   
     return (
       <View key={item._id} style={styles.itemContainer}>
        <FastImage 
          source={{ uri: item.image.startsWith('http') ? item.image : `https://www.api-supercanteen.webseeder.tech${item.image}` }} 
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.itemBrand}>{item.product?.name || 'Generic Brand'}</Text>
          
          {item.variantDetails && (
            <View style={styles.variantContainer}>
              {Object.entries(item.variantDetails).map(([key, value]) => (
                <Text key={key} style={styles.variantText}>
                  {key}: {typeof value === 'object' ? value.value : value}
                </Text>
              ))}
            </View>
          )}
          
          <View style={styles.priceQtyContainer}>
            <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.itemQty}>Qty: {item.qty}</Text>
          </View>
        </View>
      </View>
     )
  });
  };

  const renderActionButtons = () => {
    const buttons = [];
    
    // Cancel button for pending orders
    if (['awaited', 'processing'].includes(order.status.toLowerCase())) {
      buttons.push(
        <TouchableOpacity 
          key="cancel"
          style={[styles.actionButton, styles.cancelButton]}
          onPress={() => navigation.navigate('CancelOrder', { orderId: order._id })}
        >
          <Icon name="cancel" size={18} color="#F04438" />
          <Text style={[styles.actionButtonText, { color: '#F04438' }]}>Cancel Order</Text>
        </TouchableOpacity>
      );
    }

    // Track button for shipped orders
    if (['shipped'].includes(order.status.toLowerCase())) {
      buttons.push(
        <TouchableOpacity 
          key="track"
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => navigation.navigate('OrderTracking', { orderId: order._id })}
        >
          <Icon name="location-on" size={18} color="#fff" />
          <Text style={[styles.actionButtonText, { color: '#fff' }]}>Track Package</Text>
        </TouchableOpacity>
      );
    }

    // Rate/Review for delivered orders
    if (order.status.toLowerCase() === 'delivered') {
      buttons.push(
        <TouchableOpacity 
          key="rate"
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('RateOrder', { orderId: order._id })}
        >
          <Icon name="star" size={18} color={COLORS.primary} />
          <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>Rate & Review</Text>
        </TouchableOpacity>
      );

      // Return/Exchange option
      if (order.isReturnable) {
        buttons.push(
          <TouchableOpacity 
            key="return"
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('StartReturn', { orderId: order._id })}
          >
            <Icon name="assignment-return" size={18} color={COLORS.primary} />
            <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>Return or Exchange</Text>
          </TouchableOpacity>
        );
      }
    }

    // Buy Again for cancelled/delivered orders
    if (['cancelled', 'delivered'].includes(order.status.toLowerCase())) {
      buttons.push(
        <TouchableOpacity 
          key="reorder"
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => navigation.navigate('Reorder', { orderId: order._id })}
        >
          <Icon name="replay" size={18} color="#fff" />
          <Text style={[styles.actionButtonText, { color: '#fff' }]}>Buy Again</Text>
        </TouchableOpacity>
      );
    }

    return buttons.length > 0 ? (
      <View style={styles.actionButtonsContainer}>
        {buttons}
      </View>
    ) : null;
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomCommonHeader navigation={navigation} title="Order Details" />
      
      {/* Order Status Card (Like Amazon) */}
      <View style={[styles.statusCard, { borderLeftColor: statusDetails.color }]}>
        <View style={styles.statusHeader}>
          <Icon name={statusDetails.icon} size={24} color={statusDetails.color} />
          <View style={styles.statusTextContainer}>
            <Text style={[styles.statusTitle, { color: statusDetails.color }]}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
            <Text style={styles.statusMessage}>{statusDetails.message}</Text>
          </View>
        </View>
        
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderInfoLabel}>Order ID</Text>
          <Text style={styles.orderInfoValue}>{order.orderId}</Text>
          
          <Text style={styles.orderInfoLabel}>Order Date</Text>
          <Text style={styles.orderInfoValue}>{formatDateTime(order.createdAt)}</Text>
          
          {order.paidAt && (
            <>
              <Text style={styles.orderInfoLabel}>Payment Date</Text>
              <Text style={styles.orderInfoValue}>{formatDateTime(order.paidAt)}</Text>
            </>
          )}
        </View>
      </View>

      {/* Delivery Progress (Like Myntra) */}
      {['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()) && (
        <View style={styles.deliveryProgressContainer}>
          <Text style={styles.sectionTitle}>Delivery Progress</Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { 
                width: `${statusDetails.progress}%`,
                backgroundColor: statusDetails.color
              }
            ]} />
          </View>
          
          <View style={styles.progressSteps}>
            <View style={styles.progressStep}>
              <View style={[
                styles.progressDot, 
                { backgroundColor: COLORS.primary }
              ]} />
              <Text style={styles.progressLabel}>Order Placed</Text>
              <Text style={styles.progressDate}>{formatDate(order.createdAt)}</Text>
            </View>
            
            <View style={styles.progressStep}>
              <View style={[
                styles.progressDot, 
                { 
                  backgroundColor: ['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()) 
                    ? COLORS.primary 
                    : '#E5E7EB' 
                }
              ]} />
              <Text style={styles.progressLabel}>Processing</Text>
              {order.status.toLowerCase() === 'processing' && (
                <Text style={styles.progressDate}>{formatDate(order.updatedAt)}</Text>
              )}
            </View>
            
            <View style={styles.progressStep}>
              <View style={[
                styles.progressDot, 
                { 
                  backgroundColor: ['shipped', 'delivered'].includes(order.status.toLowerCase()) 
                    ? COLORS.primary 
                    : '#E5E7EB' 
                }
              ]} />
              <Text style={styles.progressLabel}>Shipped</Text>
              {order.status.toLowerCase() === 'shipped' && (
                <Text style={styles.progressDate}>{formatDate(order.updatedAt)}</Text>
              )}
            </View>
            
            <View style={styles.progressStep}>
              <View style={[
                styles.progressDot, 
                { 
                  backgroundColor: order.status.toLowerCase() === 'delivered' 
                    ? COLORS.primary 
                    : '#E5E7EB' 
                }
              ]} />
              <Text style={styles.progressLabel}>Delivered</Text>
              {order.status.toLowerCase() === 'delivered' && (
                <Text style={styles.progressDate}>{formatDate(order.updatedAt)}</Text>
              )}
            </View>
          </View>
        </View>
      )}

      {/* Order Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {order.orderItems.length} {order.orderItems.length > 1 ? 'Items' : 'Item'} in this order
        </Text>
        {renderOrderItems()}
      </View>

      {/* Delivery Address */}
      <View style={[styles.section,{marginTop:10}]}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressCard}>
          <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
          <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
          <Text style={styles.addressText}>
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
          </Text>
          <Text style={styles.addressText}>{order.shippingAddress.country}</Text>
          <Text style={styles.addressContact}>Phone: {order.shippingAddress.contactNo}</Text>
        </View>
      </View>

      {/* Payment Summary */}
      <View style={[styles.section,{marginTop:10,marginBottom:16}]}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({order.orderItems.length} items)</Text>
          <Text style={styles.summaryValue}>₹{order.itemsPrice.toLocaleString('en-IN')}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹{order.shippingPrice.toLocaleString('en-IN')}</Text>
        </View>
        
        {order.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={[styles.summaryValue, { color: '#12B76A' }]}>
              -₹{order.discount.toLocaleString('en-IN')}
            </Text>
          </View>
        )}
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxes</Text>
          <Text style={styles.summaryValue}>₹{order.taxPrice.toLocaleString('en-IN')}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={[styles.summaryRow, { marginTop: 8 }]}>
          <Text style={[styles.summaryLabel, { fontWeight: '600' }]}>Total Amount</Text>
          <Text style={[styles.summaryValue, { fontWeight: '600' }]}>
            ₹{order.totalPrice.toLocaleString('en-IN')}
          </Text>
        </View>
        
        <View style={styles.paymentMethod}>
          <Icon 
            name={order.paymentMethod === 'cod' ? 'money' : 'credit-card'} 
            size={18} 
            color="#666" 
          />
          <Text style={styles.paymentText}>
            Paid via {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
            {order.isPaid ? ' (Paid)' : ' (Pending)'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      {renderActionButtons()}

      {/* Customer Support */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need help with this order?</Text>
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => Linking.openURL(`mailto:support@supercanteen.com?subject=Help with Order ${order.orderId}`)}
        >
          <Icon name="headset-mic" size={20} color={COLORS.green} />
          <Text style={styles.helpButtonText}>Contact Customer Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default OrderDetailScreen;