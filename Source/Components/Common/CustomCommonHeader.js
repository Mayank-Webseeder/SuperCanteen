import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { FontSize, Height } from '../../constants';

const CustomCommonHeader = ({ title, navigation, leftIconName = 'chevron-small-left', notShowingBackIcon }) => {
  return (
    <View style={styles.container}>
    {!notShowingBackIcon &&   <TouchableOpacity style={styles.leftIconContainer} onPress={() => navigation.goBack()}>
        <Entypo name={leftIconName} size={24} color="#333" />
      </TouchableOpacity>}
      <Text style={styles.title}>{title}</Text>
      {/* Placeholder for right space to center the title */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default CustomCommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:Height(10),
    width:"100%",
    marginTop:Height(10),
  },
  leftIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: FontSize(18),
    color: '#333',
    fontFamily:'Inter-SemiBold'
  },
  rightSpace: {
    width: 40, // same as left icon to center the title
  },
});
