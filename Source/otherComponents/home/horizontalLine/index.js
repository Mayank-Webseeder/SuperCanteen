import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HorizontalLine(props) {
  return (
    <View style={props.containerStyle}>
  <View key="line" style={[styles.main,props.lineStyle]} />

    </View>
    
  )

 
}

 const styles = StyleSheet.create({
    main:{
       width: '100%', height: 1, backgroundColor: '#F3F4F5',marginTop:10 
    }
  })