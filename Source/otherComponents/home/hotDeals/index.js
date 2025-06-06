import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import offerData from '../../../Mock/Data/offerData'
import CustomOfferCard from '../../../Components/offerCard'
import FastImage from 'react-native-fast-image'

export default function HotDealsSection({navigation}) {
  return (
   <View key="deals" style={styles.container}>
         <Text style={styles.textStyle}>HOT DEALS <FastImage style={styles.image} source={require('../../../../assets/Icons/local_fire_department.png')}/> JUST FOR YOU..</Text>
         <CustomOfferCard navigation={navigation} item={offerData} />
       </View> 
  )
}