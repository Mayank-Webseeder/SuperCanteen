import React from 'react';
import { TouchableOpacity, Text, StyleSheet , ActivityIndicator } from 'react-native';
import { Width, Height, COLORS } from '../constants';

const CustomAuthButton = ({
  title,
  onPress,
  textStyle,
  backgroundColor = '#2E6074',
  borderWidth = 0,
  borderColor = '#2E6074',
  br = 10, // borderRadius default
  width = Width(248),  // default width prop
  height = Height(40),
  marginLeft, // default height prop,
  loading,
  loadingColor
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderWidth,
          borderColor,
          borderRadius: br,
          width,
          height,
          marginLeft
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {loading ?   <ActivityIndicator color={loadingColor ? loadingColor : COLORS.white} /> :  <Text style={[styles.buttonText, textStyle]}>{title}</Text> }

    </TouchableOpacity>
  );
};

export default CustomAuthButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // <-- this centers the button horizontally by default
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
