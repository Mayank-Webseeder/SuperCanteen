// components/FlipToCartAnimation.js
import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions, Easing, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export const FlipToCartAnimation = ({ visible, imageUrl, onComplete }) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      flipAnim.setValue(0);
      positionAnim.setValue(0);
      scaleAnim.setValue(1);

      // Animation sequence
      Animated.sequence([
        // Flip animation (first half)
        Animated.timing(flipAnim, {
          toValue: 0.5,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Change to cart icon
        // Flip animation (second half)
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Move to cart position
        Animated.parallel([
          Animated.timing(positionAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  // Calculate rotation for flip effect
  const flipRotation = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'],
  });

  // Calculate movement to cart
  const translateX = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 100], // Adjust based on your cart icon position
  });

  const translateY = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], // Adjust based on your cart icon position
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { rotateY: flipRotation },
            { translateX },
            { translateY },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      {flipAnim._value < 0.6 ? (
        <FastImage
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.cartIconContainer}>
          <Icon name="shopping-cart" size={30} color="#416F81" />
          <Text style={styles.plusText}>+1</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    top: '80%', // Position near add to cart button
    left: '40%',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 12,
    color: '#416F81',
    fontWeight: 'bold',
    marginTop: 2,
  },
});