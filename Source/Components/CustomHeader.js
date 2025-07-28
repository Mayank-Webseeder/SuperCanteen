import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Heart Icon
import { COLORS, Width } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CustomHeader = ({ label, showCartIcon, containerStyle, notShowingBackIcon,screenName }) => {
  const navigation = useNavigation();
  const { items = [] } = useSelector((state) => state.cart);
  const { user } = useSelector(state => state.auth);
const validCartItems = React.useMemo(() => items?.filter(item => item.product !== null), [items]);
const itemCount = validCartItems.length;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevCountRef = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCountRef.current) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          easing: Easing.easeOutQuad,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.easeInQuad,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevCountRef.current = itemCount;
  }, [itemCount]);

  return (
    <View style={[styles.container, containerStyle]}>
      {!notShowingBackIcon && (
       <TouchableOpacity
  onPress={() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Main', { screen: screenName }); 
    }
  }}
  style={styles.leftIcon}
>
          <Entypo name="chevron-small-left" size={26} color="#1C1B1F" />
        </TouchableOpacity>
      )}

      <View style={styles.centerContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {showCartIcon && (
        <View style={styles.rightIcons}>
          {/* Wishlist Icon */}
          <TouchableOpacity
            onPress={() => 
                  user || user?.username ?  navigation.navigate('Wishlist') :
              
               navigation.reset({
  index: 0,
  routes: [
    {
      name: 'Auth',
      state: {
        routes: [
          { name: 'Signin' }
        ]
      }
    }
  ]
})}
            style={styles.iconContainer}
          >
            <FontAwesome name="heart-o" size={20} color="#1C1B1F" />
          </TouchableOpacity>

          {/* Cart Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartIconContainer}
          >
            <Ionicons name="cart-outline" size={23} color="#1C1B1F" />
            {itemCount > 0 && (
              <Animated.View style={[styles.badge, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: Width(30),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Inter-Medium',
  },
  rightIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: Width(10),
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    marginRight: Width(4),
  },
  cartIconContainer: {
    position: 'relative',
    paddingVertical: 8,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 3,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    zIndex: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
