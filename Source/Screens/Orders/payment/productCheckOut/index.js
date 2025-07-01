import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAuthButton from '../../../../Components/CustomAuthButton';
import { Width } from "@constants";
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import AddressView from '../../../../otherComponents/checkOut/addressView';
import CouponView from '../../../../otherComponents/checkOut/couponView';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { IMGURL } from '../../../../utils/dataFormatters'
import moment from 'moment';

const ConfirmOrderScreen = ({ navigation, route }) => {
  const {product} =  route?.params
  const { selectedAddress } = useSelector(state => state.selectedAddress);
  const { user } = useSelector(state => state.auth);


  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    navigation.navigate('PaymentMethodScreen',{product:product});
  };

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Confirm Order'} />
      <View style={styles.borderStyle}/>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AddressView navigation={navigation} address={selectedAddress} userId={user._id} />

        <View style={[styles.deliveryCard,{marginBottom:product?.coupons.length > 0 ? 20 : 7}]}>
          <FastImage
            source={{uri:`${IMGURL}${product?.images[0]}`}}
            style={styles.deliveryImage}
          />
          <View>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
          <Text style={styles.deliveryDate}>
   {moment().add(product.deliveryDays, 'days').format('dddd, Do MMMM')}
</Text>
          </View>
        </View>

       {product?.coupons.length > 0 && <CouponView navigation={navigation} />} 

        <PriceSummaryCard product={product}/>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.paymentButton}>
          <Text style={styles.paymentText}>SELECT PAYMENT METHOD</Text>
        </View>
        <CustomAuthButton 
          onPress={handleProceedToPayment} 
          width={Width(320)} 
          title={'Confirm Your Order'}
          buttonStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
        />
      </View>
    </View>
  );
};

export default ConfirmOrderScreen;