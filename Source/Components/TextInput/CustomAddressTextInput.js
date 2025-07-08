import { COLORS, Height } from '@constants/index';
import { TextInput, StyleSheet, View, Text } from 'react-native'; 

const CustomAddressTextInput = ({ value, onChangeText, placeholder, keyboardType, error, inputStyle }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.darkGray}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 4,
    width: '100%',
  },
  errorText: {
    marginTop: Height(6),
    color: 'red',
    fontSize: 13,
    lineHeight: Height(16),
  },
});

export default CustomAddressTextInput;
