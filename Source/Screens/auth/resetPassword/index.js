import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height, Width } from '../../../constants';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/slices/authSlice'; 

const ResetPasswordScreen = ({ navigation,route }) => {
   const emailFromParams = route?.params?.email || ''; 
  const [formData, setFormData] = useState({
    email: emailFromParams,
    otp: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const otpError = formData.otp.trim() === '' ? 'OTP is required' : null;

    const newErrors = {
      email: emailError,
      otp: otpError,
      password: passwordError,
    };

    setErrors(newErrors);
    return !emailError && !passwordError && !otpError;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const onResetPasswordPress = async () => {
    if (!validateForm()) return;
      const response = await dispatch(resetPassword({
        email:formData.email,
        otp:formData.otp,
        newPassword:formData.password
      }));
     if (resetPassword.fulfilled.match(response)) {
        navigation.navigate('Signin');
      }
    }
  

  return (
    <View style={styles.container}>
      <CustomAuthHeader title="Change Password" />
      <View style={styles.inputContainer}>
        <CustomTextInput
          label="Email"
          borderColor="#d2d2d2"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <CustomTextInput
          label="OTP"
          borderColor="#d2d2d2"
          keyboardType="numeric"
          value={formData.otp}
          onChangeText={text => handleInputChange('otp', text)}
          error={errors.otp}
          placeholder="Enter OTP"
        />

        <CustomTextInput
          label="Choose New Password"
          borderColor="#d2d2d2"
          secureTextEntry
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
          error={errors.password}
          placeholder="Enter your new password"
        />

        <Text style={styles.rememberText}>
          Your new password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character (e.g., @, #, $).
        </Text>
      </View>

      <View style={styles.buttonView}>
        <CustomAuthButton
          onPress={onResetPasswordPress}
          width={Width(300)}
          height={Height(38)}
          title={loading ? 'Resetting...' : 'Reset Password'}
          borderWidth={1}
          borderColor="#2E6074"
          br={3}
          textStyle={styles.textStyle}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;
