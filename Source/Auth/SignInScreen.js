import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler, // <- Import added
} from 'react-native';
import CustomAuthHeader from '../Components/customAuthHeader';
import CustomTextInput from '../Components/customTextInput';
import CustomAuthButton from '../Components/customAuthButton';
import { FontSize, Height, Width } from '../constants/constants';
import { validateEmail, validatePassword } from '../utils/validation';

const SigninScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

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

  const gotoScreen = () => {
    if (validateForm()) {
      navigation.navigate('Main');
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
      <View style={{ rowGap: 10, marginTop: Height(15), marginHorizontal: Height(20) }}>
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

      <View style={{ marginTop: Height(20) }}>
        <CustomAuthButton
          onPress={gotoScreen}
          width={Width(300)}
          height={Height(38)}
          title="Sign In"
          borderWidth={1}
          borderColor="#2E6074"
          br={3}
          textStyle={{ fontSize: 16, fontFamily: 'Inter-SemiBold' }}
        />
      </View>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>
      </View>

      <TouchableOpacity onPress={onGoogleSignIn} activeOpacity={0.7} style={styles.googleButton}>
        <Image source={require('../../assets/Icons/GoogleIcon.png')} style={styles.googleIcon} />
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
    marginLeft: 10,
    fontSize: 13,
    color: '#2E6074',
    bottom:16
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    marginVertical: 20,
    marginTop:Height(30)
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#000',
    fontWeight: '600',
  },
  googleButton: {
    alignSelf: 'center',
    padding: 10,

  },
  googleIcon: {
      width: Height(40),
    height: Height(40),
    resizeMode: 'cover',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: '#2E6074',
    fontFamily:"Inter-Regular"
  },
  signInText: {
     color: '#2E6074',
        fontFamily:"Inter-Medium",
        fontSize:FontSize(14)
  },
});
