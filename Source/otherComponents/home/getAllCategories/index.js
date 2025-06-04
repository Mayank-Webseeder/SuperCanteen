import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getCategories } from '../../../redux/slices/categorySlice';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import { COLORS } from "@constants";
import { formatCategoryData } from '../../../utils/dataFormatters';

const GetCategory = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (loading) return <View style={styles.loadingContainer}><ActivityIndicator color={COLORS.green}  /></View>;
  const formattedCategories = formatCategoryData(categories);

  return (
    <>
    <View style={styles.categories}>
    <CustomCategoryList
        data={formattedCategories}
        horizontal
        selected={selectedIndex}
        onSelect={setSelectedIndex}
        navigation={navigation}
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
