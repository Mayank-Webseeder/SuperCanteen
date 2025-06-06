import {  Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearchInput from '../../../Components/searchInput';
import {  COLORS, Height, Width } from '../../../constants';
import CustomCasual from '../../../Components/CustomCasual';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import CustomProductCard from '../../../Components/productCard';
import FashionCatogory from '../../../Mock/Data/FashionCatogory';
import FashionData from '../../../Mock/Data/FashionData';
import CustomOfferCard from '../../../Components/offerCard';
import OccationData from '../../../Mock/Data/OccationData';
import HorizontalLine from '../../../otherComponents/home/horizontalLine';
import ClosesCalled from '../../../Components/home/closesCalled/closesCalled';
import ClosestProductsData from '../../../Mock/Data/closestProductData';
import ProducsData from '../../../Mock/Data/productsData';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsBySubcategory } from '../../../redux/slices/subCategoryProductSlice';
import {formatProductData} from '../../../utils/dataFormatters'



const allDataSources = {
  fashionData: FashionData,
  productsData: ProducsData,
  closestProducts: ClosestProductsData,
  occasionData: OccationData,
  fashionCategory: FashionCatogory
};

const ProductsScreen = ({ navigation , route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
   const { productsBySubcategory, loading } = useSelector(state => state.subCategoryProducts);
   const { selectedCategory, categoryData } = route?.params || {};
   const dispatch = useDispatch() 
  const currentProducts = formatProductData(
  selectedCategory ? productsBySubcategory[selectedCategory] || [] : []
);

    useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsBySubcategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);


   const [currentCategory, setCurrentCategory] = useState(
    selectedCategory || null
  );

  const Sliders = [
  {
    id: categoryData.id,
    image: { uri: categoryData.image }
  }
];

  useEffect(() => {
    if (selectedCategory && !currentCategory) {
      setCurrentCategory(selectedCategory);
    }
  }, [selectedCategory]);
  

  useEffect(() => {
    if (searchQuery.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = {};
      
      Object.keys(allDataSources).forEach(key => {
        const data = allDataSources[key];
        if (Array.isArray(data)) {
          results[key] = data.filter(item => 
            item.name?.toLowerCase().includes(lowerCaseQuery) || 
            item.title?.toLowerCase().includes(lowerCaseQuery) ||
            item.label?.toLowerCase().includes(lowerCaseQuery)
          );
        }
      });
      
      setSearchResults(results);
      setIsSearchActive(true);
    } else {
      setSearchResults(null);
      setIsSearchActive(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setIsSearchActive(true);
    }
  };

  const handleSearchBlur = () => {
    if (searchQuery.length === 0) {
      setIsSearchActive(false);
    }
  };


    if (loading) {
    return (
      <View style={styles.loadingContainer} >
        <ActivityIndicator size="large" color={COLORS.green} />
      </View>
    );
  }


return (
  <View style={styles.container}>
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          <View style={styles.headerView}>
          <CustomHeader  showRightIcons navigation={navigation} label={categoryData?.name} />
          </View>
          <View style={styles.searchContainer}>
            <CustomSearchInput 
              WidthSize={Width(320)} 
              onChangeText={handleSearchChange}
              value={searchQuery}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
          </View>

          {!isSearchActive ? (
            <>
              <View style={styles.mainView}>
                  <View style={styles.sectionSpacing}>
                <CustomCasual cardStyle={styles.cardStyle} data={Sliders} borderWidth={0} cardRadius={Height(15)} resizeMode={"cover"} />
              </View>
              <View style={styles.sectionSpacing}>
                <CustomCategoryList
                  horizontal
                  borderRadius={5}
                  width={Width(75)}
                  height={Height(55)}
                  data={FashionCatogory}
                  bgColor="#DBE4E7"
                  navigation={navigation}
                  imageSize={Width(50)}
                  contentContainerStyle={styles.contentContainerStyle}
                />
              </View>
              </View>
              <HorizontalLine/>
              <View style={styles.mainView}>
                <View style={styles.cardContainer}>
                  {currentProducts.length > 0 ? (
              <CustomProductCard
                bgColor="#D4DEF226"
                numColumns={3}
                width={Width(95)}
                height={Height(105)}
                horizontal={false}
                data={currentProducts}
                imageSize={100}
                gap={20}
                navigation={navigation}
                borderRadius={Height(4)}
              />
            ) : (
             <></>
            )}
                </View>
                <ClosesCalled navigation={navigation} key={"slider"} data={ClosestProductsData} containerStyle={styles.containerStyle} listContentStyle={styles.listContentStyle}/> 
                {/* <View style={styles.marginTop}>
                  <CustomProductCard
                    bgColor="#D4DEF226"
                    numColumns={3}
                    width={Width(95)}
                    height={Height(105)}
                    horizontal={false}
                    data={ProducsData}
                    imageSize={100}
                    gap={20}
                    navigation={navigation}
                    borderRadius={Height(4)}
                    containerStyle={{paddingVertical:Height(1)}}
                    selected={selectedItem}
                    onSelect={(index) => setSelectedItem(index)}
                  />
                </View> */}
              </View>
              <View style={styles.offerCardContainer} >
                <View style={styles.rowContainer}>
                  <Text style={styles.textStyle} >SHOP BY OCASSION</Text>
                  <FastImage style={styles.imageStyle} source={require('../../../../assets/Icons/av_timer.png')}/>
                </View>
                <CustomOfferCard
                  enableBadg={false}
                  enablePriceRow={false}
                  item={OccationData}
                  navigation={navigation}
                />
              </View>
            </>
          ) : (
            <View style={styles.searchResultsContainer}>
              {searchResults && Object.keys(searchResults).map(key => (
                searchResults[key].length > 0 && (
                  <View key={key} style={styles.searchResultSection}>
                    <Text style={styles.searchSectionTitle}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Text>
                   {currentProducts.length > 0 ? (
              <CustomProductCard
                bgColor="#D4DEF226"
                numColumns={3}
                width={Width(95)}
                height={Height(105)}
                horizontal={false}
                data={currentProducts}
                imageSize={100}
                gap={20}
                navigation={navigation}
                borderRadius={Height(4)}
              />
            ) : (
              <View >
                <Text>No products found in this category</Text>
              </View>
            )}
                  </View>
                )
              ))}
              {searchResults && Object.values(searchResults).every(arr => arr.length === 0) && (
                <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
              )}
            </View>
          )}
        </View>
      }
      showsVerticalScrollIndicator={false}
    /> 
  </View>
);

};

export default ProductsScreen;