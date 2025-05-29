import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

const OrderStatusCard = ({ order, actions, onActionPress }) => {
  const getStatusText = () => {
    switch(order.status) {
      case 'arriving': 
        return `Arriving on ${order.expectedDelivery}`;
      case 'delivered':
        return `Delivered on ${order.deliveryDate}`;
      case 'cancelled':
        return 'Order cancelled on your request';
      case 'exchange_initiated':
       return `Exchange will be picked and delivered on \n${order.exchangeDate}`;
      default:
        return '';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.productInfo}>
        <View style={styles.row}>
           <Image source={order.product.image} style={styles.image}/>
       <View style={styles.mainContainerStyle}>
<Text style={styles.brand}>{order.product.brand}</Text>
        <Text style={styles.name}>{order.product.name}</Text>
        <Text style={styles.details}>
          Size: {order.product.size} | Qty: {order.product.quantity} | {order.product.price}
        </Text>
        <Text style={styles.status}>{getStatusText()}</Text> 
       </View>
        </View>        
        {order.status === 'delivered' && order.isExchangeReturnOpen && (
          <Text style={styles.exchangeNote}>
            Exchange/Return portal {order.isExchangeReturnClosed ? 'closed' : 'open'} till {order.exchangeReturnEndDate}
          </Text>
        )}
      </View>
      
      <View style={styles.actionsContainer}>
        {actions.includes('cancel') && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onActionPress('cancel')}>
            <Text style={[styles.actionText, { color: '#e74c3c' }]}>Cancel</Text>
          </TouchableOpacity>
        )}
        
        {actions.includes('track') && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onActionPress('track')}>
            <Text style={[styles.actionText, { color: '#2E6074' }]}>Track</Text>
          </TouchableOpacity>
        )}
    </View>
    </View>
  );
};

export default OrderStatusCard;