import React from 'react';
import { View } from 'react-native';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { styles } from './styles';
import { formatCategoryData } from '../../../utils/dataFormatters';

const GetCategory = ({ selectedIndex,setSelectedIndex,categories}) => {
  const formattedCategories = formatCategoryData(categories);

  return (
    <>
    <View style={styles.categories}>
    <CustomCategoryList
        data={formattedCategories}
        horizontal
        selected={selectedIndex}
        onSelect={setSelectedIndex}
        bgColor="#D4E7F2"
        width={52}
        height={52}
        borderRadius={32}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={styles.textStyle}
        imageSize={38}
        showsHorizontalScrollIndicator={false}
        imageStyle={styles.imageStyle}
      /> 
    </View>
    </>
  );
};

export default GetCategory;
