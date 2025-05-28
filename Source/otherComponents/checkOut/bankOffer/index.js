import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Height, Width } from '../../../constants/constants'
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function BankOfferView(props) {
  return (
     <View style={[styles.card,{marginTop:Height(17)},props.cardStyle]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={20} color="#2E6074" />
            <Text style={styles.sectionTitle}>Bank Offers</Text>
          </View>
          
          <View style={styles.bankContainer}>
            <View style={styles.bankLogos}>
              <Image source={require('../../../../assets/Icons/Banks/b1.png')} style={styles.bankLogo} />
              <Image source={require('../../../../assets/Icons/Banks/b2.jpg')} style={styles.bankLogo} />
              <Image source={require('../../../../assets/Icons/Banks/b3.png')} style={styles.bankLogo} />
              <Image source={require('../../../../assets/Icons/Banks/b4.png')} style={styles.bankLogo} />
            </View>
            
            <TouchableOpacity onPress={() => props?.navigation.navigate('Offers')} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Available Offers</Text>
              <Ionicons name="chevron-forward" size={16} color="#2E6074" />
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
    sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
    bankContainer: {
    marginTop: 8,
  },
  bankLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(18),
  },
  bankLogo: {
    width: 48,
    height: 32,
    resizeMode: 'contain',
  },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    viewAllText: {
      color: '#2E6074',
      fontSize: 13,
      fontFamily:'Inter-SemiBold',
      marginHorizontal:Width(8)
    },
     sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#2E6074',
    marginLeft: 8,
  }
})