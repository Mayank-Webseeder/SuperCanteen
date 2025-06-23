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
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomCategoryList = ({
  data = [],
  selected,
  onSelect = () => {},
  width = Width(90),
  height = Height(110),
  imageSize = Width(50),
  borderRadius = Width(20),
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
  gotoScreen,
  categoryContainerStyle,
  imageContainerStyle,
}) => {
  return (
    <View style={[containerStyle]}>
      <FlatList
        nestedScrollEnabled
        numColumns={numColumns}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item._id || item.name}
        contentContainerStyle={[
          { paddingBottom: 0, gap ,paddingHorizontal:Height(15) },
          contentContainerStyle,
        ]}
        renderItem={({ item }) => {
          const isSelected = selected === item.id;
          
        //  Render "All" icon with text
          if (item.isAllIcon) {
            const allIsSelected = selected === item._id;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSelect(item._id)}
                style={[
                  styles.categoryContainer,
                  { marginRight: gap },
                  categoryContainerStyle,
                ]}
              >
                <View style={[styles.allIconCircle]}>
                  <Icon name="category" size={Width(18)} color="#FFFFFF" />
                </View>
                {/* Add Text component here */}
                <Text
                  style={[
                    styles.categoryText,
                    textStyle,
                    {
                      color: allIsSelected ? COLORS.green : textColor,
                      marginTop: Height(8),
                      fontWeight: allIsSelected ? '600' : '500',
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  All
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onSelect(item?.id);
                if (!navigation) return;

                const navigateConfig =
                  gotoScreen === 'ProductDetails'
                    ? {
                        name: 'ProductDetails',
                        params: { productId: item._id },
                      }
                    : {
                        name: gotoScreen || 'Products',
                        params: {
                          selectedCategory: item.id,
                          categoryData: item,
                        },
                      };

                navigation.navigate(navigateConfig.name, navigateConfig.params);
              }}
              style={[
                styles.categoryContainer,
                { marginRight: gap },
                categoryContainerStyle,
              ]}
            >
              <LinearGradient
                colors={
                  isSelected ? colors || ['#FFFFFF', '#FFFFFF'] : ['#FFFFFF', '#FFFFFF']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.shadowBox,
                  {
                    width,
                    height,
                    borderRadius,
                    borderWidth: 0,
                  },
                ]}
              >
                <View style={[styles.imageContainer, imageContainerStyle]}>
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
                  {
                    color: isSelected ? COLORS.green : textColor,
                    marginTop: Height(8),
                    fontWeight: isSelected ? '600' : '500',
                  },
                    textStyle,
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
    backgroundColor: 'transparent',
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
  allIconCircle: {
    width: 49,
    height: 49,
    borderRadius: 32,
    backgroundColor: '#4D8F9C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
});