import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAddressTextInput from '../../../Components/TextInput/customAddressTextInput';
import CustomButton from '../../../Components/CustomBotton';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../../../redux/slices/addressSlice';

const CreateAddressScreen = ({ navigation, route }) => {
  const { addressToEdit } = route.params || {};
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
        ...addressToEdit,
        contact: addressToEdit.contactNo, 
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
        await dispatch(updateAddress({
          userId: user.id,
          addressId: addressToEdit._id,
          updatedAddress: mappedAddress
        })).unwrap();
         showMessage({
              message: 'Address updated successfully!',
              type: 'success',
              icon: 'success',
              duration: 3000,
            });
      } else {
        await dispatch(addAddress({
          userId: user.id,
          address: mappedAddress
        })).unwrap();
         showMessage({
              message: 'Address saved successfully!',
              type: 'success',
              icon: 'success',
              duration: 3000,
            });
      }

      navigation.goBack();
    } catch (error) {
        showMessage({
            message: error?.message || 'Failed to save the address.',
            type: 'danger',
            icon: 'danger',
            duration: 4000,
          });
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