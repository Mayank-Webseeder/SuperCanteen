import React, { useMemo } from 'react';
import { View } from 'react-native';
import HeaderRow from '../headerRow';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { FontSize, Height, Width } from '../../../constants';
import { IMG_URL } from '../../../api';
import { formatSubcategoryData } from '../../../utils/dataFormatters';
import { useSelector } from 'react-redux';
import ContentSkeletonLoader from '@components/Common/contentSkeletonLoader';
import ErrorView from '@components/Common/errorView';

export default function ProductCategories({
  navigation,
  subcategories = [],
  selectedCategoryId,
  selectedCategoryItems = {},
  setSelectedCategoryItems = () => {},  // default no-op function for safety
  containerStyle,
  gotoScreen
}) {
  const { categories } = useSelector((state) => state.category);
  const { loading: subCategoriesLoading, error: subCategoriesError } = useSelector((state) => state.subCategory);

  // Format subcategories
  const formattedSubcategories = useMemo(() => formatSubcategoryData(subcategories), [subcategories]);

  // Find current category and format it
  const currentCategoryData = categories.find(cat => cat._id === selectedCategoryId);
  const formattedCurrentCategoryData = currentCategoryData
    ? {
        ...currentCategoryData,
        image: `${IMG_URL}${currentCategoryData.image}`,
      }
    : null;

  // If no subcategories to show
  if (!subcategories.length && !subCategoriesLoading && !subCategoriesError) {
    return null;
  }



  return (
    <View style={{ marginTop: Height(2) }}>
      {subCategoriesError ? (
        <ErrorView 
          message={subCategoriesError}
          onRetry={() => {}} // You can optionally pass handleRefresh here
          containerStyle={{ marginVertical: Height(20) }}
        />
      ) : subCategoriesLoading ? (
        <ContentSkeletonLoader
          type="category"
          itemCount={3}
        />
      ) : (
        <>
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
            textStyle={{ fontSize: FontSize(13), marginBottom: Height(6) }}
            containerStyle={{ paddingTop: Height(8), marginHorizontal: containerStyle ? containerStyle :  Width(12) }}
            gap={Width(13)}
            imageSize={Height(70)}
            selected={selectedCategoryItems[selectedCategoryId] || ''}
            onSelect={(name) =>
              setSelectedCategoryItems((prev) => ({
                ...prev,
                [selectedCategoryId]: name,
              }))
            }
            gotoScreen={gotoScreen}
          />
        </>
      )}
    </View>
  );
}
