import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomAddressTextInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        underlineColorAndroid="transparent" // For Android to remove default underline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // optional wrapper styles
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // or any color you want
    paddingVertical: 8,         // optional for spacing
    paddingHorizontal: 4,    
    width:"100%"  ,
 
  },
});

export default CustomAddressTextInput;
