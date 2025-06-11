import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function EmptyComponent(props) {
    const navigation = useNavigation()
  return (
     <View style={styles.emptyStateContainer}>
     <MaterialCommunityIcons name="magnify-close" size={40} color="#888" />
       <Text style={styles.emptyStateText}>
         No products found matching your filters
       </Text>
       <View style={styles.emptyStateActions}>
         <TouchableOpacity 
           onPress={props.resetFilters} 
           style={styles.primaryButton}
         >
           <Text style={styles.primaryButtonText}>Reset Filters</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           onPress={() => navigation.navigate('Search')}
           style={styles.secondaryButton}
         >
           <Text style={styles.secondaryButtonText}>View Trending Products</Text>
         </TouchableOpacity>
       </View>
     </View>
  )
}