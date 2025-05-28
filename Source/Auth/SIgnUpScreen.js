import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import CustomAuthHeader from '../Components/customAuthHeader';
import CustomTextInput from '../Components/customTextInput';
import CustomAuthButton from '../Components/customAuthButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontSize, Height, Width } from '../constants/constants';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../utils/validation';

const SIgnUpScreen = ({ navigation }) => {
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const toggleRemember = () => setRemember(!remember);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: null }); // clear error on change
  };

  const validateForm = () => {
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
  };

  const onpressHome = () => {
    if (validateForm()) {
      navigation.navigate('Signin');
    } 
  };

  const onGoogleSignIn = () => {
    console.log('Google Sign In pressed');
  };

  const onSignInPress = () => {
    navigation.navigate('Signin');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
        />

        <View style={{ marginTop: Height(10) }}>
          <CustomAuthButton
            onPress={onpressHome}
            width={Width(300)}
            height={Height(38)}
            title="Sign Up"
            borderWidth={1}
            borderColor="#2E6074"
            br={3}
            textStyle={{ fontSize: 16 , fontFamily: 'Inter-SemiBold', }}
          />
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity onPress={toggleRemember} style={styles.checkbox}>
            {remember && <Icon name="check" size={18} color="#2E6074" />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember Me</Text>
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
        <Image
          source={require('../../assets/Icons/GoogleIcon.png')}
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

export default SIgnUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  main:{
    rowGap: 8,
    marginTop:Height(15)
  },
  mainContainer:{
    marginHorizontal:Height(20)
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: '#2E6074',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 10,
    fontSize: FontSize(15),
    color: '#2E60749C',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    marginVertical: 20,
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
    fontSize:FontSize(15)
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
