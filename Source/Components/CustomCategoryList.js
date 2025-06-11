import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, FontSize, Height, Width } from '../constants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const CustomCategoryList = ({
  data = [],
  selected,
  onSelect = () => {},
  bgColor = '#F1FFF0',
  width = Width(90),
  height = Height(110),
  imageSize = Width(50),
  borderRadius = Width(20),
  selectedBorderColor = '#30A46C',
  textColor = COLORS.text,
  containerStyle,
  textStyle,
  horizontal,
  numColumns = 1,
  gap = Width(16),
  navigation,
  contentContainerStyle,
  imageStyle,
  colors,
  gotoScreen
}) => {
  return (
    <View style={[containerStyle]}>
      <FlatList
        nestedScrollEnabled
        numColumns={numColumns}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.name}
        contentContainerStyle={[
          { paddingHorizontal: Width(14), gap },
          contentContainerStyle,
        ]}
        renderItem={({ item }) => {
          const isSelected = selected === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
  onPress={() => {
  onSelect(item?.id); // Keep your selection logic if needed
  
  if (!navigation) return; // Early exit if no navigation
  
  // Determine navigation parameters based on gotoScreen
  const navigateConfig = gotoScreen === 'ProductDetails' 
    ? { 
        name: 'ProductDetails',
        params: { productId: item._id } 
      }
    : {
        name: gotoScreen || 'Products',
        params: { 
          selectedCategory: item.id, 
          categoryData: item 
        }
      };

  navigation.navigate(navigateConfig.name, navigateConfig.params);
}}
              style={[
                styles.categoryContainer,
                {
                  marginRight: gap,
                },
              ]}
            >
             
              <LinearGradient
               colors={isSelected ? (colors || ['#FFFFFF', '#FFFFFF']) : [ '#FFFFFF', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.shadowBox,
                  {
                    width: item.name === 'All' ? Width(50) : width,
                    height: item.name === 'All' ? Height(60) : height,
                    borderRadius: borderRadius,
                    borderWidth: 0,
                  
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <FastImage
                    source={
                      typeof item.image === 'string'
                        ? { uri: item.image }
                        : item.image
                    }
                    style={[
                      styles.categoryImage,
                      {
                        width: imageSize,
                        height: imageSize,
                        ...imageStyle,
                      },
                    ]}
                    resizeMode="cover"
                  />
                </View>
              </LinearGradient>

              <Text
                style={[
                  styles.categoryText,
                  textStyle,
                  {
                    color: isSelected ? COLORS.green : textColor,
                    marginTop: Height(8),
                    fontWeight: isSelected ? '600' : '500',
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
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
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: FontSize(14),
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    maxWidth: Width(90),
  },
  shadowBox: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  imageContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Width(12),
    padding: Width(6),
  },
  categoryImage: {
    borderRadius: Width(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});