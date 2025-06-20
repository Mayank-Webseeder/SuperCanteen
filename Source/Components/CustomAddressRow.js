// AddressRow.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSize, Width } from '../constants';

const AddressRow = ({ navigation, address }) => {
  // Format address for display
  const formatAddress = () => {
    if (!address) return '';
    
    const parts = [
      address.apartment,
      address.street,
      address.landmark,
      address.city,
      address.pincode
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  return (
    <View style={styles.container}>
     {address &&  <View style={styles.left}>
        <Ionicons name="location-outline" size={20} color="black" />
        <Text 
          style={styles.addressText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formatAddress()}
        </Text>
      </View>}
      <TouchableOpacity onPress={() => navigation.navigate('CreateAddressScreen')}>
        <Text style={styles.changeText}>Change Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  addressText: {
    marginLeft: Width(6),
    fontSize: FontSize(12),
    color: '#333',
    fontFamily: 'Inter-Regular',
    flexShrink: 1,
  },
  changeText: {
    color: COLORS.green,
    fontFamily: 'Inter-SemiBold',
    fontSize: FontSize(13),
    textDecorationLine: "underline"
  },
});

export default AddressRow;