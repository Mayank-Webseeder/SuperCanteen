import React, { useMemo } from 'react';
import { View } from 'react-native';
import HeaderRow from '../headerRow';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { FontSize, Height, Width } from '../../../constants';
import { IMG_URL } from '../../../api';
import { formatSubcategoryData } from '../../../utils/dataFormatters';
import { useSelector } from 'react-redux';

export default function ProductCategories({
  navigation,
  subcategories = [],
  selectedCategoryId,
  selectedCategoryItems = {},
  setSelectedCategoryItems,
}) {
  if (!subcategories.length) return null;
  const { categories } = useSelector((state) => state.category);
  const currentCategoryData = categories.find(cat => cat._id === selectedCategoryId);
  const formattedSubcategories = useMemo(() => formatSubcategoryData(subcategories), [subcategories]); 
  const formattedCurrentCategoryData = currentCategoryData
    ? {
        ...currentCategoryData,
        image: `${IMG_URL}${currentCategoryData.image}`,
      }
    : null;
 
  return (
    <View style={{ marginBottom: Height(5) }}>
      <HeaderRow
   title={subcategories[0]?.category?.name || 'Category'}
  navigation={navigation}
  selectedCategoryId={subcategories[0]?.category?._id}
  categoryData={formattedCurrentCategoryData}
      />
      <CustomCategoryList
        navigation={navigation}
        data={formattedSubcategories}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(90)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={{ fontSize: FontSize(13), marginBottom: Height(12) }}
        containerStyle={{ paddingTop: Height(8), marginHorizontal: Width(12) }}
        gap={Width(20)}
        imageSize={Height(70)}
        selected={selectedCategoryItems[selectedCategoryId] || ''}
        onSelect={(name) =>
          setSelectedCategoryItems((prev) => ({
            ...prev,
            [selectedCategoryId]: name,
          }))
        }
      />
    </View>
  );
}
