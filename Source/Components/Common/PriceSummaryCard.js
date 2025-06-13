import React , {useMemo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FontSize } from '../../constants';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

const PriceSummaryCard = () => {
  const { items } = useSelector((state) => state.cart);
  
  // Memoized calculations for better performance
  const { totalMRP, totalPrice, totalDiscount, couponDiscount, shippingFee, totalAmount } = useMemo(() => {
    // Calculate prices with proper fallbacks
    let calculatedMRP = 0;
    let calculatedPrice = 0;
    
    items.forEach(item => {
      const qty = item.qty || 1;
      calculatedMRP += (item.product?.mrp || item.selectedPrice || 0) * qty;
      calculatedPrice += (item.selectedPrice || item.price || 0) * qty;
    });
    
    const calculatedDiscount = calculatedMRP - calculatedPrice;
    const coupon = 0; // Coupon logic can be added later
    const shipping = 0; // Free shipping
    const calculatedTotal = calculatedPrice + shipping - coupon;
    
    return {
      totalMRP: calculatedMRP,
      totalPrice: calculatedPrice,
      totalDiscount: calculatedDiscount,
      couponDiscount: coupon,
      shippingFee: shipping,
      totalAmount: calculatedTotal
    };
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.headerAccent} />
      
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <FastImage 
            style={styles.moneyIcon} 
            source={require('../../../assets/Icons/money_bag.png')}
          />
          <Text style={styles.title}>PRICE DETAILS</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total MRP</Text>
          <Text style={styles.priceValue}>₹{totalMRP.toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.priceLabel}>Discount on MRP</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Details</Text>
              <FontAwesome5 name="chevron-right" size={10} color="#2E6074" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.priceValue, styles.discountValue]}>- ₹{totalDiscount.toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Coupon Discount</Text>
          <Text style={[styles.priceValue, styles.discountValue]}>- ₹{couponDiscount.toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.labelContainer}>
            <Text style={styles.priceLabel}>Shipping Fee</Text>
            <TouchableOpacity style={styles.detailButton}>
              <Text style={styles.detailText}>Details</Text>
              <FontAwesome5 name="chevron-right" size={10} color="#2E6074" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.priceValue, styles.freeValue]}>FREE</Text>
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          {totalDiscount > 0 && (
            <Text style={styles.savingsText}>You save ₹{totalDiscount.toFixed(2)} on this order</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //position: 'relative',
    // marginVertical: 16,
  },
  headerAccent: {
    //position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  //  backgroundColor: '#2E6074',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F4F8',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moneyIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: '#2E6074',
  },
  title: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#2E6074',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
    fontFamily:'Inter-SemiBold'
  },
  priceValue: {
    fontSize: 14,
    fontFamily:'Inter-Medium',
    color: '#333',
  },
  discountValue: {
    color: '#4CAF50',
  },
  freeValue: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  detailText: {
    fontSize: 12,
    color: '#2E6074',
    marginRight: 4,
  },
  totalContainer: {
    marginTop: 8,
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily:'Inter-Medium',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontFamily:'Inter-Bold',
    color: '#2E6074',
  },
  savingsText: {
    fontSize: FontSize(13),
    color: '#4CAF50',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default PriceSummaryCard;