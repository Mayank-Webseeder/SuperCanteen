import Toast from 'react-native-toast-message';
import Share from 'react-native-share';
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
let couponDiscount = 0;


cartItems.forEach(item => {
  const qty = item.qty || 1;
  
  // 1. Get base prices - using item.product.offerPrice as you requested
  const basePrice = item.product?.offerPrice || item.offerPrice || item.price || item.selectedPrice || 0;
  
  // 2. Get variant additional price (from either selectedVariant or variantDetails)
  const variantPrice = item?.selectedVariant?.additionalPrice || 
                      item?.variantDetails?.additionalPrice || 
                      0;
  
  // 3. Calculate final price per item
  const pricePerItem = basePrice + variantPrice;
  const itemSubtotal = pricePerItem * qty;
  
  // 4. Calculate tax (default 10% if not specified)
  const taxPercent = item.tax || item.product?.tax || 10;
  tax += (itemSubtotal * taxPercent) / 100;
  
  // 5. Add shipping
  const itemShipping = item.shippingRate || item.product?.shippingRate || 0;
  shipping += itemShipping;
  
  // 6. Calculate coupon discount if product has specific coupon
  const productId = item.product?._id;
  const productCoupon = appliedCoupon?.[productId];
  
  if (productCoupon) {
    couponDiscount += (itemSubtotal * productCoupon.percentage) / 100;
  }
  
  // 7. Add to subtotal
  subtotal += itemSubtotal;

  // console.log("Item Calculation:", {
  //   name: item.name,
  //   basePrice,
  //   variantPrice,
  //   pricePerItem,
  //   qty,
  //   itemSubtotal,
  //   tax: (itemSubtotal * taxPercent) / 100,
  //   shipping: itemShipping,
  //   coupon: productCoupon?.name || "None"
  // });
});

// Apply cart-wide coupon if no product-specific coupons were applied
if (couponDiscount === 0 && appliedCoupon) {
  couponDiscount = appliedCoupon.percentage 
    ? (subtotal * appliedCoupon.percentage) / 100 
    : appliedCoupon.discountValue || 0;
}

const total = subtotal + tax + shipping - couponDiscount;
return Math.round(total);
};


export const shareInvoice = async (filePath) => {
  try {
    await Share.open({
      url: `file://${filePath}`,
      type: 'application/pdf',
      subject: `Invoice #${filePath.split('_').pop().replace('.pdf', '')}`,
    });
  } catch (error) {
    console.error('Sharing failed:', error);
  }
};












































































































































































































































































































