import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAuthButton from '../../../../Components/CustomAuthButton';
import {  Width } from "@constants";
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import BankOfferView from '../../../../otherComponents/checkOut/bankOffer';
import AddressView from '../../../../otherComponents/checkOut/addressView';
import CouponView from '../../../../otherComponents/checkOut/couponView';
import { styles } from './styles';

const ConfirmOrderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Confirm Order'} />
       <View style={styles.borderStyle}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Address Section */}
        <AddressView navigation={navigation}/>

        {/* Delivery Date */}
        <View style={styles.deliveryCard}>
          <Image
            source={require('../../../../../assets/MensWatch/item1.png')}
            style={styles.deliveryImage}
          />
          <View>
            <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
            <Text style={styles.deliveryDate}>Tuesday, 24th May</Text>
          </View>
        </View>

        {/* Coupons Section */}
        <CouponView navigation={navigation}/>

        {/* Price Summary */}
          <PriceSummaryCard />

        {/* Bank Offers */}
      <BankOfferView  navigation={navigation} />
      
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.paymentButton}>
          <Text style={styles.paymentText}>SELECT PAYMENT METHOD</Text>
        </View>
        <CustomAuthButton 
          onPress={() => navigation.navigate('PaymentMethodScreen')} 
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