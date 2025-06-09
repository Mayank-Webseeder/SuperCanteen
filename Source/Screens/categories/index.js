import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {COLORS, FontSize, Height, Width } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import Header from '../../otherComponents/home/header';
import CustomCategoryList from '@components/CustomCategoryList';
import { useSelector } from 'react-redux';
import { formatCategoryData } from '../../utils/dataFormatters';

const Categories = ({ navigation }) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
    const { categories, loading: categoriesLoading } = useSelector((state) => state.category);
    const formattedCategories = formatCategoryData(categories);

  useEffect(() => {
    if (!categoriesLoading && categories?.length > 0) {
      if (selectedCategoryIndex == null) {
        setSelectedCategoryIndex(categories[0]._id);
      }
    }
  }, [categoriesLoading, categories]);


  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} showsVerticalScrollIndicator={false} style={styles.inner}>
      <View>
      
      <Header navigation={navigation}/>
      <HorizontalLine/>    
        {categoriesLoading &&   <ActivityIndicator size="large" color={COLORS.green} style={{ marginVertical: Height(22) }} />
        }
        <CustomCategoryList
        navigation={navigation}
        data={formattedCategories}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(90)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={styles.textStyle}
        containerStyle={styles.containerStyle}
        gap={Width(20)}
        imageSize={Height(70)}
        selected={selectedCategoryIndex}
        onSelect={setSelectedCategoryIndex}
       
      
      />
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  inner:{
    flex:1,backgroundColor:"#fff"
  },
  contentContainerStyle:{
    paddingBottom:Height(40)
  },
  containerStyle:{
paddingTop: Height(20), marginHorizontal: Width(12)
  },
  textStyle:{
    fontSize: FontSize(13), marginBottom: Height(12)
  }
});
