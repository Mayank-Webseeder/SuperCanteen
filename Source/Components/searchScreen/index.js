import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Height, Width } from '../../constants';
import CustomSearch from '../searchInput';
import CustomCategoryList from '../CustomCategoryList';
import HeaderRow from '../../otherComponents/home/headerRow';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSearchResults,
  clearResults,
  fetchInitialSuggestions,
  addRecentSearch
} from '../../redux/slices/searchSlice';
import { formatCategoryData, formatProductGroupedData } from '../../utils/dataFormatters';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const dispatch = useDispatch();

  const {
    loading,
    results,
    error,
    recentSearches,
    popularSearches,
  } = useSelector(state => state.search);

  const { categories, loading: categoriesLoading } = useSelector((state) => state.category)
  const formattedCategories = formatCategoryData(categories);

  // Debounce logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // Trigger search and store recent term
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchSearchResults(debouncedQuery));
      dispatch(addRecentSearch(debouncedQuery));
      setShowSuggestions(false);
    } else {
      dispatch(clearResults());
      setShowSuggestions(true);
    }
  }, [debouncedQuery, dispatch]);

  // Load initial suggestions on mount
  useEffect(() => {
    dispatch(fetchInitialSuggestions());
  }, [dispatch]);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
    dispatch(clearResults());
    setShowSuggestions(true);
  };

  const handleRecentSearchPress = (searchTerm) => {
    setSearchQuery(searchTerm);
    dispatch(fetchSearchResults(searchTerm));
    dispatch(addRecentSearch(searchTerm));
    setShowSuggestions(false);
  };

  // Group products by category
  const groupProductsByCategory = () => {
    const grouped = {};
    results.forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  };

  const groupedProducts = formatProductGroupedData(groupProductsByCategory())

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconStyle}>
        <Entypo name="chevron-small-left" size={26} color="#1C1B1F" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <CustomSearch
          showCrossIcon={!!searchQuery}
          onChangeText={handleSearchChange}
          value={searchQuery}
          onCrossPress={clearSearch}
          placeholder="Search in SuperCanteen store"
          autoFocus={true}
          containerStyle={styles.searchInput}
          backgroundColor={'#fff'}
          inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2 }}
        />
      </View>
    </View>

    <FlatList
      data={[]} // empty to disable rendering list items
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#008ECC" />
          ) : error ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{error}</Text>
            </View>
          ) : searchQuery && results.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No products found for "{searchQuery}"</Text>
              <Text style={styles.suggestionText}>Try searching for something else</Text>
            </View>
          ) : searchQuery && !showSuggestions ? (
            Object.keys(groupedProducts).map(categoryId => {
              const category = formattedCategories.find(cat => cat.id === categoryId);
              return (
                <View key={categoryId}>
                  <HeaderRow
                    title={category?.name || 'Products'}
                    navigation={navigation}
                    containerStyle={{marginBottom:6,paddingHorizontal:10}}
                  />
                  <CustomCategoryList
                    data={groupedProducts[categoryId]}
                    horizontal={false}
                    numColumns={3}
                    bgColor="#D4DEF226"
                    width={Width(85)}
                    height={Height(85)}
                    borderRadius={Width(5)}
                    selectedBorderColor="#008ECC"
                    textColor="#333"
                    textStyle={styles.textStyle}
                    containerStyle={[styles.containerView,{  paddingHorizontal:Height(20)}]}
                    gap={Width(20)}
                    imageSize={Height(60)}
                    navigation={navigation}
                    gotoScreen={"ProductDetails"}
                  />
                </View>
              );
            })
          ) : (
            <>
              {recentSearches.length > 0 && (
                <View style={styles.suggestionSection}>
                  <View style={styles.sectionHeader}>
                    <Icon name="history" size={20} color="#666" />
                    <Text style={styles.suggestionTitle}>Recent Searches</Text>
                  </View>
                  <View style={styles.suggestionsGrid}>
                    {recentSearches.map((search, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.searchSuggestionItem}
                        onPress={() => handleRecentSearchPress(search)}
                      >
                        <Text style={styles.searchSuggestionText}>{search}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {popularSearches.length > 0 && (
                <View style={styles.suggestionSection}>
                  <View style={styles.sectionHeader}>
                    <Icon name="local-fire-department" size={20} color="#666" />
                    <Text style={styles.suggestionTitle}>Popular Searches</Text>
                  </View>
                  <View style={styles.suggestionsGrid}>
                    {popularSearches.map((term, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.searchSuggestionItem}
                        onPress={() => handleRecentSearchPress(term)}
                      >
                        <Text style={styles.searchSuggestionText}>{term}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <View style={[styles.suggestionSection, { paddingHorizontal: 0 }]}>
                <View style={[styles.sectionHeader, { paddingHorizontal: Height(15) }]}>
                  <Icon name="search" size={20} color="#666" />
                  <Text style={styles.suggestionTitle}>Browse Categories</Text>
                </View>
                <CustomCategoryList
                  data={formattedCategories}
                  horizontal={false}
                  numColumns={4}
                  bgColor="#D4DEF226"
                  width={Width(65)}
                  height={Height(65)}
                  borderRadius={Width(5)}
                  textColor="#333"
                  textStyle={[styles.textStyle,{paddingBottom:19}]}
                  containerStyle={styles.containerView}
                  gap={Width(19)}
                  imageSize={Height(50)}
                  navigation={navigation}
                />
              </View>
            </>
          )}
        </>
      }
    />
  </View>
);

};

export default SearchScreen;