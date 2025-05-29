import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Make sure to install this
import { useNavigation } from '@react-navigation/native';
import { FontSize, Height } from '../constants';

const CustomAuthHeader = ({ title = 'Title', onBackPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress || (() => navigation.goBack())}
      >
        <Icon name="left" size={20} color="#000"  style={{left:8}}/>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* Placeholder for right icon (if needed) */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default CustomAuthHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    justifyContent:"center",
    marginTop:Height(30),
    marginBottom:Height(20)
 
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize(22),
    color: '#000',
    fontFamily:'Inter-SemiBold'
  },
  rightSpace: {
    width: 40, // To balance the left back button
  },
});
