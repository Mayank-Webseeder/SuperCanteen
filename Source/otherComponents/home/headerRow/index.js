import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Height } from '../../../constants'

export default function HeaderRow({title, containerStyle}) {
  return (
     <View style={[styles.row,{...containerStyle}]}>
            <Text style={styles.textStyle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
     row:{
 marginHorizontal:Height(12),
 flex:1,
 justifyContent:"space-between",
 flexDirection:"row",
 marginBottom:Height(2),
 marginTop:Height(10),

  },
  textStyle:{
    fontSize: 15,
    fontFamily:"Inter-SemiBold",
  },
})