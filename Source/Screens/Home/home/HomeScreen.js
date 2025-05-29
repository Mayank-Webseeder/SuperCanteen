import { Text, View, FlatList } from 'react-native';
import React , {useState} from 'react';
import { FontSize, Height, Width } from '../../../constants/constants';
import CustomCategoryList from '../../../Components/customCategoryList';
import CustomCasual from '../../../Components/customCasual';
import categories from '../../../Mock/Data/categories';
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

const Sliders = [
  { id: 1, image: require('../../../../assets/Sliders/Slider1.png') },
  { id: 2, image: require('../../../../assets/Sliders/Slider1.png') },
  { id: 3, image: require('../../../../assets/Sliders/Slider1.png') },
  { id: 4, image: require('../../../../assets/Sliders/Slider1.png') },
  { id: 5, image: require('../../../../assets/Sliders/Slider1.png') },
  { id: 6, image: require('../../../../assets/Sliders/Slider1.png') },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectFashion,setSelectedFashion] = useState('')
  const [selectBeauty,setSelectedBeauty] = useState('')
  const [selectElectronics,setSelectedElectronics] = useState('')
   const [selectedWomenCategory, setSelectedWomenCategory] = useState('');
  const renderSection = ({ item }) => item;

  const sections = [
    <View style={styles.container}>
    <LinearGradient
  colors={['#A3B9C3', '#FFFFFF']} 
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
  style={styles.gradient}>
  <Header navigation={navigation}/>
   <View style={styles.categories} >
      <CustomCategoryList
        key="categories"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        bgColor="#D4E7F2"
        width={Width(48)}
        height={Width(48)}
        borderRadius={Width(32)}
        selectedBorderColor="#008ECC"
        textColor="#333"
        textStyle={{ fontSize: FontSize(13),fontFamily:"Inter-Medium" }}
        imageSize={Height(38)}
        selected={selectedCategory}
       onSelect={(name) => setSelectedCategory(name)}
       navigation={navigation}
      />
    </View>
    </LinearGradient>
    <HorizontalLine/>
    <CustomCasual cardRadius={Height(0.5)} key="casual"  paddingHorizontal={10} data={Sliders} />
    <ProductCategories navigation={navigation} selectFashion={selectFashion} setSelectedFashion={setSelectedFashion} selectBeauty={selectBeauty} setSelectedBeauty={setSelectedBeauty} selectElectronics={selectElectronics} setSelectedElectronics={setSelectedElectronics}/>
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


