import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import CustomAuthHeader from '../../../Components/CustomAuthHeader';
import CustomTextInput from '../../../Components/inputField/customTextInput';
import CustomAuthButton from '../../../Components/CustomAuthButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Height ,  Width } from '../../../constants';
import { validateEmail , validateName , validatePassword } from '../../../utils/validation';
import { styles } from './styles';
import { useSelector , useDispatch } from 'react-redux';
import { signupUser } from '../../../redux/slices/authSlice';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [remember, setRemember] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

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



   const onpressSignUp = async () => {
  if (validateForm()) {
    const resultAction = await dispatch(
      signupUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    if (signupUser.fulfilled.match(resultAction)) {
      // ✅ Show flash message
     showMessage({
    message: 'Signup failed. Please try again.',
    type: 'danger',
    color: '#fff',
    icon: 'danger',
    duration: 3000,
    animated: true,
  });

      // ✅ Save credentials if remember is true
      if (remember) {
        await AsyncStorage.setItem(
          'rememberedCredentials',
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          })
        );
      } else {
        await AsyncStorage.removeItem('rememberedCredentials');
      }

     navigation.reset({
          index: 0,
          routes: [{ name: 'Signin' }],
         });
    }
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


