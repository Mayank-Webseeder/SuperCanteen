import {  COLORS, Height, Width } from '@constants/index';
import React, {useEffect} from 'react';
import {View, StyleSheet, Animated,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const logoScaleAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(logoScaleAnimation, {
      toValue: 0.2,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
  navigation.navigate('App');
    }, 2000);
  }, [logoScaleAnimation, navigation]);

  return (
   <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {transform: [{scale: logoScaleAnimation}]},
        ]}>
        <Image source={require('../../../assets/spalshLogo.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    height: Height(60),
    width: Width(60),
    resizeMode: 'contain',
    
  },
  logoContainer: {
    alignItems: 'center',
  },
});

export default SplashScreen;
