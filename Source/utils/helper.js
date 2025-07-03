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


export const calculateFinalAmount = ({ product = null, cartItems = [], appliedCoupon = null }) => {
  if (product?.isSingleProductCheckout) {
    const qty = product.quantity || 1;
    const price = product.offerPrice || product.price || 0;
    const shipping = product.shippingRate ;
    const taxPercent = product.tax || 0;
    const coupon = appliedCoupon?.discountValue || 0;

    const subtotal = price * qty;
    const tax = (subtotal * taxPercent) / 100;

    const total = subtotal + tax + shipping - coupon;

    

    return Math.round(total);
  }

  // === CASE: Multiple cart items ===
   let subtotal = 0;
  let tax = 0;
  let shipping = 0;

  cartItems.forEach(item => {
    const qty = item.qty || 1;
    const price = item.selectedPrice || item.price || 0;
    const taxPercent = item.tax || item.product?.tax || 10; // Default 10% tax
    const itemShipping = item.shippingRate || item.product?.shippingRate || 0;

    subtotal += price * qty;
    tax += (price * qty * taxPercent) / 100;
    shipping += itemShipping; // Sum up individual shipping rates
  });

  const couponDiscount = appliedCoupon?.discountValue || 0;
  const total = subtotal + tax + shipping - couponDiscount;

  return Math.round(total);
};

