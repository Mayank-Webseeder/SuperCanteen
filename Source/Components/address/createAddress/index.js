import React, { useState, useEffect } from 'react';
import {  Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAddressTextInput from '../../../Components/TextInput/customAddressTextInput';
import CustomBottomDrop from '../../../Components/TextInput/customBottomDrop';
import CustomButton from '../../../Components/CustomBotton';
import Toast from 'react-native-toast-message';
import { styles } from './styles';

const STORAGE_KEY = '@address_data';

const CreateAddressScreen = ({ navigation, route }) => {
  const { addressToEdit } = route.params || {};
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    flatDetails: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'Home',
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const addressTypes = ['Home', 'Office', 'Other'];
  const countries = ['India', 'USA', 'UK'];
  const cities = ['Mumbai', 'Delhi', 'New York', 'London'];
  const states = ['Maharashtra', 'New York', 'California'];
  const pincodes = ['400001', '110001', '10001'];

  useEffect(() => {
    if (addressToEdit) {
      setFormData(addressToEdit);
    }
  }, [addressToEdit]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'contact', 'flatDetails', 'landmark', 'city', 'state', 'pincode', 'country'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Enter a valid 10-digit phone number';
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddressData = async () => {
    // if (!validateForm()) return;

    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      const addresses = savedData ? JSON.parse(savedData) : [];
      let updatedAddresses;

      if (addressToEdit) {
        // Update existing address
        updatedAddresses = addresses.map(addr => 
          addr.id === addressToEdit.id ? formData : addr
        );
      } else {
        // Add new address
        const newAddress = {
          ...formData,
          id: Date.now().toString(),
        };
        updatedAddresses = [...addresses, newAddress];
      }

      // If this is set as default, unset others
      if (formData.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === formData.id ? true : false
        }));
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAddresses));
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: addressToEdit ? 'Address updated successfully!' : 'Address saved successfully!',
      });
      
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save the address.',
      });
      console.error('Save error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} 
        title={addressToEdit ? "Edit Address" : "Add Address"} 
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <Text style={styles.label}>Full Name*</Text>
        <CustomAddressTextInput
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Enter your full name"
          error={errors.name}
        />

        <Text style={styles.label}>Mobile Number*</Text>
        <CustomAddressTextInput
          value={formData.contact}
          onChangeText={(text) => handleChange('contact', text)}
          placeholder="Enter 10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          error={errors.contact}
        />

        <Text style={styles.sectionTitle}>Address Information</Text>

        <Text style={styles.label}>Country*</Text>
        <CustomBottomDrop
          value={formData.country}
          onChangeText={(text) => handleChange('country', text)}
          placeholder="Select country"
          dropdownData={countries}
          error={errors.country}
        />

        <Text style={styles.label}>Flat, House No., Building*</Text>
        <CustomAddressTextInput
          value={formData.flatDetails}
          onChangeText={(text) => handleChange('flatDetails', text)}
          placeholder="Enter address details"
          error={errors.flatDetails}
        />

        <Text style={styles.label}>Street, Locality, Landmark*</Text>
        <CustomAddressTextInput
          value={formData.landmark}
          onChangeText={(text) => handleChange('landmark', text)}
          placeholder="Enter nearby landmarks"
          error={errors.landmark}
        />

        <Text style={styles.label}>City / District*</Text>
        <CustomBottomDrop
          value={formData.city}
          onChangeText={(text) => handleChange('city', text)}
          placeholder="Select city"
          dropdownData={cities}
          error={errors.city}
        />

        <Text style={styles.label}>State*</Text>
        <CustomBottomDrop
          value={formData.state}
          onChangeText={(text) => handleChange('state', text)}
          placeholder="Select state"
          dropdownData={states}
          error={errors.state}
        />

        <Text style={styles.label}>Pin code*</Text>
        <CustomBottomDrop
          value={formData.pincode}
          onChangeText={(text) => handleChange('pincode', text)}
          placeholder="Select pin code"
          dropdownData={pincodes}
          error={errors.pincode}
        />

        <Text style={styles.label}>Address Type</Text>
        <View style={styles.typeBtnContainer}>
          {addressTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                formData.addressType === type && styles.selectedTypeButton
              ]}
              onPress={() => handleChange('addressType', type)}>
              <Icon
                name={type === 'Office' ? 'business' : 'home'}
                size={20}
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

        <TouchableOpacity
          style={styles.defaultContainer}
          onPress={() => handleChange('isDefault', !formData.isDefault)}>
          <Icon
            name={formData.isDefault ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={formData.isDefault ? '#2E6074' : '#95a5a6'}
          />
          <Text style={styles.defaultText}>Use as default address</Text>
        </TouchableOpacity>

        <CustomButton 
          label={addressToEdit ? "Update Address" : "Save Address"} 
          onPress={saveAddressData} 
          style={styles.saveButton}
        />
      </ScrollView>
    </View>
  );
};

export default CreateAddressScreen;