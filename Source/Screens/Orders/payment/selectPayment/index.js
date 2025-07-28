import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedAddress } from '../../../../redux/slices/selectedAddressSlice';
import { createOrder } from '../../../../redux/slices/paymentSlice';
import { calculateFinalAmount } from '../../../../utils/helper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PaymentMethodScreen = ({ navigation, route }) => {
  // State management
  const [selectedOption, setSelectedOption] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { appliedCoupons } = useSelector(state => state.coupon);
  const {  user } = useSelector(state => state.auth);
  const insets = useSafeAreaInsets();
  
  // Redux and route data
  const dispatch = useDispatch();
  const { product = {}, fromCart ,cartItems} = route?.params || {};
  const selectedAddress = useSelector(selectSelectedAddress);
  // const cartItems = useSelector(state => state.cart?.items || []); // Get cart items from Redux
  // Payment options

  const deliveryOption = 'Cash on Delivery';

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
    // Get applied coupon for this product (if any)
    const appliedCoupon = product?.isSingleProductCheckout 
      ? appliedCoupons[product?._id]
      : appliedCoupons;
      
      const finalAmount = calculateFinalAmount({
      product: product?.isSingleProductCheckout ? product : null,
      cartItems,
      appliedCoupon,
    });

  // Prepare order payload dynamically
const prepareOrderPayload = (paymentMethod) => {
  const orderItems = fromCart ? cartItems : [product];
  if (orderItems.length === 0 || orderItems.some(item => !item?._id && !item?.product?._id)) {
    showMessage({
      message: 'Product information is incomplete',
      type: 'danger',
      duration: 4000,
    });
    return null;
  }
return {
  paymentMethod: paymentMethod,
  shippingAddress: {
    name: String(selectedAddress.name),
    contactNo: String(selectedAddress.contactNo),
    address: String(selectedAddress.address),
    city: String(selectedAddress.city),
    state: String(selectedAddress.state),
    postalCode: String(selectedAddress.postalCode),
    country: String(selectedAddress.country || 'India'),
    addressType: String(selectedAddress.addressType || 'Home')
  },
  orderItems: orderItems.map(item => {
    const productData = fromCart ? item.product || {} : item;
    const base = fromCart ? item : item;

    const variantDetails = base.variantDetails || base.selectedVariant || null;
    const variantId = base.variantId || variantDetails?._id;

    const productId = productData._id;
    const productCoupon = fromCart ? appliedCoupons?.[productId]?._id :appliedCoupon?._id ;

    const { color, size, additionalPrice } = variantDetails || {};

    return {
      name: String(productData.name || base.name || 'Product'),
      qty: Number(base.qty || base.quantity || 1),
      image: `${productData.images?.[0] || ''}`,
      productData: { _id: productId },
      ...(variantId && { variantId: String(variantId) }),
      ...(base.sku && { sku: base.sku }),
      unit: base.unit || 'piece',
      ...(variantDetails && { variantDetails: { color, size, additionalPrice } }),
       ...(productCoupon && { couponCode: productCoupon }) // per-product coupon
    };
  })
};
};

  // Handle Razorpay payment initiation
  const initiateRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      const payload = prepareOrderPayload("RazorPay");
      if (!payload) return;
      const resultAction = await dispatch(createOrder(payload)); 
      if (resultAction.meta.requestStatus === 'fulfilled') {
        const data = resultAction.payload;
        navigation.navigate('RazorpayWebView', {
          orderId: data?.order?._id,
          RazorpayOrderId: data?.RazorpayOrderId,
          amount: data?.amount,
          userDetails: {
            name: data?.order?.shippingAddress?.name,
            email: user?.email,
            phone: data?.order?.shippingAddress?.contactNo
          }
        });
      } else {
        throw new Error(resultAction.payload?.message || 'Order creation failed');
      }
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Cash on Delivery
  const handleCashOnDelivery = async () => {
    try {
      setIsProcessing(true);
      const payload = prepareOrderPayload("Cash on Delivery");
      if (!payload) return;
      const resultAction = await dispatch(createOrder(payload));
      if (resultAction.meta.requestStatus === 'fulfilled') {
        const orderData = resultAction.payload;
        navigation.replace('OrderConfirm', {
          paymentSuccess: true,
          paymentMethod: 'Cash on Delivery',
          orderId: orderData.order?._id,
          orderDetails: orderData
        });
      } else {
        throw new Error(resultAction.payload?.message || 'COD order creation failed');
      }
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Main order confirmation handler
  const handleConfirmOrder = () => {
    if (!agreed) {
      setShowAgreementError(true);
      return;
    }
    
    if (!selectedOption) {
      showMessage({
        message: 'Please select a payment method to continue',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    if (selectedOption === 'Pay with Razorpay') {
      initiateRazorpayPayment();
    } else {
      handleCashOnDelivery();
    }
  };


  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Select Payment Method" />
      <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 80 } // Extra space for button
        ]}
      >
        {/* Payment Options Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>PAYMENT OPTIONS</Text>
          
          {/* <Text style={styles.subSectionTitle}>Online Payment Options</Text> */}
          {/* {onlineOptions.map((option) => (
            <PaymentOption 
              key={option}
              option={option}
              isSelected={selectedOption === option}
              onSelect={handleOptionSelect}
            />
          ))} */}

          <Text style={styles.subSectionTitle}>Pay on Delivery Options</Text>
          <PaymentOption 
            option={deliveryOption}
            isSelected={selectedOption === deliveryOption}
            onSelect={handleOptionSelect}
          />
        </View>

        {/* Agreement Checkbox */}
        <View style={styles.agreementContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => {
              setAgreed(!agreed);
              setShowAgreementError(false);
            }}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxSelected]}>
              {agreed && <MaterialCommunityIcons name="check" size={14} color="#fff" />}
            </View>
            <Text style={styles.agreementText}>
              I agree to the terms and policy of the company
            </Text>
          </TouchableOpacity>
          {showAgreementError && (
            <Text style={styles.errorText}>Please accept the terms to continue</Text>
          )}
        </View>

        {/* Price Summary - Dynamic based on product */}
       <PriceSummaryCard 
  product={product?.isSingleProductCheckout ? product : null}
  priceDetails={{
    subtotal: product?.offerPrice || product?.price || 0,
    deliveryCharge: product?.deliveryCharge || 0,
    couponDiscount: 0,
    total: (product?.offerPrice || product?.price || 0) + (product?.deliveryCharge || 0)
  }}
/> 
      </ScrollView>
      
      {/* Confirm Order Button */}
        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 10 }]}>

  <TouchableOpacity
  style={[
    styles.confirmButton,
    (!agreed || isProcessing) && styles.disabledButton
  ]}
  onPress={handleConfirmOrder}
  disabled={!agreed || isProcessing}
>
  {isProcessing ? (
    <ActivityIndicator color="#fff" />
  ) : (
    
    <Text style={styles.confirmButtonText}>
    Confirm Order  ₹{Math.round(finalAmount)}
    </Text>
  )}
</TouchableOpacity>
        </View>
 
    </View>
  );
};

// Reusable Payment Option Component (unchanged)
const PaymentOption = ({ option, isSelected, onSelect, children }) => {
  return (
    <View style={styles.paymentOptionContainer}>
      {isSelected ? (
        <LinearGradient
          colors={['rgba(46, 96, 116, 0.1)', 'rgba(46, 96, 116, 0.05)', 'rgba(46, 96, 116, 0.02)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.selectedOption}
        >
          <TouchableOpacity 
            style={styles.optionContent}
            onPress={() => onSelect(option)}
          >
            <View style={styles.radioButton}>
              {isSelected && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity 
          style={styles.optionContent}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioButton}>
            {isSelected && <View style={styles.radioButtonSelected} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default PaymentMethodScreen;