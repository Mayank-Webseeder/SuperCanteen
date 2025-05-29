import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import offerData from '../../../mock/Data/offerData'
import CustomOfferCard from '../../../components/offerCard'

export default function HotDealsSection({navigation}) {
  return (
   <View key="deals" style={styles.container}>
         <Text style={styles.textStyle}>HOT DEALS <Image style={styles.image} source={require('../../../../assets/Icons/local_fire_department.png')}/> JUST FOR YOU..</Text>
         <CustomOfferCard navigation={navigation} item={offerData} />
       </View> 
  )
}