import { View, Text } from 'react-native'
import React from 'react'
import HeaderRow from '../headerRow'
import CustomCategoryList from '../../../Components/CustomCategoryList'
import Fashion from '../../../Mock/Data/Fashion'
import { FontSize, Height, Width } from '../../../constants/constants'
import BeautyData from '../../../Mock/Data/BeautyData'
import ElectronicsHome from '../../../Mock/Data/ElectronicsHome'

export default function ProductCategories(props) {
  return (
   <>
         <View key="fashion">
      <HeaderRow title={'Fashion'} navigation={props.navigation}/>
       <CustomCategoryList
        data={Fashion}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(95)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={{ fontSize: FontSize(13),marginBottom:Height(12) }}
        containerStyle={{ paddingTop: Height(8),marginHorizontal:Width(12)}}
        gap={Width(20)}
        imageSize={Height(80)}
        selected={props.selectFashion}
        onSelect={(name) => props.setSelectedFashion(name)}
       
      />
      
    </View>

   <View key="beauty">
        <HeaderRow title={'Beauty & Wellness'} navigation={props.navigation}/>
       <CustomCategoryList
       data={BeautyData}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(90)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={{ fontSize: FontSize(13),marginBottom:Height(12) }}
        containerStyle={{ paddingTop: Height(13),marginHorizontal:Height(12)}}
        gap={Width(20)}
        imageSize={Height(70)}
         selected={props.selectBeauty}
        onSelect={(name) => props.setSelectedBeauty(name)}
      />
      
    </View>

       <View key="electronics">
        <HeaderRow title={'Electronics & Home Essentials'} navigation={props.navigation}/>
       <CustomCategoryList
        data={ElectronicsHome}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(90)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
       textStyle={{ fontSize: FontSize(13),marginBottom:Height(12) }}
         containerStyle={{ paddingTop: Height(13),marginHorizontal:Height(13)}}
        gap={Width(20)}
        imageSize={Height(70)}
         selected={props.selectElectronics}
        onSelect={(name) => props.setSelectedElectronics(name)}
      />
     
    </View> 

   </>
  )
}