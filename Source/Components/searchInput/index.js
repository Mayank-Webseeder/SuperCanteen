import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Width } from '../../constants';
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
  disabledStyle,
  onSubmitEditing
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  return (
    <View style={{ width: WidthSize }}>      
      <View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: backgroundColor || '#fff' },
          disabled && disabledStyle ? disabledStyle : styles.disabledInput,
          isFocused && styles.focusedContainer
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCorrect={false}
          autoCapitalize="none"
          onSubmitEditing={onSubmitEditing}
        />
        {showCrossIcon && (
          <TouchableOpacity 
            onPress={() => {
              onCrossPress();
              Keyboard.dismiss();
            }} 
            style={styles.rightIcons}
          >
            <Cross/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomSearchInput;