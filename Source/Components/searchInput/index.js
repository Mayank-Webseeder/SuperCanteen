import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {  Width } from '../../constants';
import { Search } from '../../../assets/Icons/svgIcons/search';
import { Cross } from '../../../assets/Icons/svgIcons/close';
import { styles } from './styles';

const CustomSearchInput = ({
  placeholder = 'Search',
  onChangeText,
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

export default CustomSearchInput;