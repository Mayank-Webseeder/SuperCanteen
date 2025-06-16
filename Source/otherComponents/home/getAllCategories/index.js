import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { styles } from './styles';
import { formatCategoryData } from '../../../utils/dataFormatters';
import { COLORS, Height } from '@constants/index';


const GetCategory = ({ selectedIndex, setSelectedIndex, categories, navigation }) => {
  if (!categories) {
    return (
      <View style={styles.categories}>
        <ActivityIndicator size="small" color={COLORS.green} />
      </View>
    );
  }

  if (categories.length === 0) {
    return <View style={styles.categories} />;
  }

  const formattedCategories = formatCategoryData(categories).slice(0, 7);

  // Add "AllIcons" as the last fake category item
  const modifiedCategories = [
    ...formattedCategories,
    {
      _id: 'all-icons',
      name: 'All',
      icon: require('../../../../assets/Icons/AlIcons.png'),
      isAllIcon: true,
    },
  ];

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Top Categories</Text>
        </View>
      </View>

      <CustomCategoryList
  data={modifiedCategories}
  horizontal
  selected={selectedIndex}
  onSelect={(id) => {
    if (id === 'all-icons') {
      navigation.navigate('Main', { screen: 'Categories' });
    } else {
      setSelectedIndex(id);
    }
  }}
  bgColor="#D4E7F2"
  width={49}
  height={49}
  borderRadius={32}
  textColor="#333"
  textStyle={styles.textStyle}
  imageSize={36}
  showsHorizontalScrollIndicator={false}
  imageStyle={styles.imageStyle}
  colors={['#30A46C', '#5BD18B']}
  contentContainerStyle={styles.contentContainerStyle}
  categoryContainerStyle={{ marginRight: Height(6) }}
  imageContainerStyle={{ backgroundColor: 'transparent' }}
/>
    </View>
  );
};

export default GetCategory;
