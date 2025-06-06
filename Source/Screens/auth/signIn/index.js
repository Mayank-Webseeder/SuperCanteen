import React, { useState, useEffect } from 'react';
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

const SigninScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });

    loadRememberedCredentials();

    return () => backHandler.remove();
  }, []);

  const loadRememberedCredentials = async () => {
    const saved = await AsyncStorage.getItem('rememberedCredentials');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setRememberMe(true);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    setErrors(newErrors);
    return !emailError && !passwordError;
  };

  const onpressSignIn = async () => {
    if (validateForm()) {
      const resultAction = await dispatch(
        loginUser({
          identifier: formData.email,
          password: formData.password,
        })
      );
      if (loginUser.fulfilled.match(resultAction)) {
        // 🔐 Save or Remove Credentials
        if (rememberMe) {
          await AsyncStorage.setItem('rememberedCredentials', JSON.stringify(formData));
        } else {
          await AsyncStorage.removeItem('rememberedCredentials');
        }    
        navigation.navigate('Main');
      }
    }
  };

  const onGoogleSignIn = () => {
    console.log('Google Sign In pressed');
  };

  const onSignInPress = () => {
    navigation.navigate('SignUp');
  };

  const onpresshandle = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <CustomAuthHeader title="Sign In" />
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
         <Text onPress={onpresshandle} style={styles.rememberText}>
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
       <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
          {rememberMe &&   <CheckBoxIcon/>}
          </TouchableOpacity>
          <Text style={styles.text}>Remember Me</Text>
        </View>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>
      </View>

      <TouchableOpacity onPress={onGoogleSignIn} activeOpacity={0.7} style={styles.googleButton}>
        <FastImage source={require('../../../../assets/Icons/GoogleIcon.png')} style={styles.googleIcon} />
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSignInPress}>
          <Text style={[styles.footerText, styles.signInText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SigninScreen;
