import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { calculateFinalAmount } from '../../../../utils/helper'

const Footer = ({ navigation, agreeTerms }) => {
  const { items: cartItems } = useSelector(state => state.cart);
 const { user } = useSelector(state => state.auth);

  const { appliedCoupons } = useSelector(state => state.coupon);
    const appliedCoupon = appliedCoupons?.cartWide;

  const finalAmount = calculateFinalAmount({
     cartItems,
     appliedCoupon
   });


  const itemCount = cartItems.reduce((count, item) => count + (item.qty || 1), 0);


  const  handleCheckout = () => {
    if (!agreeTerms) {
      return;
    }
    if (cartItems.length === 0) {
      return;
    }
      if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
    } else {
      navigation.navigate('ProductCheckoutScreen', { finalAmount , fromCart:true  });
    }
  };



  return (
    <View style={styles.footerContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>₹{Math.round(finalAmount)}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.checkoutButton, (!agreeTerms || cartItems.length === 0) && styles.disabledButton]}
        onPress={handleCheckout}
        disabled={!agreeTerms || cartItems.length === 0}
      >
        <Text style={styles.checkoutText}>
          {cartItems.length > 0 ? 'Proceed to Checkout' : 'Cart Empty'}
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