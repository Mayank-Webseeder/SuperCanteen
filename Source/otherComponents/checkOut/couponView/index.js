import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

export default function CouponView(props) {
  return (
   <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="pricetags-outline" size={20} color="#2E6074" />
            <Text style={styles.sectionTitle}>Apply Coupons</Text>
          </View>

          <View style={styles.couponCard}>
            <View style={styles.couponInfo}>
              <Text style={styles.couponCode}>SAVE50</Text>
              <Text style={styles.couponDesc}>Flat ₹10 OFF on your next order. No minimum spend.</Text>
            </View>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>APPLY</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => props.navigation.navigate('Coupons')} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Coupons</Text>
            <Ionicons name="chevron-forward" size={16} color="#2E6074" />
          </TouchableOpacity>
        </View>
  )
}

