import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DeliveryAddress = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delivering to</Text>
      <View style={styles.addressContainer}>
        <Icon name="location-on" size={20} color="#2E6074" style={styles.icon} />
        <View>
          <Text style={styles.name}>{address.name}</Text>
          <Text style={styles.addressText}>{address.street}</Text>
          <Text style={styles.addressText}>{address.city}, {address.state} - {address.pincode}</Text>
          <Text style={styles.phone}>Phone: {address.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
    lineHeight: 18,
  },
  phone: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
});

export default DeliveryAddress;