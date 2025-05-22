import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FontSize, Height, Width } from '../../constants/constants';
import CustomSearch from '../../Components/CustomSearch';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import CustomOfferCard from '../../Components/CustomOfferCard';
import offerData from '../../Mock/Data/offerData';
import Ionicons from 'react-native-vector-icons/Ionicons';                 
import ClosesCalled from '../../Components/closesCalled';
import ClosestProductsData from '../../Mock/Data/closestProductData';
import ProductCategories from '../../otherComponents/home/productCategories';

const Categories = ({ navigation }) => {
 const [selectFashion,setSelectedFashion] = useState('')
   const [selectBeauty,setSelectedBeauty] = useState('')
   const [selectElectronics,setSelectedElectronics] = useState('')
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.inner}>
      <View>

{/* Location and Profile */}
      <View style={styles.main}>
        <View style={styles.innerView}>
          <Image re style={{ height: Height(16), width: Width(16) }} source={require('../../../assets/Icons/location_on-2.png')} />
        <Text style={{ fontSize: FontSize(13.5) , marginHorizontal:10,fontFamily:'Inter-Regular'}}>
          Deliver to{' '}
          <Text style={{ fontFamily: 'Inter-SemiBold'}}>
            Maruti Apartments-Del..
          </Text>
        </Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image  style={{ height: Height(27), width: Width(27),resizeMode:"cover" }} source={require('../../../assets/Icons/ProfileIcon.png')} />
          </Pressable>
        </View>
      </View>

      {/* Search + Icons */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, paddingVertical: 8, justifyContent: 'space-between',marginTop:Height(7) }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Pressable onPress={()=>navigation.navigate('Search')}>
          <CustomSearch WidthSize={'98%'} backgroundColor={'#fff'}  disabled/>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={() => navigation.navigate('Wishlist')}>
         <Ionicons
            name={'heart-outline'}
            size={20}
            color={'#0E2D42'}
            style={{right:Height(7)}}
          />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Orders')}>
            <Image style={{ width: Width(17), height: Height(17),right:Height(2) }} source={require('../../../assets/Icons/shopping_cart.png')} />
          </Pressable>
        </View>
      </View>
   <View key="line" style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2',marginTop:10 }} />,
       
      <ProductCategories selectFashion={selectFashion} setSelectedFashion={setSelectedFashion} selectBeauty={selectBeauty} setSelectedBeauty={setSelectedBeauty} selectElectronics={selectElectronics} setSelectedElectronics={setSelectedElectronics}/>

       <ClosesCalled key={"slider"} data={ClosestProductsData}/> 
     <View key="deals" style={{ marginTop: 40 }}>
       <Text style={[styles.textStyle,{marginHorizontal:Height(13)}]}>HOT DEALS <Image style={{height:14,width:14}} source={require('../../../assets/Icons/local_fire_department.png')}/> JUST FOR YOU..</Text>
       <CustomOfferCard item={offerData} />
     </View> 
      <View style={{ backgroundColor: "#F0F4F8" }} >
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <Text style={{ top: 20, fontSize: 15, fontFamily:'Inter-SemiBold',marginLeft:20}} >Style That Doesn’t Clock Out</Text>
       <Image style={{height:20,width:20,top:20,marginHorizontal:6}} source={require('../../../assets/Icons/av_timer.png')}/>
       </View>
     </View>
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  inner:{
    flex:1,backgroundColor:"#fff"
  },
   main:{
    flexDirection: 'row', alignItems: 'center', columnGap: Width(10),justifyContent:"space-between",paddingHorizontal:Width(10) ,
    marginTop:Height(20)
  },
   innerView:{
    flexDirection:"row",
    alignItems:"center"
  },
   textStyle:{
    fontSize: 15,
    fontFamily:"Inter-SemiBold",
  },
});
