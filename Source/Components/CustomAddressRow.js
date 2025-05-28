import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or use MaterialIcons, etc.
import { FontSize, Width } from '../constants/constants';

const AddressRow = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="location-outline" size={20} color="black" />
        <Text style={styles.addressText}>123 Street, Delhi-009900</Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('CreateAddressScreen')} >
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
    borderColor: '#E8E8E8', // light gray divider

  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    marginLeft: Width(6),
    fontSize: FontSize(12),
    color: '#333',
    fontFamily:'Inter-Regular'
  },
  changeText: {
    color: '#2E60749E',
   fontFamily:'Inter-SemiBold',
    fontSize: FontSize(12),
    textDecorationLine:"underline"
  },
});

export default AddressRow;
