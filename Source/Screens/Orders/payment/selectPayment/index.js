import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Height } from "@constants";
import BankOfferView from '../../../../otherComponents/checkOut/bankOffer';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

const PaymentMethodScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUPIDropdown, setShowUPIDropdown] = useState(false);
  const [selectedUPIApp, setSelectedUPIApp] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);

  const onlineOptions = ['UPI', 'Credit/Debit Card', 'Wallets', 'EMI', 'Net Banking'];
  const deliveryOption = 'Cash on Delivery';
  const upiApps = [
    { name: 'PhonePe', logo: require('../../../../../assets/Icons/Banks/pp1.png') },
    { name: 'Paytm', logo: require('../../../../../assets/Icons/Banks/pp2.png') },
  ];

  const priceDetails = {
    totalMRP: 44000,
    discountMRP: 2000,
    couponDiscount: 2000,
    shippingFee: 0,
  };

  const totalAmount = priceDetails.totalMRP - priceDetails.discountMRP - priceDetails.couponDiscount;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowUPIDropdown(option === 'UPI');
  };

  const handleConfirmOrder = () => {
    if (!agreed) {
      setShowAgreementError(true);
      return;
    }
    if (!selectedOption) {
      Alert.alert('Select Payment Method', 'Please select a payment method to continue');
      return;
    }
    navigation.navigate('OrderConfirm');
  };

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Select Payment Method" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Bank Offers Section */}
     <BankOfferView navigation={navigation} cardStyle={{marginTop:Height(8)}}/>

        {/* Payment Options */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>PAYMENT OPTIONS</Text>
          
          <Text style={styles.subSectionTitle}>Online Payment Options</Text>
          {onlineOptions.map((option) => (
            <PaymentOption 
              key={option}
              option={option}
              isSelected={selectedOption === option}
              onSelect={handleOptionSelect}
            >
              {option === 'UPI' && selectedOption === 'UPI' && showUPIDropdown && (
                <View style={styles.dropdownContainer}>
                  {upiApps.map((upi) => (
                    <UPIOption
                      key={upi.name}
                      upi={upi}
                      isSelected={selectedUPIApp === upi.name}
                      onSelect={setSelectedUPIApp}
                    />
                  ))}
                </View>
              )}
            </PaymentOption>
          ))}

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
              {agreed && (
                <MaterialCommunityIcons name="check" size={14} color="#fff" />
              )}
            </View>
            <Text style={styles.agreementText}>
              I agree to the terms and policy of the company
            </Text>
          </TouchableOpacity>
          {showAgreementError && (
            <Text style={styles.errorText}>Please accept the terms to continue</Text>
          )}
        </View>

        {/* Price Details */}
        <PriceDetails 
          totalAmount={totalAmount} 
          priceDetails={priceDetails} 
        />

        {/* Confirm Button */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !agreed && styles.disabledButton
          ]}
          onPress={handleConfirmOrder}
          disabled={!agreed}
        >
          <Text style={styles.confirmButtonText}>Confirm Your Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Reusable Payment Option Component
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

// Reusable UPI Option Component
const UPIOption = ({ upi, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.upiOption}
      onPress={() => onSelect(upi.name)}
    >
      <View style={styles.upiRadioButton}>
        {isSelected && <View style={styles.upiRadioButtonSelected} />}
      </View>
      <FastImage source={upi.logo} style={styles.upiLogo} />
      <Text style={styles.upiText}>{upi.name}</Text>
    </TouchableOpacity>
  );
};

// Reusable Price Details Component
const PriceDetails = ({ totalAmount, priceDetails }) => {
  return (
    <View style={styles.priceDetailsContainer}>
      <View style={styles.priceHeader}>
        <FastImage 
          source={require('../../../../../assets/Icons/money_bag.png')}
          style={styles.moneyIcon}
        />
        <Text style={styles.priceTitle}>PRICE DETAILS</Text>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Total MRP</Text>
        <Text style={styles.priceValue}>₹{priceDetails.totalMRP.toLocaleString()}</Text>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Discount on MRP</Text>
        <Text style={styles.discountValue}>-₹{priceDetails.discountMRP.toLocaleString()}</Text>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Coupon Discount</Text>
        <Text style={styles.discountValue}>-₹{priceDetails.couponDiscount.toLocaleString()}</Text>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Shipping Fee</Text>
        <Text style={styles.priceValue}>₹{priceDetails.shippingFee.toLocaleString()}</Text>
      </View>
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>₹{totalAmount.toLocaleString()}</Text>
      </View>
      
      <Text style={styles.savingsText}>
        You save ₹{(priceDetails.discountMRP + priceDetails.couponDiscount).toLocaleString()} on this order
      </Text>
    </View>
  );
};



export default PaymentMethodScreen;