import React from 'react';
import { View, Text, ScrollView } from 'react-native';
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

const ProductItemCard = ({ item }) => {
  const productData = item.product || item;
  const variantDetails = item.variantDetails || productData.selectedVariant;

  const mrp = variantDetails?.additionalPrice
    ? (productData?.mrp || 0) + variantDetails?.additionalPrice
    : productData?.mrp;

  const toShowImage = variantDetails?.images?.[0] || productData?.images?.[0];
  const displayPrice = item.selectedPrice || productData?.finalPrice || productData?.offerPrice || productData?.price;

  return (
    <View style={[productStyles.container, { marginBottom: item.product ? 13 : 8 }]}>
      <FastImage
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
        <View style={productStyles.deliveryEstimate}>
          <Icon
            name="truck-delivery-outline"
            size={16}
            color={COLORS.green}
            style={productStyles.deliveryIcon}
          />
          <Text style={productStyles.deliveryText}>
            Est. delivery: {moment().add(productData?.deliveryDays || 3, 'days').format('Do MMM')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ConfirmOrderScreen = ({ navigation, route }) => {
  const { product, fromCart } = route?.params || {};
  const { selectedAddress } = useSelector(state => state.selectedAddress);
  const { user } = useSelector(state => state.auth);
  const { appliedCoupons } = useSelector(state => state.coupon);
  const { items: cartItems } = useSelector(state => state.cart);

  const appliedCoupon = product?.isSingleProductCheckout
    ? product?.appliedCoupon || appliedCoupons[product?._id]
    : appliedCoupons;

  const finalAmount = calculateFinalAmount({
    product: product?.isSingleProductCheckout ? product : null,
    cartItems,
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
    navigation.navigate('PaymentMethodScreen', {
      product: {
        ...product,
        selectedAddress,
      },
      fromCart
    });
  };

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Confirm Order'} />
      <View style={styles.borderStyle} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AddressView navigation={navigation} address={selectedAddress} userId={user?._id} />

        <Text style={productStyles.sectionTitle}>
          {fromCart ? `Your Items (${cartItems.length})` : 'Your Item'}
        </Text>
        <View>
          {fromCart ? (
            cartItems.map((item, index) => (
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
          cartItems={fromCart ? cartItems : null}
          priceDetails={{
            subtotal: product?.offerPrice || product?.price || 0,
            deliveryCharge: product?.deliveryCharge || 0,
            couponDiscount: appliedCoupon?.discountAmount || 0,
            total: finalAmount
          }}
        />
      </ScrollView>

      <View style={styles.footer}>
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
