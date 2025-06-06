import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { COLORS, FontSize, Height, Width } from '../constants';
import FastImage from 'react-native-fast-image';

const CustomCategoryList = ({
  data = [],
  selected,
  onSelect = () => {},
  bgColor = '#D4E7F2',
  width = Width(40),
  height = Width(60),
  imageSize = Width(32),
  borderRadius = Width(25),
  selectedBorderColor = COLORS.primary,
  textColor = COLORS.text,
  containerStyle,
  textStyle,
  horizontal,
  numColumns = 1,
  gap = Width(14),
  navigation,
  contentContainerStyle,
  imageStyle
}) => {
  return (
    <View style={[containerStyle]}>
      <FlatList
        nestedScrollEnabled={true}
        numColumns={numColumns}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.name}
        contentContainerStyle={[{paddingHorizontal: Width(10)},contentContainerStyle]}
     renderItem={({ item }) => {
  const isSelected = selected === item.id; // compare using index

  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(item?.id); 
        if (navigation) {
          navigation.navigate('Products', {  selectedCategory: item.id,
            categoryData: item});
        }
      }}
      style={[styles.categoryContainer, { marginRight: gap }]}
    >
      <View
        style={{
          width: item.name === 'All' ? Width(40) : width,
          height: item.name === 'All' ? Height(48) : height,
          borderRadius: borderRadius,
          backgroundColor: item.name === 'All' ? '' : bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Height(6),
          borderWidth: item.name === 'All' ? 0 : isSelected ? 1 : 0,
          borderColor: isSelected ? selectedBorderColor : 'transparent',
        }}
      >
        <FastImage
          source={
    typeof item.image === 'string'
      ? { uri: item.image } 
      : item.image          
  }
          style={{
            width: imageSize,
            height: imageSize,
            ...imageStyle
          }}
          resizeMode="cover"
        />
      </View>
      <Text
        style={[
          styles.categoryText,
          textStyle,
          {
            color: isSelected ? selectedBorderColor : textColor,
            marginTop: item.name === 'All' ? Height(-4) : 0,
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}}
      />
    </View>
  );
};

export default CustomCategoryList;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
  },
  categoryText: {
    fontSize: FontSize(12),
    textAlign: 'center',
    fontFamily:'Inter-Medium'
  },
});
