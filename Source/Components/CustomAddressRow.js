import React, {  useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLORS, FontSize, Height, Width } from '../constants';
import { useSelector } from 'react-redux';

const AddressRow = () => {
  const navigation = useNavigation();
  const selectedAddress = useSelector(state => state.selectedAddress); 
  const [address, setAddress] = useState(selectedAddress);

  useFocusEffect(
    React.useCallback(() => {
      setAddress(selectedAddress?.selectedAddress);
    }, [selectedAddress])
  );

  const formatAddress = () => {
    if (!address) return '';
    const parts = [
      address.name,
      address.address,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <View
      style={styles.container}>
      {address ? (
        <View style={styles.left}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
            {formatAddress()}
          </Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.address}  onPress={() => navigation.navigate('AddressListScreen', { addressToEdit: address })}>
                   <Text style={styles.addAddressText}>+ Add Address</Text>
        </TouchableOpacity>

      )}
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
  addAddressText: {
    fontSize: FontSize(13),
    color: COLORS.green,
    fontFamily: 'Inter-SemiBold',
    textDecorationLine: 'underline',
  },
  address:{
    marginHorizontal:Height(6)
  }
});

export default AddressRow;
