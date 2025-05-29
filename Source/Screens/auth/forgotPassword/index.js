import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomAuthHeader from '../../../components/customAuthHeader';
import CustomTextInput from '../../../components/inputField/customTextInput';
import CustomAuthButton from '../../../components/customAuthButton';
import { Height ,  Width } from '../../../constants';
import { validateEmail } from '../../../utils/validation';
import { styles } from './styles';

const ResetPasswordScreen = ({ navigation }) => {
   const [formData, setFormData] = useState({
      email: '',
    });
  const [linkSent, setLinkSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
const emailError = validateEmail(formData.email);
     const newErrors = {
      email: emailError,
    };
    setErrors(newErrors);
    return !emailError;
    
  }

  const handleSendLink = () => {
   if(validateForm()) {
       // TODO: trigger send reset link API here
    setLinkSent(true);
   }    
  };

  const handleResendLink = () => {
    // You can reset state or do any logic here before navigating
    // For demo, just navigate to same screen
    navigation.navigate('ResetPassword'); // Make sure this matches your route name in navigator
  };

   const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null }); // clear error on change
  };

  return (
    <View style={styles.container}>
      <CustomAuthHeader title= {linkSent ? "Reset Password" : "Forgot Password" } />
      <View style={styles.textInputStyle}>
        <CustomTextInput
          label={'Email'}
          borderColor="#d2d2d2"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          error={errors.email}
          placeholder="Enter your email"
        />
        {!linkSent ? (
          <Text style={styles.infoText}>
            Enter your registered email address. We’ll send you a link to reset your password.
          </Text>
        ) : (
          <>
            <Text style={styles.infoText}>
              We’ve sent a reset link to your email. Please check your inbox to proceed.
            </Text>
            <TouchableOpacity onPress={handleResendLink}>
              <Text style={styles.resendText}>
                Didn't receive the email? Click Resend.
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.buttonView}>
         <CustomAuthButton
          onPress={linkSent ? handleResendLink : handleSendLink}
            title={linkSent ? "Resend Link" : "Send Link"}
            width={Width(300)}
            height={Height(38)}
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

