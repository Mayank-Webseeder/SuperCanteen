// components/AddToCartAnimation.js
import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Easing, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

export const AddToCartAnimation = ({ visible, imageUrl, onComplete }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  // Calculate positions (adjust these based on your layout)
  const startPosition = { x: width / 2 - 30, y: height - 150 }; // Near add to cart button
  const endPosition = { x: width - 50, y: 50 }; // Cart icon position

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, endPosition.x - startPosition.x],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, endPosition.y - startPosition.y],
  });

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          position: 'absolute',
          left: startPosition.x,
          top: startPosition.y,
          transform: [{ translateX }, { translateY }, { scale }],
          opacity,
          zIndex: 1000,
        },
      ]}
    >
      <FastImage
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});