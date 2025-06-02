import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height, Width } from '../../../constants';
import { validateEmail } from '../../../utils/validation';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPasswordOtp } from '../../../redux/slices/authSlice';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const validateForm = () => {
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    return !emailError;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;

    try {
      const response = await dispatch(sendResetPasswordOtp({ email })).unwrap();
      if (response) {
        setLinkSent(true); // Show OTP sent UI
      }
    } catch (err) {
      console.error('OTP error:', err);
    }
  };

  const handleContinue = () => {
    // Navigate to ResetPassword screen with email as param
    navigation.navigate('ResetPassword', { email });
  };

  const handleInputChange = (text) => {
    setEmail(text);
    setErrors({ email: null });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <CustomAuthHeader title={linkSent ? 'OTP Sent' : 'Forgot Password'} />

      <View style={styles.textInputStyle}>
        <CustomTextInput
          label="Email"
          borderColor="#d2d2d2"
          keyboardType="email-address"
          value={email}
          onChangeText={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        {!linkSent ? (
          <Text style={styles.infoText}>
            Enter your registered email address. We’ll send you an OTP to reset your password.
          </Text>
        ) : (
          <>
            <Text style={styles.infoText}>
              We’ve sent an OTP to your email. Please check your inbox.
            </Text>
            <TouchableOpacity onPress={handleSendOtp}>
              <Text style={styles.resendText}>
                Didn't receive the email? Click Resend.
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.buttonView}>
        <CustomAuthButton
          onPress={linkSent ? handleContinue : handleSendOtp}
          title={loading ? 'Sending...' : linkSent ? 'Continue' : 'Send OTP'}
          width={Width(300)}
          height={Height(38)}
          borderWidth={1}
          borderColor="#2E6074"
          br={3}
          textStyle={styles.textStyle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
