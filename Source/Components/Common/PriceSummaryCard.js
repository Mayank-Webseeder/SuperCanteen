import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

const PriceSummaryCard = ({ product = null, items: propItems = [], priceDetails = {} }) => {
const { items: cartItems } = useSelector((state) => state.cart)
const { appliedCoupons } = useSelector(state => state.coupon)

 const appliedCoupon = product?.isSingleProductCheckout 
      ? appliedCoupons[product?._id]
      : appliedCoupons?.cartWide;

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
  const basePrice = product.offerPrice || product.price || 0;
  const variantExtra = product?.selectedVariant?.additionalPrice || 0;

  const actualPrice = basePrice + variantExtra; // Price to apply tax & coupon on
  const mrp = (product?.mrp || basePrice) + variantExtra;
  const shipping = product.shippingRate || 0;
  const taxPercent = product.tax || 0;

  const tax = Math.round((actualPrice * taxPercent) / 100); // Round to nearest integer
  // ✅ COUPON DISCOUNT
  const couponDiscount = appliedCoupon?.percentage
    ? (actualPrice * appliedCoupon.percentage) / 100
    : appliedCoupon?.discountValue || 0;

  const total = actualPrice + tax + shipping - couponDiscount;

  return {
    originalPrice: mrp,
    sellingPrice: actualPrice,
    totalDiscount: mrp - actualPrice,
    couponDiscount,
    shippingFee: shipping,
    taxAmount: tax,
    totalAmount: Math.round(total),
    isSingleProduct: true,
  };
}
    let totalOriginal = 0;
    let totalSelling = 0;
    let tax = 0;
    let shipping = 0;
    let totalCouponDiscount = 0;

    const itemsToUse =  cartItems;
    itemsToUse
  .filter(item => {
    // If variant exists, check its stock
    if (item.variantDetails) {
      return (
        item.variantDetails.countInStock > 0 &&
        item.variantDetails.outOfStock !== true
      );
    }

    // Fallback to parent product stock
    return (
      (item.product?.countInStock ?? 0) > 0 &&
      item.product?.outOfStock !== true
    );
  }).forEach(item => { 
      const qty = item.qty || 1;
      const mrp = item.mrp || item.product?.mrp || item.price || 0;
      const price = item.offerPrice || item.price || item.product.offerPrice || mrp;
      const additionalPrice = item.variantDetails?.additionalPrice || 0;



 // 2. Calculate actual price per unit (including variant additional price)
  const pricePerUnit = price + additionalPrice;
  const itemSubtotal = pricePerUnit * qty;
  
  // 3. Calculate coupon discount if available
  const productId = item.product?._id;
  const coupon = appliedCoupons?.[productId];
  let itemDiscount = 0;
  
  if (coupon) {
    itemDiscount = (itemSubtotal * coupon.percentage) / 100;
    totalCouponDiscount += itemDiscount;
  }
  
  // 4. Accumulate totals
  totalOriginal += mrp * qty;
  totalSelling += itemSubtotal;
  
  // 5. Calculate tax (10% on the item subtotal)
  const taxPercent = item.tax || item.product?.tax;
  tax += (itemSubtotal * taxPercent) / 100;
  
  // 6. Add shipping
  const shippingRate = item.product?.shippingRate || 0;
  shipping += shippingRate;
  
});

const total = totalSelling + tax + shipping - totalCouponDiscount;

return {
  originalPrice: totalOriginal,
  sellingPrice: totalSelling,
  totalDiscount: totalOriginal - totalSelling,
  couponDiscount: totalCouponDiscount,
  shippingFee: shipping,
  taxAmount: tax,
  totalAmount: total,
  isSingleProduct: false
};


  }, [product, cartItems, propItems, priceDetails, appliedCoupons]);

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
              <Text style={styles.originalPrice}>₹{(originalPrice)}</Text>
            )}
            <Text style={styles.sellingPrice}>₹{(sellingPrice)}</Text>
          </View>
        </View>

        {/* You Save - Only show if there's a discount */}
        {(totalDiscount > 0) && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>You Save</Text>
            <Text style={[styles.priceValue, styles.discountValue]}>
              ₹{(totalDiscount)}
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
              -₹{(couponDiscount.toFixed(2))}
            </Text>
          </View>
        )}

        {/* Tax */}
        {taxAmount > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>₹{taxAmount.toFixed(2)}</Text>
          </View>
        )}

        {/* Delivery */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Delivery Charges</Text>
          <Text style={styles.priceValue}>
            {shippingFee === 0 ? 'FREE' : `₹${(shippingFee)}`}
          </Text>
        </View>

        {/* Total Amount */}
        <View style={styles.totalContainer}>
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{(totalAmount.toFixed(2))}</Text>
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