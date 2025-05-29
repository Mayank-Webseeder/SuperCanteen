import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomBottomDrop = ({ value, onChangeText, placeholder, dropdownData = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (item) => {
    onChangeText(item);
    setShowDropdown(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
          <Icon name="arrow-drop-down" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={dropdownData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.dropdownItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width:"100%"  ,
   
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 4,
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default CustomBottomDrop;
