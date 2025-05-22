import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Height, Width } from '../constants/constants';
import { Search } from '../../assets/Icons/svgIcons/search';
import { Camera } from '../../assets/Icons/svgIcons/camera';
import { Mic } from '../../assets/Icons/svgIcons/mic';

const demoData = [
  'Red T-shirt',
  'Blue Jeans',
  'Sneakers',
  'Sunglasses',
  'Watch',
  'Hat',
  'Leather Bag',
  'Casual Jacket',
];

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
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (text) => {
    setSearchValue(text);
    onChangeText?.(text);

    if (text.length > 0) {
      const filtered = demoData.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultRow}>
      <Feather name="search" size={16} color="#666" style={{ marginRight: 10 }} />
      <Text style={styles.resultText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ width: WidthSize }}>      
      <View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: backgroundColor || '#fff' },
          disabled && styles.disabledInput,
        ]}
      >
       <Search/>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor="#9A9A9A"
          value={searchValue}
          onChangeText={handleSearchChange}
          editable={!disabled}
        />

        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={onCameraPress} disabled={disabled}>
         <Text><Camera/></Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMicPress} disabled={disabled}>
         <Text><Mic/></Text>
          </TouchableOpacity>
        </View>
      </View>

      {!disabled && filteredData.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

export default CustomSearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor:"#fff",
     // Shadow for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  fontFamily:"Inter-Regular",

  // Shadow for Android
  elevation: 4,
  paddingLeft:10,
  borderColor:"#D4D4D4",
  borderWidth:1.2,
  height:Height(38)
  },
  disabledInput: {
// no backgroundColor here!
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    top:1
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 12,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
});
