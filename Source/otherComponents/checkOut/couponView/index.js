import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Width } from '../../../constants/constants';


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
  sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#2E6074',
    marginLeft: 8,
  },
 
  couponCard: {
     backgroundColor: '#F8FBFF',
     borderWidth: 1,
     borderColor: '#D6E7FF',
     borderRadius: 8,
     padding: 12,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 12,
   },
   couponInfo: {
     flex: 1,
   },
   couponCode: {
     fontFamily:'Inter-SemiBold',
     fontSize: 14,
     color: '#2E6074',
     marginBottom: 4,
   },
   couponDesc: {
     fontSize: 12,
     color: '#666',
     fontFamily:'Inter-Regular'
   },
   applyButton: {
       backgroundColor: '#2E6074',
       paddingHorizontal: 16,
       paddingVertical: 8,
       borderRadius: 4,
     },
     applyText: {
       color: '#FFFFFF',
      fontFamily:'Inter-Bold',
       fontSize: 12,
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
     }
})