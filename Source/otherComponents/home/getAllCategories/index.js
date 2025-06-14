// GetAllCategories.js
import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { styles } from './styles';
import { formatCategoryData } from '../../../utils/dataFormatters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Height } from '@constants/index';

const GetCategory = ({ selectedIndex, setSelectedIndex, categories, navigation }) => {
  // Handle loading and empty states
  if (!categories) {
    return (
      <View style={styles.categories}>
        <ActivityIndicator size="small" color={COLORS.green} />
      </View>
    );
  }

  if (categories.length === 0) {
    return (
      <View style={styles.categories}>
        {/* <Text style={styles.noDataText}>No categories available</Text> */}
      </View>
    );
  }

  const formattedCategories = formatCategoryData(categories);
  
  return (
    <View style={styles.categories}>
      <View style={styles.categoriesHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Top Categories</Text>
        </View>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Main', { screen: 'Categories' })}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <Icon name="arrow-forward" size={16} color={COLORS.green} />
        </TouchableOpacity>
      </View>

      <CustomCategoryList
        data={formattedCategories.slice(0, 7)}
        horizontal
        selected={selectedIndex}
        onSelect={setSelectedIndex}
        bgColor="#D4E7F2"
        width={49}
        height={49}
        borderRadius={32}
        // selectedBorderColor={COLORS.green}
        textColor="#333"
        textStyle={styles.textStyle}
        imageSize={36}
        showsHorizontalScrollIndicator={false}
        imageStyle={styles.imageStyle}
        colors={['#30A46C', '#5BD18B']}
        contentContainerStyle={styles.contentContainerStyle}
        categoryContainerStyle={{marginRight:Height(6)}}
        imageContainerStyle={{backgroundColor:"transperent"}}
      />
    </View>
  );
};

export default GetCategory;