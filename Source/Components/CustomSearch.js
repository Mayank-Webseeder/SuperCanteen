import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Height, Width } from '../constants/constants';
import { Search } from '../../assets/Icons/svgIcons/search';
import { Camera } from '../../assets/Icons/svgIcons/camera';
import { Mic } from '../../assets/Icons/svgIcons/mic';
import { Cross } from '../../assets/Icons/svgIcons/close';

const CustomSearchInput = ({
  placeholder = 'Search',
  onChangeText,
  onCameraPress,
  onMicPress,
  containerStyle,
  inputStyle,
  WidthSize = Width,
  backgroundColor,
  disabled = false,
  value,
  onFocus,
  onBlur,
  showCrossIcon,
  onCrossPress,
  disabledStyle
}) => {
  return (
    <View style={{ width: WidthSize }}>      
      <View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: backgroundColor || '#fff' },
          disabled && disabledStyle ? disabledStyle : styles.disabledInput,
        ]}
      >
        <Search/>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#9A9A9A"
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          returnKeyType="search"
          onFocus={onFocus}
          onBlur={onBlur}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {showCrossIcon && (
          <TouchableOpacity onPress={onCrossPress} style={styles.rightIcons}>
            <Cross/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor:"#fff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontFamily:"Inter-Regular",
    elevation: 4,
    paddingLeft:10,
    borderColor:"#D4D4D4",
    borderWidth:1.2,
    height:Height(38)
  },
  disabledInput: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    top:1,
    paddingVertical: 8,
    marginLeft: 5,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 5,
  },
  icon:{
    left:Width(8)
  }
});

export default CustomSearchInput;