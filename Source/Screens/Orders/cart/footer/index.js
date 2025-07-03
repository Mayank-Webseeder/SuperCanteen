import React, { useMemo , } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Footer = ({ navigation, agreeTerms }) => {
  const { items: cartItems } = useSelector(state => state.cart);
 const { user } = useSelector(state => state.auth);

  // Calculate total amount with proper duplicate handling
 const totalAmount = useMemo(() => {
    const total = cartItems.reduce((sum, item) => {
      try {
        const price = Number(item.selectedPrice || item.price || 0);
        const qty = Number(item.qty || 1);
        const taxPercent = Number(item?.product?.tax || 10); // Default 10% tax
        const shippingRate = item.product.shippingRate

        const subtotal = price * qty;
        const tax = (subtotal * taxPercent) / 100;
        return sum + subtotal + tax + shippingRate;
      } catch (error) {
        console.error('Calculation error:', error);
        return sum;
      }
    }, 0);
    return Math.round(total); // Final rounding
  }, [cartItems]);

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
      navigation.navigate('ProductCheckoutScreen', { totalAmount , fromCart:true  });
    }
  };



  return (
    <View style={styles.footerContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.itemCount}>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</Text>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceLabel}>Total:</Text>
          <Text style={styles.priceValue}>₹{totalAmount.toFixed(2)}</Text>
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