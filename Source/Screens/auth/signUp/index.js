import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height, Width } from '../../../constants';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { styles } from './styles';

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



  const onSignInPress = useCallback(() => {
    navigation.navigate('Signin');
  }, [navigation]);

  return (
     <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <CustomAuthHeader onBackPress={() => navigation.goBack()} title="Sign Up" />
        
        {/* Welcome Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Create Your Account</Text>
          <Text style={styles.subtitleText}>Join us to start your shopping journey</Text>
        </View>
        
        <View style={styles.inputView}>
          <CustomTextInput
            label={'Full Name'}
            borderColor="#d2d2d2"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={errors.name}
            placeholder="Enter your full name"
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
            label={'Password'}
            borderColor="#d2d2d2"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            error={errors.password}
            placeholder="Create your password"
            passwordRules="minlength: 8; required: lower; required: upper; required: digit;"
          />
        </View>

        <View style={styles.buttonView}>
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

        {/* Modern Divider with OR */}
        <View style={styles.modernDividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

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