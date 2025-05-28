import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomAuthHeader from '../Components/customAuthHeader';
import CustomTextInput from '../Components/customTextInput';
import CustomAuthButton from '../Components/customAuthButton';
import { Height, Width } from '../constants/constants';
import { validateEmail, validatePassword } from '../utils/validation';

const ResetPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
  const [errors, setErrors] = useState({});
   const validateForm = () => {
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  const newErrors = {
    email: emailError,
    password: passwordError,
  };

  setErrors(newErrors);
  return !emailError && !passwordError; // returns true if both are valid
};

const onSignInPress = () => {
  if (validateForm()) {
    navigation.navigate('Signin');
  }
};


  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null }); // clear error on change
  };

  return (
    <View style={styles.container}>
      <CustomAuthHeader title="Change Password" />
      <View style={{rowGap:10,marginHorizontal:20}} >
      <CustomTextInput
          label={'Email'}
          borderColor="#d2d2d2"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <CustomTextInput
         label={'Choose Password'}
          borderColor="#d2d2d2"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          error={errors.password}
          placeholder="Enter your password"
        />
      <Text style={styles.rememberText}>Your new password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (e.g., @, #, $).</Text>
      </View>

      <View  style={{marginTop:Height(20)}} >
         <CustomAuthButton
           onPress={onSignInPress}
            width={Width(300)}
            height={Height(38)}
            title="Sign in"
            borderWidth={1}
            borderColor="#2E6074"
            br={3}
            textStyle={{ fontSize: 16 , fontFamily: 'Inter-SemiBold' }}
          />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#2E6074',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#2E6074',
    fontFamily: "Inter-Regular",
    bottom:12,
    lineHeight:15
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontWeight: '600',
  },
  googleButton: {
    alignSelf: 'center',
    padding: 10,

  },
  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signInText: {
    color: '#2E6074',
    fontWeight: 'bold',
  },
});
