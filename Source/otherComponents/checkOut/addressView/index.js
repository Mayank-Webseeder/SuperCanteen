import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Height } from '../../../constants/constants';


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
                  <Image 
                    style={styles.addIcon} 
                    source={require('../../../../assets/Icons/add_home.png')}
                  />
                  <Text style={styles.addAddressText}>Add New Address</Text>
                </TouchableOpacity>
              </View>
            </View>
  )
}

const styles = StyleSheet.create({
     card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    
  },
   addIcon: {
    height: 16,
    width: 16,
    marginRight: 6,
    tintColor: '#2E6074',
  },
   sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
   sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#2E6074',
    marginLeft: 8,
  },
   addressContainer: {
    marginBottom: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
    fontFamily:'Inter-Regular'
  },
  changeButton: {
    alignSelf: 'flex-start',
    fontFamily:'Inter-SemiBold',
  },
  changeText: {
    color: '#2E6074',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  addAddressContainer: {
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAddressPrompt: {
    flex: 1,
    fontSize: 12,
    color: '#555',
    fontFamily:'Inter-Regular',
    lineHeight:Height(15)
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1EDFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
   addAddressText: {
    color: '#2E6074',
    fontSize: 13,
   
  },
})