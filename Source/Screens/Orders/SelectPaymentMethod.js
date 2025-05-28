import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import CustomCommonHeader from '../../Components/Common/CustomCommonHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, Height, Width } from '../../constants/constants';
import BankOfferView from '../../otherComponents/checkOut/bankOffer';

const PaymentMethodScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showUPIDropdown, setShowUPIDropdown] = useState(false);
  const [selectedUPIApp, setSelectedUPIApp] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);

  const onlineOptions = ['UPI', 'Credit/Debit Card', 'Wallets', 'EMI', 'Net Banking'];
  const deliveryOption = 'Cash on Delivery';
  const upiApps = [
    { name: 'PhonePe', logo: require('../../../assets/Icons/Banks/pp1.png') },
    { name: 'Paytm', logo: require('../../../assets/Icons/Banks/pp2.png') },
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
    navigation.navigate('Cart');
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
      <Image source={upi.logo} style={styles.upiLogo} />
      <Text style={styles.upiText}>{upi.name}</Text>
    </TouchableOpacity>
  );
};

// Reusable Price Details Component
const PriceDetails = ({ totalAmount, priceDetails }) => {
  return (
    <View style={styles.priceDetailsContainer}>
      <View style={styles.priceHeader}>
        <Image 
          source={require('../../../assets/Icons/money_bag.png')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom:Height(30)
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: Height(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
   // marginLeft: 8,
  },
  subSectionTitle: {
    fontSize: 14,
    color: '#006f94',
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewAllText: {
    color: '#2E6074',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  paymentOptionContainer: {
    marginBottom: 8,
  },
  selectedOption: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F6FAFD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D6E7FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E6074',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownContainer: {
    marginVertical: Height(10),
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  upiRadioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upiRadioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E6074',
  },
  upiLogo: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  upiText: {
    fontSize: 14,
    color: '#333',
  },
  agreementContainer: {
    marginVertical: 16,
    marginHorizontal:Width(4),
    marginBottom:Height(15)
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#2E6074',
    borderColor: '#2E6074',
  },
  agreementText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 30,
  },
  priceDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moneyIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
  },
  savingsText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'right',
    marginTop: 4,
    fontStyle: 'italic',
  },
  confirmButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentMethodScreen;