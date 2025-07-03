import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

const PriceSummaryCard = ({ product = null, items: propItems = [], priceDetails = {} }) => {
  const { items: cartItems, appliedCoupon } = useSelector((state) => state.cart)
  const {
    originalPrice,   // Original MRP (strikethrough)
    sellingPrice,    // Actual price user pays
    totalDiscount,
    couponDiscount,
    shippingFee,
    taxAmount,
    totalAmount,
    isSingleProduct
  } = useMemo(() => {
    const isSingleProduct = !!product;
    
    // === CASE 1: Single product checkout ===
   if (isSingleProduct) {
  const mrp = product.mrp || product.price;
  const price = product.offerPrice || product.price || mrp;
  const shipping = product.shippingRate
  const taxPercent = product.tax; 

  const tax = (price * taxPercent) / 100;
  const total = price + tax + shipping;

  return {
    originalPrice: mrp,
    sellingPrice: price,
    totalDiscount: mrp - price,
    couponDiscount: 0,
    shippingFee: shipping,
    taxAmount: tax,
    totalAmount: total, // This should now match ₹379
    isSingleProduct: true
  };
}


    // === CASE 2: Cart checkout ===
    let totalOriginal = 0;
    let totalSelling = 0;
    let tax = 0;
   let shipping = 0;

    const itemsToUse = propItems.length > 0 ? propItems : cartItems;
    
    itemsToUse.forEach(item => {
      const qty = item.qty || 1;
      const mrp = item.mrp || item.product?.mrp || item.price || 0;
      const price = item.offerPrice || item.price || item.selectedPrice || mrp;
      const taxPercent = item.tax || item.product?.tax || 0;
      const shippingRate = item.product?.shippingRate || 0;

      totalOriginal += mrp * qty;
      totalSelling += price * qty;
      tax += ((price * qty) * taxPercent) / 100;
        shipping += shippingRate; 
    });

    const couponDisc = appliedCoupon?.discountValue || 0;
    const total = totalSelling + tax + shipping - couponDisc;

    return {
      originalPrice: totalOriginal,
      sellingPrice: totalSelling,
      totalDiscount: totalOriginal - totalSelling,
      couponDiscount: couponDisc,
      shippingFee: shipping,
      taxAmount: tax,
      totalAmount: total,
      isSingleProduct: false
    };
  }, [product, cartItems, propItems, priceDetails, appliedCoupon]);

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

        {/* Price Display - Same for both single product and cart */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Price</Text>
          <View style={styles.priceContainer}>
            {originalPrice > sellingPrice && (
              <Text style={styles.originalPrice}>₹{Math.round(originalPrice)}</Text>
            )}
            <Text style={styles.sellingPrice}>₹{Math.round(sellingPrice)}</Text>
          </View>
        </View>

        {/* You Save - Only show if there's a discount */}
        {(totalDiscount > 0) && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>You Save</Text>
            <Text style={[styles.priceValue, styles.discountValue]}>
              ₹{Math.round(totalDiscount)}
            </Text>
          </View>
        )}

        {/* Coupon Discount */}
        {couponDiscount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Coupon Discount{appliedCoupon?.code ? ` (${appliedCoupon.code})` : ''}
            </Text>
            <Text style={[styles.priceValue, styles.discountValue]}>
              -₹{Math.round(couponDiscount)}
            </Text>
          </View>
        )}

        {/* Tax */}
        {taxAmount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>₹{Math.round(taxAmount)}</Text>
          </View>
        )}

        {/* Delivery */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Delivery Charges</Text>
          <Text style={styles.priceValue}>
            {shippingFee === 0 ? 'FREE' : `₹${Math.round(shippingFee)}`}
          </Text>
        </View>

        {/* Total Amount */}
        <View style={styles.totalContainer}>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{Math.round(totalAmount)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  headerAccent: {
    height: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#2E6074',
    marginHorizontal: 3,
    marginTop: 2
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
    fontFamily: 'Inter-SemiBold',
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
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  sellingPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Inter-SemiBold',
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  discountValue: {
    color: '#4CAF50',
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
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2E6074',
  },
});

export default PriceSummaryCard;