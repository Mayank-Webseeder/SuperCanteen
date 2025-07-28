import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  AppState,
  PermissionsAndroid,
  Linking
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomAddressTextInput from '../../../Components/TextInput/customAddressTextInput';
import CustomButton from '../../../Components/CustomBotton';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, updateAddress } from '../../../redux/slices/addressSlice';
import { styles } from './styles';

const CreateAddressScreen = ({ navigation, route }) => {
  const { addressToEdit } = route.params || {};
  const extractedAddress = Array.isArray(addressToEdit) ? addressToEdit[0] : addressToEdit;
  const { user } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.address);
  const dispatch = useDispatch();
  
  // State variables
  const [isManualModalVisible, setIsManualModalVisible] = useState(false);
  const [tempManualAddress, setTempManualAddress] = useState('');
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
  const [isManualAddress, setIsManualAddress] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const scrollViewRef = useRef();
  const appStateRef = useRef(AppState.currentState);

const getCurrentLocation = useCallback(async () => {
  console.log("Starting location fetch...");
  setIsLocating(true);

  try {
    // 1. Verify and request permissions
    const hasPermission = await verifyAndRequestPermissions();
    if (!hasPermission) {
      console.log("User denied location permissions");
      setIsLocating(false);
      showPermissionDeniedAlert();
      return;
    }

    // 2. Get position with ultimate fallback
    const position = await getPositionWithUltimateFallback();
    
    // 3. Process the obtained position
    await processObtainedPosition(position);
    
  } catch (error) {
    console.error("Final error handler:", error);
    handleFinalFallback();
  } finally {
    setIsLocating(false);
  }
}, []);

// 1. Permission Handling
const verifyAndRequestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]);
      
      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    // iOS handles through plist
    return true;
  } catch (err) {
    console.error("Permission error:", err);
    return false;
  }
};

// 2. Position Acquisition with Ultimate Fallback
const getPositionWithUltimateFallback = async () => {
  // Try standard method first
  try {
    return await getStandardPosition();
  } catch (error) {
    console.log("Standard method failed, trying alternative...");
  }

  // Try alternative method (lower accuracy)
  try {
    return await getAlternativePosition();
  } catch (error) {
    console.log("Alternative method failed, trying last resort...");
  }

  // Last resort - cached position
  try {
    return await getLastKnownPosition();
  } catch (error) {
    console.log("All methods failed");
    throw error;
  }
};

const getStandardPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

const getAlternativePosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: false, // Lower accuracy
        timeout: 15000,
        maximumAge: 30000 // Accept slightly older position
      }
    );
  });
};

const getLastKnownPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getLastKnownPosition(
      (position) => {
        if (position) {
          resolve(position);
        } else {
          reject(new Error("No last known position"));
        }
      },
      reject
    );
  });
};

// 3. Position Processing
const processObtainedPosition = async (position) => {
  const { latitude, longitude } = position.coords;
  
  // Try multiple reverse geocoding services
  const address = await tryAllGeocodingServices(latitude, longitude);
  
  setFormData(prev => ({
    ...prev,
    address: address?.display || `${latitude}, ${longitude}`,
    city: address?.city || address?.town || address?.village || "",
    state: address?.state || "",
    pincode: address?.postcode || "",
    country: address?.country || "India",
  }));
  
  setIsManualAddress(true);
  
  if (!address) {
    showMessage({
      message: "Location found but address details incomplete",
      type: "info",
      duration: 3000,
    });
  }
};

const tryAllGeocodingServices = async (lat, lng) => {
  const services = [
    {
      name: "OpenStreetMap",
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`
    },
    {
      name: "Geocode Maps",
      url: `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
    },
    {
      name: "BigDataCloud",
      url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    }
  ];

  for (const service of services) {
    try {
      const response = await fetch(service.url);
      const data = await response.json();
      if (data.address || data.locality) {
        console.log(`Success with ${service.name}`);
        return formatAddressData(data);
      }
    } catch (error) {
      console.error(`Failed with ${service.name}:`, error);
    }
  }
  return null;
};

const formatAddressData = (data) => {
  // Handle different API response formats
  if (data.address) {
    return {
      display: [data.address.road, data.address.city, data.address.country]
        .filter(Boolean).join(", "),
      ...data.address
    };
  }
  if (data.locality) {
    return {
      display: [data.locality, data.principalSubdivision, data.countryName]
        .filter(Boolean).join(", "),
      city: data.locality,
      state: data.principalSubdivision,
      country: data.countryName,
      postcode: data.postcode
    };
  }
  return null;
};


const openLocationSettingsFallback = () => {
  if (Platform.OS === 'android') {
    Linking.openSettings(); // opens App settings, not Location directly
  }
};



const handleFinalFallback = (error) => {
  // Set default form data
  setFormData(prev => ({
    ...prev,
    address: "Please enter address manually",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  }));
  setIsManualAddress(true);

  // Automatically open settings if location is disabled
  if (error?.code === 2) { // POSITION_UNAVAILABLE error code
     openLocationSettingsFallback();
  } else {
   showMessage({
  message: "Please enable your device's location ",
  type: "warning",
  duration: 5000,
});
  }
};

  const toggleAddressMode = () => {
    if (isManualAddress) {
      setIsManualAddress(false);
    } else {
      setTempManualAddress(formData.address);
      setIsManualModalVisible(true);
    }
  };

  const confirmManualEntry = () => {
    setIsManualAddress(true);
    setIsManualModalVisible(false);
    setFormData(prev => ({
      ...prev,
      address: tempManualAddress
    }));
  };

  // Initialize form with address to edit if provided
  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        name: emptyOrValue(addressToEdit.name),
        contact: emptyOrValue(addressToEdit.contactNo),
        address: emptyOrValue(addressToEdit.address),
        city: emptyOrValue(addressToEdit.city),
        state: emptyOrValue(addressToEdit.state),
        pincode: emptyOrValue(addressToEdit.postalCode),
        country: emptyOrValue(addressToEdit.country) || 'India',
        addressType: emptyOrValue(addressToEdit.addressType) || 'Home',
        isDefault: addressToEdit?.isDefault || false,
      });
      setIsManualAddress(true);
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
      newErrors.contact = 'Enter valid 10-digit number';
    }

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter valid 6-digit pincode';
    }

    updateFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const emptyOrValue = (value) => (value === null || value === undefined ? '' : value);

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
      isDefault: formData.isDefault
    };

    try {
      if (addressToEdit) {
        await dispatch(updateAddress({
          userId: user.id,
          addressId: addressToEdit._id,
          updatedAddress: mappedAddress
        })).unwrap();
      } else {
        await dispatch(addAddress({
          userId: user.id,
          address: mappedAddress
        })).unwrap();
      }

      showMessage({
        message: addressToEdit ? 'Address updated!' : 'Address saved!',
        type: 'success',
        duration: 3000,
      });
      
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: error?.message || 'Failed to save address',
        type: 'danger',
        duration: 4000,
      });
    }
  }, [formData, validateForm, dispatch, user.id, addressToEdit, navigation]);

  // Handle app state changes for permission flow
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // App came back to foreground
      }
      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomCommonHeader
            navigation={navigation}
            title={addressToEdit ? 'Edit Address' : 'Add Address'}
            containerStyle={styles.header}
          />

          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
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

              <View style={styles.addressModeToggle}>
                <Text style={styles.sectionLabel}>
                  {isManualAddress ? 'Manual Address Entry' : 'Find Your Address'}
                </Text>
                <TouchableOpacity onPress={toggleAddressMode}>
                  <Text style={styles.toggleLink}>
                    {isManualAddress ? 'Use location' : 'Enter manually'}
                  </Text>
                </TouchableOpacity>
              </View>

              {!isManualAddress ? (
                <TouchableOpacity 
                  onPress={getCurrentLocation}
                  style={styles.locationButton}
                  disabled={isLocating}
                >
                  {isLocating ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Icon name="my-location" size={16} color="#fff" />
                      <Text style={styles.locationButtonText}>
                        Use my current location
                      </Text>
                    </>
                  )}
                </TouchableOpacity>



              ) : null}

              <CustomAddressTextInput
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
                placeholder={isManualAddress ? "Full address*" : "Or enter address manually"}
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
      </TouchableWithoutFeedback>

      {/* Manual Address Entry Modal */}
      {isManualModalVisible && (
        <View style={styles.manualModalOverlay}>
          <View style={styles.manualModalContainer}>
            <View style={styles.manualModalHeader}>
              <Text style={styles.manualModalTitle}>Enter Address Manually</Text>
              <TouchableOpacity onPress={() => setIsManualModalVisible(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <CustomAddressTextInput
              value={tempManualAddress}
              onChangeText={(text) => setTempManualAddress(text)}
              placeholder="Enter full address"
              multiline
              numberOfLines={4}
              style={styles.manualModalInput}
            />
            
            <View style={styles.manualModalButtons}>
              <TouchableOpacity 
                style={styles.manualModalCancel}
                onPress={() => setIsManualModalVisible(false)}
              >
                <Text style={styles.manualModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.manualModalConfirm}
                onPress={confirmManualEntry}
              >
                <Text style={styles.manualModalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CreateAddressScreen;