import React, { useMemo , } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const Footer = ({ navigation, agreeTerms, disabled }) => {
  const cartState = useSelector((state) => state.cart);
  const items = Array.isArray(cartState?.items) ? cartState.items : [];
   const { user } = useSelector(state => state.auth);

  // Calculate total amount with proper duplicate handling
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      try {
        const price = item.selectedPrice || item.price || 0;
        const qty = item.qty || 1;
        return sum + (Number(price) * Number(qty));
      } catch (error) {
        console.error('Error calculating item total:', error);
        return sum;
      }
    }, 0);
  }, [items]);

  const handleCheckout = () => {
    if (!agreeTerms) {
      Alert.alert('Agreement Required', 'Please agree to the terms and conditions to proceed');
      return;
    }
    
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items to proceed');
      return;
    }

      if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
    } else {
navigation.navigate('ProductCheckoutScreen', { totalAmount });
    }
    
    
  };

  // Calculate item count considering variants as unique items
  const itemCount = items.reduce((count, item) => {
    return count + (item.qty || 1);
  }, 0);

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
        style={[styles.checkoutButton, (disabled || items.length === 0) && styles.disabledButton]}
        onPress={handleCheckout}
        disabled={disabled || items.length === 0}
      >
        <Text style={styles.checkoutText}>
          {items.length > 0 ? 'Proceed to Checkout' : 'Cart Empty'}
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