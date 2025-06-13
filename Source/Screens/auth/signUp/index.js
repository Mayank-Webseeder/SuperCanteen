import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height, Width } from '../../../constants';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../../redux/slices/authSlice';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  const validateForm = useCallback(() => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };
    
    setErrors(newErrors);
    return !nameError && !emailError && !passwordError;
  }, [formData]);

  const onpressSignUp = useCallback(async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(
      signupUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
       showMessage({
        message: 'Sign Up Successful!',
        description: 'Your account has been created',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signin' }],
      });
    } else if (signupUser.rejected.match(resultAction)) {
      // Show error message
      showMessage({
        message: 'Sign up failed',
        type: 'danger',
        icon: 'danger',
        duration: 4000,
      });
    }
  }, [formData, validateForm, dispatch]);

  const onGoogleSignIn = useCallback(() => {
    console.log('Google Sign In pressed');
  }, []);

  const onSignInPress = useCallback(() => {
    navigation.navigate('Signin');
  }, [navigation]);

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <CustomAuthHeader title="Sign Up" />
      <View style={styles.mainContainer}>
        <View style={styles.main}>
          <CustomTextInput
            label={'Name'}
            borderColor="#d2d2d2"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={errors.name}
            placeholder="Enter your name"
          />

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
            passwordRules="minlength: 8; required: lower; required: upper; required: digit;"
          />

          <View style={{ marginTop: Height(10) }}>
            <CustomAuthButton
              onPress={onpressSignUp}
              width={Width(300)}
              height={Height(38)}
              title="Sign Up"
              borderWidth={1}
              borderColor="#2E6074"
              br={3}
              textStyle={styles.textStyle}
              loading={loading}
            />
          </View>
        </View>

        <View style={styles.orContainer}>
          <Text style={styles.orText}>OR</Text>
        </View>

        <TouchableOpacity
          onPress={onGoogleSignIn}
          activeOpacity={0.7}
          style={styles.googleButton}
        >
          <FastImage
            source={require('../../../../assets/Icons/GoogleIcon.png')}
            style={styles.googleIcon}
          />
        </TouchableOpacity>

        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignInPress}>
            <Text style={[styles.footerText, styles.signInText]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;