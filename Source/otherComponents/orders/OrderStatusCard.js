import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Height, Width } from '../../constants/constants';

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
       <View style={{marginHorizontal:Width(10)}}>
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
        
        {/* Add other action buttons similarly */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop:16,
    paddingBottom:12,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginTop:Height(7)
  },
  productInfo: {
    marginBottom: 12,
  },
  row:{
    flexDirection:"row",
   
  },
  image:{
    height:Height(60),
    width:Width(60),
    resizeMode:"contain"
    
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    color: '#2E6074',
    marginBottom: 4,
    lineHeight:Height(17)
  },
  exchangeNote: {
    fontSize: 12,
    color: '#e67e22',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OrderStatusCard;