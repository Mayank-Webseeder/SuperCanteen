import React, { useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height , Width } from '../../../constants';
import { validateEmail , validatePassword } from '../../../utils/validation';
import { styles } from './styles';

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
      <View style={styles.inputContainer} >
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

      <View  style={styles.buttonView} >
         <CustomAuthButton
           onPress={onSignInPress}
            width={Width(300)}
            height={Height(38)}
            title="Sign in"
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


