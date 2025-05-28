import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Height, Width } from '../../constants/constants';
import CustomOrderCard from '../../Components/customOrderCard';

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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  productImage: {
    width: Width(22),
    height: Width(22),
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom:Height(12)
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E2E2E',
  },
  brandText: {
    color: '#777',
    marginTop: 4,
    fontSize: 14,
  },
  arrivingText: {
    marginTop: 8,
    color: '#FFA500',
    fontWeight: '600',
  },
  deliveredText: {
    marginTop: 8,
    color: '#28a745',
    fontWeight: '600',
  },
  cancelledText: {
    marginTop: 8,
    color: '#dc3545',
    fontWeight: '600',
  },
  exchangeText: {
    marginTop: 8,
    color: '#007bff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  btn: {
    backgroundColor: '#2E6074',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  btnOutline: {
    borderColor: '#2E6074',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnOutlineText: {
    color: '#2E6074',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default OrderListItem;
