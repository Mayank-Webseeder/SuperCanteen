import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

export default function AddressView(props) {
  return (
    <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Ionicons name="location-outline" size={20} color="#2E6074" />
                <Text style={styles.sectionTitle}>Delivery Address</Text>
              </View>
              
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>
                  23B, Maple Residency, Sector 45, Near Green Park Metro Station, Gurgaon, Haryana - 122003
                </Text>
                <TouchableOpacity onPress={() => props?.navigation.navigate('CreateAddressScreen')} style={styles.changeButton}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
    
              <View style={styles.addAddressContainer}>
                <Text style={styles.addAddressPrompt}>
                  Got another doorstep in mind? Add your new spot here
                </Text>
                <TouchableOpacity onPress={() => props?.navigation.navigate('CreateAddressScreen')} style={styles.addAddressButton}>
                  <FastImage 
                    style={styles.addIcon} 
                    source={require('../../../../assets/Icons/add_home.png')}
                  />
                  <Text style={styles.addAddressText}>Add New Address</Text>
                </TouchableOpacity>
              </View>
            </View>
  )
}

