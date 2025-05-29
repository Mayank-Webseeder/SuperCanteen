import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Height } from '../../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

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


