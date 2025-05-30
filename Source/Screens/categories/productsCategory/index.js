import { Pressable, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../../../Components/CustomHeader';
import CustomSearchInput from '../../../Components/searchInput';
import CustomCategoryList from '../../../Components/CustomCategoryList';
import Products from '../../../Mock/Data/Prodcuts';
import CustomProductCard from '../../../Components/productCard';
import { COLORS, Height, Width } from '../../../constants';
import CustomBottomSheet from '../../../Components/modals/bottomSheet';
import CustomFilterBtn from '../../../Components/CustomFilterBtn';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WatchStoreData from '../../../Mock/Data/WatchStoreData';
import SortBottomSheet from '../../../Components/modals/sortBottomsheet';
import { FlatList } from 'react-native';
import SponsordSection from '../../../otherComponents/home/sponsord';
import { styles } from '../product/styles';

const ProdcutCategory = ({ navigation }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [searchText, setSearchText] = useState(''); // Search/filter state
  const [filteredProducts, setFilteredProducts] = useState(Products);
  
  // Filter products based on searchText
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(Products);
    } else {
      const filtered = Products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchText]);

  return (
    <FlatList
      data={[]} // No list data, just header scroll
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={[styles.main,{backgroundColor : sortSheetVisible ? COLORS.modal : COLORS.white}]}>
          <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation} label={'Watch Store'} />
            <View style={styles.serachView} />
            {/* Pass setSearchText to CustomSearchInput so it updates searchText */}
            <CustomSearchInput
              // value={searchText}
              // onChangeText={setSearchText}
              placeholder="Search products..."
            />
            <View style={styles.categoryList}>
              <CustomCategoryList
                height={50}
                width={62}
                gap={15}
                horizontal={true}
                borderRadius={5}
                data={WatchStoreData}
              />
            </View>

            <View style={styles.bottomSheetContainer}>
              <SortBottomSheet visible={sortSheetVisible} onClose={() => setSortSheetVisible(false)} />
              <CustomFilterBtn
                title="Filter"
                width={80}
                height={30}
                onPress={() => setShowSheet(true)}
                icon={<Icon name="filter-list" size={20} color="#1C1B1F7D" />}
              />
              <CustomFilterBtn
                title="Sort"
                width={80}
                height={30}
                onPress={() => setSortSheetVisible(true)}
                icon={
                  <View style={{ transform: [{ rotate: '270deg' }] }}>
                    <Icon name="sync-alt" size={20} color="#1C1B1F7D" />
                  </View>
                }
              />
            </View>

            <CustomBottomSheet visible={showSheet} onClose={() => setShowSheet(false)}>
              <CustomFilterBtn onPress={() => console.log('Filter pressed')} label="Filter Options" />
              {/* You can add more filter options here to update filtering state */}
            </CustomBottomSheet>

            <View style={styles.mainContainer}>
              <Pressable>
                <CustomProductCard
                  height={Height(120)}
                  imageSize={Width(130)}
                  navigation={navigation}
                  bgColor="#D4DEF226"
                  numColumns={2}
                  width={Width(140)}
                  horizontal={false}
                  data={filteredProducts} // use filtered data here
                />
              </Pressable>
            </View>
          </View>
         <SponsordSection navigation={navigation} searchText={searchText} />
          <View style={styles.mianView}>
            <Pressable>
              <CustomProductCard
                height={Height(120)}
                imageSize={Width(130)}
                navigation={navigation}
                bgColor="#D4DEF226"
                numColumns={2}
                width={Width(140)}
                horizontal={false}
                data={filteredProducts} // Also filter here if needed
              />
            </Pressable>
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ProdcutCategory;