import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { openSystemNotificationSettings } from '../../services/notificationService'


export const NotificationPermissionDialog = ({ onAllow, onDeny }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef(null);

   const handleEnablePress = async () => {
    // Directly open system settings
    await openSystemNotificationSettings();
    // Consider the permission granted after they return
    onAllow();
  };

  useEffect(() => {
    // Start background fade animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Play Lottie animation
    if (lottieRef.current) {
      lottieRef.current.play();
    }

    return () => {
      if (lottieRef.current) {
        lottieRef.current.reset();
      }
    };
  }, []);

  const bgOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  const dialogScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.background, { opacity: bgOpacity }]} />

      <Animated.View style={[styles.container, { transform: [{ scale: dialogScale }] }]}>
        <View style={styles.lottieContainer}>
          <LottieView
            ref={lottieRef}
            source={require('../../../assets/lottie/notification.json')}
            autoPlay
            loop
            style={styles.lottie}
            progress={0} // Explicitly set initial progress
          />
        </View>

        <Text style={styles.title}>Don't Miss Out!</Text>
        <Text style={styles.subtitle}>
          Enable notifications for exclusive deals, order updates, and personalized recommendations
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.denyButton} 
            onPress={onDeny}
            activeOpacity={0.7}
          >
            <Text style={styles.denyButtonText}>Not Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.allowButton} 
            onPress={handleEnablePress}
            activeOpacity={0.7}
          >
            <Text style={styles.allowButtonText}>Enable Notifications</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};



