import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Height, Width } from '../../constants';
import CustomSearch from '../searchInput';
import CustomCategoryList from '../CustomCategoryList';
import HeaderRow from '../../otherComponents/home/headerRow';
import { BackArrow } from '../../../assets/Icons/svgIcons/arrow_back';
import Fashion from '../../Mock/Data/Fashion';
import BeautyData from '../../Mock/Data/BeautyData';
import ElectronicsHome from '../../Mock/Data/ElectronicsHome';
import { styles } from './styles';

const SearchScreen = ({ navigation }) => {
  const [selectFashion, setSelectedFashion] = useState('');
  const [selectBeauty, setSelectedBeauty] = useState('');
  const [selectElectronics, setSelectedElectronics] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filterData = (data) => {
    if (!searchQuery) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredFashion = filterData(Fashion);
  const filteredBeauty = filterData(BeautyData);
  const filteredElectronics = filterData(ElectronicsHome);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Check if all categories are empty
  const noDataFound = searchQuery && 
    filteredFashion.length === 0 && 
    filteredBeauty.length === 0 && 
    filteredElectronics.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack('')} style={styles.iconStyle}>
          <BackArrow/>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <CustomSearch 
            showCrossIcon={true}
            onChangeText={handleSearchChange}
            value={searchQuery}
            onCrossPress={clearSearch}
          />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {noDataFound ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>
        ) : (
          <>
            {filteredFashion.length > 0 && (
              <View key="fashion">
                <HeaderRow 
                  containerStyle={{marginHorizontal: Height(15)}} 
                  title={'Fashion'} 
                  navigation={navigation}
                />
                <CustomCategoryList
                  data={filteredFashion}
                  horizontal={false}
                  numColumns={3}
                  bgColor="#D4DEF226"
                  width={Width(95)}
                  height={Height(105)}
                  borderRadius={Width(5)}
                  selectedBorderColor="#008ECC"
                  textColor="#333"
                  textStyle={styles.textStyle}
                  containerStyle={styles.containerView}
                  gap={Width(20)}
                  imageSize={Height(65)}
                  selected={selectFashion}
                  onSelect={(name) => setSelectedFashion(name)}
                  navigation={navigation}
                />
              </View>
            )}
           
            {filteredBeauty.length > 0 && (
              <View key="beauty" >
                <HeaderRow title={'Beauty & Wellness'} navigation={navigation}/>
                <CustomCategoryList
                  data={filteredBeauty}
                  horizontal={false}
                  numColumns={3}
                  bgColor="#D4DEF226"
                  width={Width(90)}
                  height={Height(105)}
                  borderRadius={Width(5)}
                  selectedBorderColor="#008ECC"
                  textColor="#333"
                  textStyle={styles.textStyle}
                  containerStyle={styles.mainStyle}
                  gap={Width(20)}
                  imageSize={Height(70)}
                  selected={selectBeauty}
                  onSelect={(name) => setSelectedBeauty(name)}
                  navigation={navigation}
                />
              </View>
            )}
           
            {filteredElectronics.length > 0 && (
              <View key="electronics" >
                <HeaderRow title={'Electronics & Home Essentials'} navigation={navigation}/>
                <CustomCategoryList
                  data={filteredElectronics}
                  horizontal={false}
                  numColumns={3}
                  bgColor="#D4DEF226"
                  width={Width(90)}
                  height={Height(105)}
                  borderRadius={Width(5)}
                  selectedBorderColor="#008ECC"
                  textColor="#333"
                  textStyle={styles.textStyle}
                  containerStyle={styles.section}
                  gap={Width(20)}
                  imageSize={Height(70)}
                  selected={selectElectronics}
                  onSelect={(name) => setSelectedElectronics(name)}
                  navigation={navigation}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};



export default SearchScreen;