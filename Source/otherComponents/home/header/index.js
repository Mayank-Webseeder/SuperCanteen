import { View, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'
import CustomSearch from '../../../Components/searchInput'
import FastImage from 'react-native-fast-image'

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Search + Icons */}
      <View style={styles.searchContainer}>
        <Pressable 
          style={styles.searchPressable}
          onPress={() => navigation.navigate('Search')}
        >
          <CustomSearch
            disabledStyle={styles.disabledStyle}
            backgroundColor={'#fff'}
            disabled
            customStyle={styles.searchInput}
          />
        </Pressable>
        
        <Pressable 
          style={styles.cartPressable}
          onPress={() => navigation.navigate('Cart')}
        >
          <FastImage
            style={styles.cartImg}
            source={require('../../../../assets/Icons/shopping_cart.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}