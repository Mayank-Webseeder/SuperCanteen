import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Height } from '../../constants';
import CustomOrderCard from '../../components/order/orderCard/customOrderCard';

const OrderListItem = ({ order, onPress }) => {
  const { product, status } = order;
  const renderStatus = () => {
    switch (status) {
      case 'arriving':
        return (
          <CustomOrderCard status={status} item={product}/>
        );
      case 'delivered':
        return (
         <CustomOrderCard status={status} item={product}/>
        );
      case 'cancelled':
        return (
         <CustomOrderCard status={status} item={product}/>
        );
      case 'exchange_initiated':
        return (
          <CustomOrderCard status={status} item={product}/>
        );
      default:
        return null;
    }
  };

  

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.infoContainer}>
                    {renderStatus()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom:Height(12)
  }
});

export default OrderListItem;
