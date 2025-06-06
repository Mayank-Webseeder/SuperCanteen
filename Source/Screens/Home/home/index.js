import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import React , { useEffect, useMemo, useState} from 'react';
import { FontSize, Height, Width } from "@constants";
import CustomCategoryList from '../../../Components/CustomCategoryList';
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import ClosestProductsData from '../../../Mock/Data/closestProductData';
import ProductCategories from '../../../otherComponents/home/productCategories';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import WatchHome from '../../../Mock/Data/WomenHome';
import HeaderRow from '../../../otherComponents/home/headerRow';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../otherComponents/home/header';
import { styles } from './styles';
import HotDealsSection from '../../../otherComponents/home/hotDeals';
import SponsordSection from '../../../otherComponents/home/sponsord'
import GetCategory from '../../../otherComponents/home/getAllCategories';
import Brandcarousel from '../../../otherComponents/home/brandcarousel';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../redux/slices/categorySlice';
import { useDispatch } from 'react-redux';
import { getSubCategories } from '../../../redux/slices/subcategorySlice';
import { COLORS } from '@constants/index';

const HomeScreen = ({ navigation }) => {
   const [selectedWomenCategory, setSelectedWomenCategory] = useState('');
   const [selectedCategoryIndex, setSelectedCategoryIndex] = useState();
   const [selectedCategoryItems,setSelectedCategoryItems] = useState()
   const { categories,loading:categoriesLoading } = useSelector((state) => state.category);
   const {subCategories,loading: subCategoriesLoading} = useSelector((state) => state.subCategory )
   const dispatch = useDispatch();

   console.log("SELECTEDcATEGORYiNDEX IS",selectedCategoryIndex)

   useEffect(() => {
       dispatch(getCategories());
     }, []);
     
 useEffect(() => {
    if (!categoriesLoading && categories?.length > 0) {
      // Only set default if not already set (null or undefined)
      if (selectedCategoryIndex == null) {
        setSelectedCategoryIndex(categories[0]._id);
      }
    }
  }, [categoriesLoading, categories]);

   useEffect(() => {
    dispatch(getSubCategories())
  }, [selectedCategoryIndex]);

    const filteredSubcategories = useMemo(() => {
    return subCategories?.filter(item => item.category?._id === selectedCategoryIndex) || [];
  }, [subCategories, selectedCategoryIndex]);

 
  const renderSection = ({ item }) => item;
  const sections = [
    <View style={styles.container}>
    <LinearGradient
  colors={['#A3B9C3', '#FFFFFF']} 
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={styles.gradient}>
  <Header navigation={navigation}/>
  <GetCategory  
  categories={categories}
  navigation={navigation}
  selectedIndex={selectedCategoryIndex} 
  setSelectedIndex={setSelectedCategoryIndex} />
    </LinearGradient>
    <HorizontalLine/>
    <Brandcarousel />
   {subCategoriesLoading ? (
  <ActivityIndicator size="large" color={COLORS.green} style={{ marginVertical: Height(22) }} />
) : (
  <ProductCategories
    navigation={navigation}
    subcategories={filteredSubcategories} 
    selectedCategoryId={selectedCategoryIndex}
    selectedCategoryItems={selectedCategoryItems}
    setSelectedCategoryItems={setSelectedCategoryItems}
  />
)}

    <ClosesCalled navigation={navigation} key={"slider"} data={ClosestProductsData}/> 
    <HotDealsSection navigation={navigation}/>
    <SponsordSection navigation={navigation}/>
     <View key="women">
      <View style={styles.mainStyle}>
         <HeaderRow title={'For the Woman Who Leads Time'} navigation={navigation}/>
         <Text style={styles.subTitle}>Explore elegant watches crafted for timeless grace.</Text>
      </View>
       <CustomCategoryList
        navigation={navigation}
        data={WatchHome}
        horizontal={false}
        numColumns={3}
        bgColor="#D4DEF226"
        width={Width(90)}
        height={Height(105)}
        borderRadius={Width(5)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={{ fontSize: FontSize(13),marginBottom:Height(12) }}
        containerStyle={{ paddingTop: Height(8),marginHorizontal:Width(12)}}
        gap={Width(20)}
        imageSize={Height(70)}
        selected={selectedWomenCategory}
        onSelect={(name) => setSelectedWomenCategory(name)}   
      />
    </View>
    </View>
  ];

  return (
    <FlatList
      data={sections}
      renderItem={renderSection}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;


