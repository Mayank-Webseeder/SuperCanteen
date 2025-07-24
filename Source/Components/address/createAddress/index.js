import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView,  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAddressTextInput from '../../../Components/TextInput/customAddressTextInput';
import CustomButton from '../../../Components/CustomBotton';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress,  updateAddress } from '../../../redux/slices/addressSlice';

const CreateAddressScreen = ({ navigation, route }) => {
  const { addressToEdit } = route.params || {};
  const extractedAddress = Array.isArray(addressToEdit) ? addressToEdit[0] : addressToEdit;
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.address);
  const dispatch = useDispatch();

  const [errors, updateFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    addressType: 'Home',
    isDefault: false,
  });

 useEffect(() => {
  if (addressToEdit) {
    setFormData({
      name: emptyOrValue(addressToEdit.name),
      contact: emptyOrValue(addressToEdit.contactNo),
      address: emptyOrValue(addressToEdit.address),
      city: emptyOrValue(addressToEdit.city),
      state: emptyOrValue(addressToEdit.state),
      pincode: emptyOrValue(addressToEdit.postalCode),
      country: emptyOrValue(addressToEdit.country),
      addressType: emptyOrValue(addressToEdit.addressType) || 'Home',
      isDefault: addressToEdit?.isDefault || false,
    });
  }
}, [addressToEdit]);

useEffect(() => {
  if (extractedAddress) {
    setFormData({
      name: emptyOrValue(extractedAddress.name),
      contact: emptyOrValue(extractedAddress.contactNo),
      address: emptyOrValue(extractedAddress.address),
      city: emptyOrValue(extractedAddress.city),
      state: emptyOrValue(extractedAddress.state),
      pincode: emptyOrValue(extractedAddress.postalCode),
      country: emptyOrValue(extractedAddress.country),
      addressType: emptyOrValue(extractedAddress.addressType) || 'Home',
      isDefault: extractedAddress?.isDefault || false,
    });
  }
}, [extractedAddress]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    updateFormErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contact) {
      newErrors.contact = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Enter a valid 10-digit phone number';
    }

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    if (!formData.country) newErrors.country = 'Country is required';

    updateFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const emptyOrValue = (value) => (value === null || value === undefined ? '' : value);


// Modify the saveAddressData function
const saveAddressData = useCallback(async () => {
  if (!validateForm()) return;

  const mappedAddress = {
    name: formData.name,
    contactNo: formData.contact,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    postalCode: formData.pincode,
    country: formData.country,
    addressType: formData.addressType,
    isDefault: formData.isDefault // Include this in the payload
  };

  try {
    let savedAddress = null;

    if (addressToEdit) {
      console.log("ADDRESS TO EDIT")
      const result = await dispatch(updateAddress({
        userId: user.id,
        addressId: addressToEdit._id,
        updatedAddress: mappedAddress
      })).unwrap();
      savedAddress = result.updatedAddress;
    } else {
      const result = await dispatch(addAddress({
        userId: user.id,
        address: mappedAddress
      })).unwrap();
      savedAddress = result;
    }

    showMessage({
      message: addressToEdit ? 'Address updated successfully!' : 'Address saved successfully!',
      type: 'success',
      duration: 3000,
    });
    
    navigation.goBack();
  } catch (error) {
    showMessage({
      message: error?.message || 'Failed to save the address.',
      type: 'danger',
      duration: 4000,
    });
  }
}, [formData, validateForm, dispatch, user.id, addressToEdit, navigation]);

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
  >
     {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
 <View style={styles.container}>
      <CustomCommonHeader
        navigation={navigation}
        title={addressToEdit ? 'Edit Address' : 'Add Address'}
        containerStyle={styles.header}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Contact Info */}
        <View style={[styles.card, { marginTop: 6 }]}>
          <View style={styles.cardHeader}>
            <Icon name="contact-phone" size={20} color="#2E6074" />
            <Text style={styles.cardTitle}>Contact Information</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                placeholder="Name*"
                error={errors.name}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.contact}
                onChangeText={(text) => handleInputChange('contact', text)}
                placeholder="Mobile No*"
                keyboardType="numeric"
                maxLength={10}
                error={errors.contact}
              />
            </View>
          </View>
        </View>

        {/* Address Info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="home" size={20} color="#2E6074" />
            <Text style={styles.cardTitle}>Address Information</Text>
          </View>

          <CustomAddressTextInput
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="House No, Building, Street, Area*"
            error={errors.address}
            inputStyle={styles.textArea}
            multiline
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.city}
                onChangeText={(text) => handleInputChange('city', text)}
                placeholder="City*"
                error={errors.city}
                 inputStyle={styles.textArea}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.state}
                onChangeText={(text) => handleInputChange('state', text)}
                placeholder="State*"
                error={errors.state}
                  inputStyle={styles.textArea}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.pincode}
                onChangeText={(text) => handleInputChange('pincode', text)}
                placeholder="Pincode*"
                keyboardType="numeric"
                error={errors.pincode}
                  inputStyle={styles.textArea}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomAddressTextInput
                value={formData.country}
                onChangeText={(text) => handleInputChange('country', text)}
                placeholder="Country*"
                error={errors.country}
                  inputStyle={styles.textArea}
              />
            </View>
          </View>
        </View>

        {/* Address Type */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="category" size={20} color="#2E6074" />
            <Text style={styles.cardTitle}>Address Type</Text>
          </View>

          <View style={styles.typeBtnContainer}>
            {['Home', 'Office', 'Other'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  formData.addressType === type && styles.selectedTypeButton
                ]}
                onPress={() => handleInputChange('addressType', type)}
              >
                <Icon
                  name={
                    type === 'Home' ? 'home' : 
                    type === 'Office' ? 'business' : 'location-on'
                  }
                  size={18}
                  color={formData.addressType === type ? '#2E6074' : '#95a5a6'}
                />
                <Text style={[
                  styles.typeButtonText,
                  formData.addressType === type && styles.selectedTypeButtonText
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      
      </ScrollView>
      <View style={styles.buttonView}>
   <CustomButton
          label={addressToEdit ? 'Update Address' : 'Save Address'}
          onPress={saveAddressData}
          style={styles.saveButton}
          loading={loading}
        />
      </View>
   
    </View>

     {/* </TouchableWithoutFeedback> */}

   
    </KeyboardAvoidingView>
  );
};

export default CreateAddressScreen;