import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler, // <- Import added
} from 'react-native';

import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import { Height , Width } from '../../../constants';
import { validateEmail , validatePassword } from '../../../utils/validation';
import { styles } from './styles';
import CustomAuthHeader from '../../../Components/CustomAuthHeader'
import { useSelector , useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/slices/authSlice';

const SigninScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exits the app
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

   const onpressSignIn = async () => {
      if (validateForm()) {
        const resultAction = await dispatch(
          loginUser({
             identifier:formData.email,
             password:formData.password
          })
        );
  
        if (loginUser.fulfilled.match(resultAction)) {
            showMessage({
                  message: 'SignIn Successful!',
                  type: 'success',
                  color: '#fff',
                  icon: 'success',
                  duration: 3000,
                  animated: true,
                });
           navigation.navigate('Main');
        }
      }
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

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>
      </View>

      <TouchableOpacity onPress={onGoogleSignIn} activeOpacity={0.7} style={styles.googleButton}>
        <Image source={require('../../../../assets/Icons/GoogleIcon.png')} style={styles.googleIcon} />
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

