import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { LocationIcon } from '../../../../assets/Icons/svgIcons/location_on'
import CustomSearch from '../../../Components/customSearch'
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { Height } from '../../../constants/constants'

export default function Header({navigation}) {
  return (
   <>
    <View style={styles.main}>
           <View style={styles.innerView}>
            <View style={styles.top}> <Text><LocationIcon/></Text></View>
           <Text style={styles.textStyle}>
             Deliver to{' '}
             <Text>
               Maruti Apartments-Del..
             </Text>
           </Text>
           </View>
           <View style={styles.innerView}>
             <Pressable onPress={() => navigation.navigate('Account')}>
               <Image  style={styles.image} source={require('../../../../assets/Icons/ProfileIcon.png')} />
             </Pressable>
           </View>
         </View>
           {/* Search + Icons */}
         <View style={styles.searchContainer}>
           <View style={styles.searchView}>
             <Pressable onPress={()=>navigation.navigate('Search')}>
             <CustomSearch disabledStyle={styles.disabledStyle} WidthSize={'98%'} backgroundColor={'#fff'}  disabled/>
             </Pressable>
           </View>
             <View style={styles.innerView}>
                     <Pressable onPress={() => navigation.navigate('Wishlist')}>
                    <Ionicons
                       name={'heart-outline'}
                       size={20}
                       color={'#0E2D42'}
                       style={{right:Height(7)}}
                     />
                     </Pressable>
                     <Pressable onPress={() => navigation.navigate('Cart')}>
                       <Image style={styles.cartImg} source={require('../../../../assets/Icons/shopping_cart.png')} />
                     </Pressable>
                   </View>
         </View>
   
   </>
  )
}