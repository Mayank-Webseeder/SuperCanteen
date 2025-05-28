import { View, Text ,TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import React from 'react'
import { styles } from '../styles'

export default function AgreeTerms(props) {
  return (
    <View style={styles.termsBox}>
          <TouchableOpacity onPress={() => props.setAgreeTerms(!props.agreeTerms)}>
            <Feather
              name={props.agreeTerms ? 'check-square' : 'square'}
              size={20}
              color={props.agreeTerms ? '#007bff' : '#666'}
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the terms and policy of{' '}
            <Text style={{color: '#00b'}}>Super Canteen</Text>
          </Text>
        </View>
  )
}