import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height, Width } from '../../../constants';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { styles } from './styles';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';
import { CheckBoxIcon } from '../../../../assets/Icons/svgIcons/checkBoxIcon';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { mergeGuestCart } from '../../../redux/slices/cartSlice';

const SigninScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.replace('App'); 
    return true; 
  });

    const loadCredentials = async () => {
      try {
        const saved = await AsyncStorage.getItem('rememberedCredentials');
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData(parsed);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };

    loadCredentials();

    return () => backHandler.remove();
  }, [navigation]);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  const validateForm = useCallback(() => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    
    setErrors(newErrors);
    return !emailError && !passwordError;
  }, [formData.email, formData.password]);


  

  const onpressSignIn = useCallback(async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(
      loginUser({
        identifier: formData.email,
        password: formData.password,
      })
    );
    
    if (loginUser.fulfilled.match(resultAction)) {

         try {
      await dispatch(mergeGuestCart()).unwrap();
    } catch (error) {
      console.log('Cart merge failed (non-critical)', error);
    }

       showMessage({
        message: 'Sign In Successful!',
        description: 'Welcome to our app',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
      // Non-blocking credential storage
      if (rememberMe) {
        AsyncStorage.setItem('rememberedCredentials', JSON.stringify(formData))
          .catch(e => console.error('Storage error', e));
      } else {
        AsyncStorage.removeItem('rememberedCredentials')
          .catch(e => console.error('Remove error', e));
      }
      
    navigation.reset({
  index: 0,
  routes: [
    {
      name: 'App',
      state: {
        routes: [{ name: 'Main' }]
      },
    },
  ],
});
     } else if (loginUser.rejected.match(resultAction)) {
      // Show error message
      showMessage({
        message:  'Sign in failed',
        type: 'danger',
        icon: 'danger',
        duration: 4000,
      });
    }
  }, [formData, rememberMe, validateForm, dispatch]);

  const onGoogleSignIn = useCallback(() => {
    console.log('Google Sign In pressed');
  }, []);

  const onSignUpPress = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomAuthHeader   onBackPress={() => navigation.replace('App')}  title="Sign In" />
      
      <View style={styles.inputView}>
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
          placeholder="Enter your password"
        />
        
        <Text onPress={onForgotPassword} style={styles.rememberText}>
          Forgot Password
        </Text> 
      </View>

      <View style={styles.buttonView}>
        <CustomAuthButton
          onPress={onpressSignIn}
          width={Width(300)}
          height={Height(38)}
          title="Sign In"
          borderWidth={1}
          borderColor="#2E6074"
          br={3}
          textStyle={styles.textStyle}
          loading={loading}
        />
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity 
          onPress={() => setRememberMe(!rememberMe)} 
          style={styles.checkbox}
        >
          {rememberMe && <CheckBoxIcon/>}
        </TouchableOpacity>
        <Text style={styles.text}>Remember Me</Text>
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
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onSignUpPress}>
          <Text style={[styles.footerText, styles.signInText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;