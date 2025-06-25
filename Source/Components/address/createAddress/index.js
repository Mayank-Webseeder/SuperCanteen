import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAddressTextInput from '../../../Components/TextInput/customAddressTextInput';
import CustomBottomDrop from '../../../Components/TextInput/customBottomDrop';
import CustomButton from '../../../Components/CustomBotton';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../../../redux/slices/addressSlice';

const CreateAddressScreen = ({ navigation, route }) => {
  const { addressToEdit } = route.params || {};
  const { user } = useSelector(state => state.auth);
  const {loading} = useSelector(state => state.address)
  const dispatch = useDispatch();
  console.log("ADDRESS TO EDIT IS",addressToEdit)

  const [errors, updateFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'Home',
    isDefault: false,
  });

  const countries = ['India', 'USA', 'UK'];
  const cities = ['Mumbai', 'Delhi', 'New York', 'London'];
  const states = ['Maharashtra', 'New York', 'California'];
  const pincodes = ['400001', '110001', '10001'];

  const addressTypes = [
    { id: 'Home', icon: 'home' },
    { id: 'Office', icon: 'business' },
    { id: 'Other', icon: 'location-on' },
  ];

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        ...addressToEdit,
        contact: addressToEdit.contactNo , 
        pincode: addressToEdit.postalCode
      });
    }
  }, [addressToEdit]);

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
};

    try {
      if (addressToEdit) {
        // 🔄 Update
        await dispatch(updateAddress({
          userId: user.id,
          addressId: addressToEdit._id,
          updatedAddress: mappedAddress
        })).unwrap();

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Address updated successfully!',
        });
      } else {
        // ➕ Add
        await dispatch(addAddress({
          userId: user.id,
          address: mappedAddress
        })).unwrap();

        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Address saved successfully!',
        });
      }

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message || 'Failed to save the address.',
      });
      console.error('Address save error:', error);
    }
  }, [formData, validateForm, dispatch, user.id, addressToEdit, navigation]);

  return (
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
            inputStyle={styles.inputStyle}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomBottomDrop
                value={formData.city}
                onChangeText={(text) => handleInputChange('city', text)}
                placeholder="City*"
                dropdownData={cities}
                error={errors.city}
              />
            </View>
            <View style={styles.halfInput}>
              <CustomBottomDrop
                value={formData.state}
                onChangeText={(text) => handleInputChange('state', text)}
                placeholder="State*"
                dropdownData={states}
                error={errors.state}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomBottomDrop
                value={formData.pincode}
                onChangeText={(text) => handleInputChange('pincode', text)}
                placeholder="Pincode*"
                dropdownData={pincodes}
                error={errors.pincode}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <CustomBottomDrop
                value={formData.country}
                onChangeText={(text) => handleInputChange('country', text)}
                placeholder="Country*"
                dropdownData={countries}
                error={errors.country}
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
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  formData.addressType === type.id && styles.selectedTypeButton
                ]}
                onPress={() => handleInputChange('addressType', type.id)}
              >
                <Icon
                  name={type.icon}
                  size={18}
                  color={formData.addressType === type.id ? '#2E6074' : '#95a5a6'}
                />
                <Text style={[
                  styles.typeButtonText,
                  formData.addressType === type.id && styles.selectedTypeButtonText
                ]}>
                  {type.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.defaultContainer}
            onPress={() => handleInputChange('isDefault', !formData.isDefault)}
          >
            <Icon
              name={formData.isDefault ? 'check-box' : 'check-box-outline-blank'}
              size={20}
              color={formData.isDefault ? '#2E6074' : '#95a5a6'}
            />
            <Text style={styles.defaultText}>Set as default address</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          label={addressToEdit ? 'Update Address' : 'Save Address'}
          onPress={saveAddressData}
          style={styles.saveButton}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

export default CreateAddressScreen;
