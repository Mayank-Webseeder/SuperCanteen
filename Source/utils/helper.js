import Toast from 'react-native-toast-message';

// Add this helper function to convert color names to hex codes
export const getColorHex = (colorName) => {
  const colorMap = {
    'ivory': '#FFFFF0',
    'toffee': '#D1B48C',
    // Add more color mappings as needed
  };
  
  // Try to match the color name (case insensitive)
 const lowerColor = colorName.toLowerCase();
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key)) {
      return value;
    }
  }
  
  // Default color if no match found
  return '#CCCCCC';
};

export const showWishlistToast = (message,iconType) => {
  Toast.show({
    type: 'wishlistToast',
    text1: message,
    position: 'bottom',
 visibilityTime: 1500,
    autoHide: true,
    bottomOffset: 70,
    props: { iconType: iconType },
  });
};


export const formatPrice = (price) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
  
  return formatted.replace('₹', '₹ ');
};

export const calculateProductPrice = (product, variant = null, coupon = null) => {
  const basePrice = parseFloat(product.offerPrice || product.price);
  const variantPrice = variant 
    ? parseFloat((basePrice + (parseFloat(variant.additionalPrice) || 0)).toFixed(2))
    : basePrice;

  let finalPrice = variantPrice;
  let discountAmount = 0;

  if (coupon) {
    discountAmount = parseFloat((variantPrice * coupon.percentage / 100).toFixed(2));
    finalPrice = parseFloat((variantPrice - discountAmount).toFixed(2));
    
    // Round to nearest 0.25 for better display
    const decimalPart = finalPrice - Math.floor(finalPrice);
    if (decimalPart > 0) {
      const roundedDecimal = Math.round(decimalPart * 4) / 4;
      finalPrice = parseFloat((Math.floor(finalPrice) + roundedDecimal).toFixed(2));
    }
  }

  return {
    basePrice,
    variantPrice,
    finalPrice,
    discountAmount,
    ...(coupon && { coupon, discountPercentage: coupon.percentage })
  };
}


export const calculateFinalAmount = ({ product = null, cartItems = [], appliedCoupon }) => {
  // === CASE: Single Product Checkout ===
  if (product?.isSingleProductCheckout) {
    const qty = product.quantity || 1;

    const basePrice = product.offerPrice || product.price || 0;
    const variantPrice = product?.selectedVariant?.additionalPrice || 0;

    const pricePerItem = basePrice + variantPrice;
    const subtotal = pricePerItem * qty;

    const taxPercent = product.tax || 0;
    const tax = (subtotal * taxPercent) / 100;

    const shipping = product.shippingRate || 0;

    const couponDiscount = appliedCoupon?.percentage
      ? (subtotal * appliedCoupon.percentage) / 100
      : appliedCoupon?.discountValue || 0;

    const total = subtotal + tax + shipping - couponDiscount;

    return Math.round(total);
  }

  // === CASE: Multiple Cart Items ===
  let subtotal = 0;
  let tax = 0;
  let shipping = 0;

  cartItems.forEach(item => {
    const qty = item.qty || 1;
    const basePrice = item.offerPrice || item.price || item.selectedPrice || 0;
    const variantPrice = item?.selectedVariant?.additionalPrice || 0;
    const pricePerItem = basePrice + variantPrice;

    const taxPercent = item.tax || item.product?.tax || 0;
    const itemShipping = item.shippingRate || item.product?.shippingRate || 0;

    const itemSubtotal = pricePerItem * qty;

    subtotal += itemSubtotal;
    tax += (itemSubtotal * taxPercent) / 100;
    shipping += itemShipping;
  });

  const couponDiscount = appliedCoupon?.percentage
    ? (subtotal * appliedCoupon.percentage) / 100
    : appliedCoupon?.discountValue || 0;

  const total = subtotal + tax + shipping ;

  return Math.round(total);
};












































































































































































































































































































