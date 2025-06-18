import { COLORS } from '@constants/index';
import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Easing, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeartAnimation = ({ isActive, size = 24, onPress }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scale = new Animated.Value(1);
  const bounce = new Animated.Value(0);
  const particlesOpacity = new Animated.Value(0);

  const createParticles = () => {
    return Array(8).fill(null).map((_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
      distance: 10 + Math.random() * 5,
      delay: i * 50,
    }));
  };

  const particles = createParticles();

  const animateHeart = () => {
    setIsAnimating(true);
    
    // Reset animations
    scale.setValue(1);
    bounce.setValue(0);
    particlesOpacity.setValue(0);

    Animated.parallel([
      // Heart scale animation
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),

      // Bounce effect
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(bounce, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),

      // Particles animation
      Animated.sequence([
        Animated.timing(particlesOpacity, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(particlesOpacity, {
          toValue: 0,
          duration: 300,
          delay: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setIsAnimating(false));
  };

  const handlePress = () => {
    if (!isAnimating) {
      animateHeart();
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={styles.container}
      activeOpacity={0.8}
    >
      {/* Red Background Circle if active */}
      <Animated.View
        style={[
          styles.heartWrapper,
          {
            transform: [
              { scale },
              { 
                translateY: bounce.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }) 
              },
            ],
          },
        ]}
      >
        <MaterialIcons
          name={isActive || isAnimating ? "" : "favorite-border"}
          size={size}
          color={COLORS.white}
        />
      </Animated.View>

      {/* Celebration Particles */}
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              opacity: particlesOpacity,
              transform: [
                {
                  translateX: particlesOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.cos(particle.angle) * particle.distance],
                  }),
                },
                {
                  translateY: particlesOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.sin(particle.angle) * particle.distance],
                  }),
                },
                {
                  scale: particlesOpacity.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.5],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  heartWrapper: {
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF4081',
  },
});

export default HeartAnimation;
