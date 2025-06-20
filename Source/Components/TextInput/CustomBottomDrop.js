import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Height } from '@constants/index';

const screenWidth = Dimensions.get('window').width;

const CustomBottomDrop = ({ value, onChangeText, placeholder, dropdownData = [], error }) => {
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
          placeholderTextColor={COLORS.darkGray}
        />
        <TouchableOpacity onPress={() => setShowDropdown(true)}>
          <Icon name="arrow-drop-down" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      {/* Full-screen modal dropdown */}
      <Modal visible={showDropdown} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setShowDropdown(false)}>
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
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
});

export default CustomBottomDrop;
