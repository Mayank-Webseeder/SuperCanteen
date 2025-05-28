import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles'
export default function Footer(props) {
  return (
     <View style={styles.footer}>
        <Text style={styles.selectionBtn}>1/3 ITEM Selected</Text>
        <TouchableOpacity
          style={[styles.confirmBtn, {opacity: props.agreeTerms ? 1 : 0.6}]}
          disabled={!props.agreeTerms}>
          <Text onPress={()=>props.navigation.navigate('PaymentConfirmationProcess')}  style={styles.confirmText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
  )
}