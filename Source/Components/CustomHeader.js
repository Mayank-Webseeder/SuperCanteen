import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Width } from '../constants';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({  label , showRightIcons,containerStyle,notShowingBackIcon }) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.container,containerStyle]}>
      {/* Left Arrow */}
     {!notShowingBackIcon &&  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
        <Entypo name="chevron-small-left" size={26} color="#1C1B1F" />
      </TouchableOpacity>
}
      {/* Center Label */}
      <View style={styles.centerContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Right Icons */}
     {/* {showRightIcons &&  <View style={styles.rightIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')} style={styles.icon}>
         <EvilIcons name="heart" size={26} color="#000000" /> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} >
          <EvilIcons name="cart" size={26} color="#000000"/>
        </TouchableOpacity>
      </View>} */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop:Platform.OS === 'android' ? 40 : 40,
  },
  leftIcon: {
    width:Width(30),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerContainer: {

    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    fontFamily:'Inter-Medium'
  },
  rightIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginHorizontal: Width(4),
  },
});

export default CustomHeader;
