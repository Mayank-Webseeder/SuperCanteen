import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAuthButton from '../../../../Components/CustomAuthButton';
import { Width } from "@constants";
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import AddressView from '../../../../otherComponents/checkOut/addressView';
import { styles , productStyles } from './styles';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { IMGURL } from '../../../../utils/dataFormatters';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { calculateFinalAmount } from '../../../../utils/helper';
import { COLORS } from '@constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductItemCard = ({ item }) => {
  const productData = item.product || item;
  const variantDetails = item.variantDetails || productData.selectedVariant;
  const mrp = variantDetails?.mrp
    ?  variantDetails?.mrp
    : productData?.mrp;

  const toShowImage = variantDetails?.images?.[0] || productData?.images?.[0];
  const displayPrice = variantDetails?.offerPrice || productData?.finalPrice || productData?.offerPrice || productData?.price;
  const variantColor = variantDetails?.color
  const variantSize = variantDetails?.size
  return (
    <View style={[productStyles.container, { marginBottom: item.product ? 13 : 8 }]}>
      <FastImage
        resizeMode={'contain'}
        source={{ uri: `${IMGURL}${toShowImage}` }}
        style={productStyles.image}
      />
      <View style={productStyles.details}>
        <Text style={productStyles.name} numberOfLines={2}>{productData?.name}</Text>
        <View style={productStyles.priceRow}>
          <Text style={productStyles.price}>₹{displayPrice}</Text>
          {productData?.mrp > displayPrice && (
            <Text style={productStyles.originalPrice}>₹{mrp}</Text>
          )}
        </View>
        <Text style={productStyles.qty}>Qty: {item.qty || 1}</Text>
          <View style={productStyles.variantContainer}>
                    {variantSize && (
                      <View style={productStyles.variantPill}>
                        <Text style={productStyles.variantPillText}>Size: {variantSize}</Text>
                      </View>
                    )}
                    {variantColor?.code && (
                      <View style={productStyles.variantPill}>
                        <Text style={productStyles.variantPillText}>Color : </Text>
                        <View style={[productStyles.colorStyle,{backgroundColor:variantColor?.code}]}/>
                      </View>
                    )}
                  </View>
        {productData?.deliveryDays && (
           <View style={productStyles.deliveryEstimate}>
          <Icon
            name="truck-delivery-outline"
            size={16}
            color={COLORS.green}
            style={productStyles.deliveryIcon}
          />

          <Text style={productStyles.deliveryText}>
            Est. delivery: {moment().add(productData?.deliveryDays, 'days').format('Do MMM')}
          </Text>
        </View>
        )}
       
      </View>
    </View>
  );
};

const ConfirmOrderScreen = ({ navigation, route }) => {
  const { product, fromCart, cartItems: passedCartItems = [] } = route?.params || {};
  const { selectedAddress } = useSelector(state => state.selectedAddress);
  const { user } = useSelector(state => state.auth);
  const { appliedCoupons } = useSelector(state => state.coupon);
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  // ✅ Use passed cartItems if from cart; otherwise fallback to Redux with filter
  const reduxCartItems = useSelector(state => state.cart?.items || []);
  const fallbackCartItems = reduxCartItems.filter(item => {
    const availableStock = item?.product?.outOfStock 
      ? 0 
      : (item?.variantDetails?.countInStock || item?.product?.countInStock || 0);
    return availableStock > 0;
  });

  const cartItemsToUse = fromCart ? (passedCartItems.length > 0 ? passedCartItems : fallbackCartItems) : [];
  const appliedCoupon = product?.isSingleProductCheckout
    ? product?.appliedCoupon || appliedCoupons[product?._id]
    : appliedCoupons;

  const finalAmount = calculateFinalAmount({
    product: product?.isSingleProductCheckout ? product : null,
    cartItems: cartItemsToUse,
    appliedCoupon,
  });

 const handleProceedToPayment = () => {
  if (!selectedAddress) {
    showMessage({
      message: 'Please select a delivery address',
      type: 'danger',
      icon: 'danger',
      duration: 4000,
    });
    return;
  }

  if (fromCart) {
    navigation.navigate('PaymentMethodScreen', {
      cartItems: cartItemsToUse,
      selectedAddress,
      fromCart: true,
    });
  } else {
    navigation.navigate('PaymentMethodScreen', {
      product: {
        ...product,
        selectedAddress,
      },
      fromCart: false,
    });
  }
};

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Confirm Order'} />
      <View style={styles.borderStyle} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AddressView navigation={navigation} address={selectedAddress} userId={user?._id} />

        <Text style={productStyles.sectionTitle}>
          {fromCart ? `Your Items (${cartItemsToUse.length})` : 'Your Item'}
        </Text>

        <View>
          {fromCart ? (
            cartItemsToUse.map((item, index) => (
              <ProductItemCard
                key={item._id || index}
                item={item}
                couponDiscount={appliedCoupon?.discountAmount || 0}
              />
            ))
          ) : (
            <ProductItemCard item={product} />
          )}
        </View>

        <PriceSummaryCard
          product={product?.isSingleProductCheckout ? product : null}
          cartItems={fromCart ? cartItemsToUse : null}
          priceDetails={{
            subtotal: product?.offerPrice || product?.price || 0,
            deliveryCharge: product?.deliveryCharge || 0,
            couponDiscount: appliedCoupon?.discountAmount || 0,
            total: finalAmount
          }}
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : height * 0.03 }]}>
        <View style={styles.paymentButton}>
          <Text style={styles.paymentText}>SELECT PAYMENT METHOD</Text>
        </View>
        <CustomAuthButton
          onPress={handleProceedToPayment}
          width={Width(320)}
          title={`Confirm Order  ₹${Math.round(finalAmount)}`}
          buttonStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
        />
      </View>
    </View>
  );
};


export default ConfirmOrderScreen;
