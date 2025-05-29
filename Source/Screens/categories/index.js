import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {Height } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCategories from '../../otherComponents/home/productCategories';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import Header from '../../otherComponents/home/header';

const Categories = ({ navigation }) => {
   const [selectFashion,setSelectedFashion] = useState('')
   const [selectBeauty,setSelectedBeauty] = useState('')
   const [selectElectronics,setSelectedElectronics] = useState('')
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle} showsVerticalScrollIndicator={false} style={styles.inner}>
      <View>

<Header navigation={navigation}/>
      <HorizontalLine/>       
      <ProductCategories navigation={navigation} selectFashion={selectFashion} setSelectedFashion={setSelectedFashion} selectBeauty={selectBeauty} setSelectedBeauty={setSelectedBeauty} selectElectronics={selectElectronics} setSelectedElectronics={setSelectedElectronics}/>
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
  }
});
