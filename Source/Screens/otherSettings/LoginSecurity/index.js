import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../../../redux/slices/userSlice';
import CustomHeader from '../../../Components/CustomHeader';
import { styles } from './styles';

const LoginSecurityScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, loading, error  } = useSelector(state => state.user);

  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNo: '',
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null); // NEW

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        contactNo: profile.contactNo || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.contactNo && !/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = () => {
    if (!validateForm()) return;

    const updatedData = {};
    if (editMode === 'username') updatedData.username = formData.username;
    if (editMode === 'email') updatedData.email = formData.email;
    if (editMode === 'contactNo') updatedData.contactNo = formData.contactNo;

    dispatch(updateProfile(updatedData));
    setEditMode(null);
  };

  const fields = [
    { label: 'Name', value: profile?.username, key: 'username' },
    { label: 'Email', value: profile?.email, key: 'email' },
    { label: 'Contact', value: profile?.contactNo || 'Not set', key: 'contactNo' },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} label={'Login & Security'} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.sectionCard}>
            {fields.map((item, idx) => (
              <View key={idx} style={styles.fieldContainer}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>{item.label}</Text>
                  {editMode === item.key ? (
                    <>
                      <TextInput
                        style={[
                          styles.input,
                          focusedField === item.key && styles.inputFocused
                        ]}
                        onFocus={() => setFocusedField(item.key)}
                        onBlur={() => setFocusedField(null)}
                        onChangeText={(text) =>
                          setFormData({ ...formData, [item.key]: text })
                        }
                        value={formData[item.key]}
                        autoCapitalize={item.key === 'email' ? 'none' : 'words'}
                        underlineColorAndroid="transparent"
                        keyboardType={item.key === "contactNo" ? "numeric" : "default"}
                      />
                      {errors[item.key] && (
                        <Text style={styles.errorText}>{errors[item.key]}</Text>
                      )}
                    </>
                  ) : (
                    <Text style={styles.fieldValue}>{item.value}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    if (editMode === item.key) {
                      setEditMode(null);
                      setErrors({});
                    } else {
                      setEditMode(item.key);
                    }
                  }}
                >
                  <Text style={styles.editText}>
                    {editMode === item.key ? 'Cancel' : 'Edit'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

           
              {editMode && <TouchableOpacity
                style={styles.saveButton}
                onPress={handleProfileUpdate}
               
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                )}
              </TouchableOpacity>}
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginSecurityScreen;
