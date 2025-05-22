import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomHeader = ({ onBackPress, onLovePress, onCartPress, label , showRightIcons }) => {
  return (
    <View style={styles.container}>

      {/* Left Arrow */}
      <TouchableOpacity onPress={onBackPress} style={styles.leftIcon}>
        <Entypo name="chevron-small-left" size={26} color="#1C1B1F" />
      </TouchableOpacity>

      {/* Center Label */}
      <View style={styles.centerContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Right Icons */}
     {showRightIcons &&  <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onLovePress} style={styles.icon}>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCartPress} style={styles.icon}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>}

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
    width: 40,
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
    marginLeft: 16,
  },
});

export default CustomHeader;
