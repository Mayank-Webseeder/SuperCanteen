import {  Height, Width } from '@constants/index';
import React, {useEffect} from 'react';
import {View, StyleSheet, Animated,Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  const logoScaleAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(logoScaleAnimation, {
      toValue: 0.4,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
  navigation.navigate('Main');
    }, 2000);
  }, [logoScaleAnimation, navigation]);

  return (
   <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {transform: [{scale: logoScaleAnimation}]},
        ]}>
        <Image tintColor={'white'} source={require('../../../assets/spalshLogo.png')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D7C8E',
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
