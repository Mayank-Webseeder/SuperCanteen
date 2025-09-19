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
    const qty =  1;

    const basePrice = product?.selectedVariant?.offerPrice ? product?.selectedVariant?.offerPrice : product.offerPrice || product.price || 0;
    const pricePerItem = basePrice ;
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

  // === 1. STOCK CHECK ===
  const isVariantAvailable = item.variantDetails &&
    item.variantDetails.countInStock > 0 &&
    item.variantDetails.outOfStock !== true;

  const isProductAvailable = (!item.variantDetails || !isVariantAvailable) &&
    (item.product?.countInStock ?? 0) > 0 &&
    item.product?.outOfStock !== true;

  // Skip item if out of stock
  if (!isVariantAvailable && !isProductAvailable) {
    return; // Don't process this item
  }

  // === 2. Get base price ===
  const basePrice =
    item?.variantDetails?.offerPrice ?  item?.variantDetails?.offerPrice :
    item.product?.offerPrice ||
    item.offerPrice ||
    item.price ||
    item.selectedPrice ||
    0;

  // === 3. Variant additional price ===
 
  // === 4. Final price calculations ===
  const pricePerItem = basePrice ;
  const itemSubtotal = pricePerItem * qty;

  // === 5. Tax ===
  const taxPercent = item.tax || item.product?.tax || 0;
  tax += (itemSubtotal * taxPercent) / 100;

  // === 6. Shipping ===
  const itemShipping = item.shippingRate || item.product?.shippingRate || 0;
  shipping += itemShipping;

  // === 7. Product-specific coupon ===
  const productId = item.product?._id;
  const productCoupon = appliedCoupon?.[productId];

  if (productCoupon) {
    couponDiscount += (itemSubtotal * productCoupon.percentage) / 100;
  }

  // === 8. Subtotal ===
  subtotal += itemSubtotal;
});

// === 9. Cart-wide coupon (if no product-level applied) ===
if (couponDiscount === 0 && appliedCoupon) {
  couponDiscount = appliedCoupon.percentage
    ? (subtotal * appliedCoupon.percentage) / 100
    : appliedCoupon.discountValue || 0;
}

// === 10. Final total ===
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












































































































































































































































































































