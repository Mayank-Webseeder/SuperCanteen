import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { calculateFinalAmount } from '../../../../utils/helper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Footer = ({ navigation }) => {
  const { items: cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { appliedCoupons } = useSelector(state => state.coupon);
  const insets = useSafeAreaInsets();

  // ✅ Filter in-stock items
  const inStockCartItems = cartItems.filter(item => {
    const availableStock = item?.product?.outOfStock 
      ? 0 
      : (item?.variantDetails?.countInStock || item?.product?.countInStock || 0);
    return availableStock > 0;
  });

  const finalAmount = calculateFinalAmount({
    cartItems: inStockCartItems,  // 👈 use only in-stock items
    appliedCoupon: appliedCoupons
  });

  const itemCount = inStockCartItems.reduce((count, item) => count + (item.qty || 1), 0);

  const handleCheckout = () => {
    if (inStockCartItems.length === 0) return;

    if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
    } else {
      navigation.navigate('ProductCheckoutScreen', { 
        finalAmount, 
        fromCart: true,
        cartItems: inStockCartItems  // 👈 pass filtered data to checkout
      });
    }
  };

  return (
    <View style={[styles.footerContainer, { paddingBottom: insets.bottom + 10 }]}>
      <View style={styles.priceContainer}>
        <Text style={styles.itemCount}>
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>₹{Math.round(finalAmount)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkoutButton, (inStockCartItems.length === 0) && styles.disabledButton]}
        onPress={handleCheckout}
        disabled={inStockCartItems.length === 0}
      >
        <Text style={styles.checkoutText}>
          {inStockCartItems.length > 0 ? 'Proceed to Checkout' : 'Cart is Empty'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
    marginRight: 10,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 16,
    color: '#555',
    marginRight: 8,
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E6074',
  },
  checkoutButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 180,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Footer;