import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Height } from '../../constants';
import CustomOrderCard from '../../Components/order/orderCard/customOrderCard';

const OrderListItem = ({ order, onPress }) => {
  // Make sure order has the required properties
  const orderId = order?._id || order?.id;
  // Format date without dayjs
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Get delivery date (3 days from order date)
  const getDeliveryDate = () => {
    if (!order.createdAt) return '';
    const deliveryDate = new Date(order.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${deliveryDate.getDate()} ${months[deliveryDate.getMonth()]}`;
  };

  // Calculate total items count
  const totalItems = order.orderItems?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0;

  // Get primary product details (first item or default)
  const primaryProduct = order.orderItems?.[0] || {};
  const productNameParts = primaryProduct.name?.split(' ') || ['Product'];
  const brandName = productNameParts[0] || 'Brand';

  // Prepare status mapping
  const statusMap = {
    'awaited': 'arriving',
    'delivered': 'delivered',
    'cancelled': 'cancelled',
    'shipped': 'arriving',
    'processing': 'arriving',
    'exchange_initiated': 'exchange_initiated',
    'return_initiated': 'exchange_initiated'
  };

  // Prepare data for CustomOrderCard
  const cardData = {
    id: order.orderId || order._id,
    brand: brandName,
    name: primaryProduct.name || 'Product',
    image: primaryProduct.image || '',
    date: formatDate(order.createdAt),
    deliveryDate: getDeliveryDate(),
    price: order.totalPrice || 0,
    items: totalItems,
    status: statusMap[order.status?.toLowerCase()] || 'arriving',
    paymentStatus: order.paymentStatus?.toLowerCase() || 'pending',
    isPaid: order.isPaid || false,
    isDelivered: order.isDelivered || false,
    orderItems: order.orderItems || []
  };

  // Enhanced action handlers
  const handleCancel = () => {
    console.log('Cancel order', order._id);
    // Add actual cancellation logic here
  };

  const handleTrack = () => {
    console.log('Track order', order._id);
    // Add actual tracking logic here
  };

  const handleReplace = () => {
    console.log('Replace order', order._id);
    // Add actual replacement logic here
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onPress}
      style={styles.container}
    >
      <CustomOrderCard 
        status={cardData.status} 
        item={cardData}
        onViewDetails={onPress}
        onCancel={handleCancel}
        onTrack={handleTrack}
        onReplace={handleReplace}
        enableCancel={cardData.status === 'arriving'}
        enableTrack={cardData.status === 'arriving'}
        enableReplace={cardData.status === 'arriving'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Height(12),
   
  },
  row: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  }
});

export default OrderListItem;