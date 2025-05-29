import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../Components/customHeader';
import CustomSearchInput from '../../Components/customSearch';
import { COLORS, Height, Width } from '../../constants/constants';
import CustomCasual from '../../Components/customCasual';
import CustomCategoryList from '../../Components/customCategoryList';
import CustomProductCard from '../../Components/customProductCard';
import FashionCatogory from '../../Mock/Data/FashionCatogory';
import FashionData from '../../Mock/Data/FashionData';
import CustomOfferCard from '../../Components/customOfferCard';
import OccationData from '../../Mock/Data/OccationData';
import HorizontalLine from '../../otherComponents/home/horizontalLine';
import ClosesCalled from '../../Components/home/closesCalled/closesCalled';
import ClosestProductsData from '../../Mock/Data/closestProductData';
import ProducsData from '../../Mock/Data/productsData';
import { Image } from 'react-native-svg';

const Sliders = [
  { id: 1, image: require('../../../assets/Sliders/banner.png') },
  { id: 2, image: require('../../../assets/Sliders/banner.png') },
  { id: 3, image: require('../../../assets/Sliders/banner.png') },
];

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
  const { title } = route?.params;

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

return (
  <View style={styles.container}>
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          <View style={{marginHorizontal:10}}>
          <CustomHeader  showRightIcons navigation={navigation} label={title ? title : "Fashion"} />
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
                <CustomCasual data={Sliders} borderWidth={0} cardRadius={Height(15)} resizeMode={"cover"} />
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
                  contentContainerStyle={{paddingHorizontal:Height(4)}}
                />
              </View>
              </View>
              <HorizontalLine/>
              <View style={styles.mainView}>
                <View style={{marginTop:10}}>
                  <CustomProductCard
                    bgColor="#D4DEF226"
                    numColumns={3}
                    width={Width(95)}
                    height={Height(105)}
                    horizontal={false}
                    data={FashionData}
                    imageSize={100}
                    gap={20}
                    navigation={navigation}
                    borderRadius={Height(4)}
                  />
                </View>
                <ClosesCalled navigation={navigation} key={"slider"} data={ClosestProductsData} containerStyle={{marginTop:Height(-8)}}/> 
                <View style={{ marginTop: 20 }}>
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
                  />
                </View>
              </View>
              <View style={{ backgroundColor: "#F0F4F8",paddingBottom:Height(10) }} >
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <Text style={{ top: 20, fontSize: 15, fontFamily:'Inter-Bold',marginLeft:20,marginv:Height(10)}} >SHOP BY OCASSION</Text>
                  <Image style={{height:20,width:20,top:20,marginHorizontal:6}} source={require('../../../assets/Icons/av_timer.png')}/>
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
                    <CustomProductCard
                      bgColor="#D4DEF226"
                      numColumns={3}
                      width={Width(95)}
                      height={Height(105)}
                      horizontal={false}
                      data={searchResults[key]}
                      imageSize={100}
                      gap={20}
                      navigation={navigation}
                      borderRadius={Height(4)}
                    />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Height(8)
  },
  mainView: {
    paddingHorizontal: Height(13),
    
  },
  searchContainer: {
    marginTop: Height(5),
    alignItems: 'center',
  },
  sectionSpacing: {
    marginTop: 10,
    marginBottom: Height(5),
  },
  searchResultsContainer: {
    padding: 10,
    minHeight: Height(200),
    paddingHorizontal:Height(20),
    marginTop:Height(10)
  },
  searchResultSection: {
    // marginBottom: 20,
  },
  searchSectionTitle: {
    fontSize: 18,
    fontFamily:'Inter-Bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default ProductsScreen;