import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomSearchInput from '../../../Components/searchInput';
import { WishlistProducts } from '../../../Mock/Data/WishlistProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const categories = ['All', 'Watches', 'Shoes', 'Bags', 'Sunglasses', 'Smartwatch'];

const WishlistScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [wishlistItems, setWishlistItems] = useState(WishlistProducts);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on active category FIRST
  const filteredItems = activeCategory === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.category === activeCategory);

  // Then filter based on search query
  const filteredWishListData = searchQuery 
    ? filteredItems.filter(item => 
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredItems;

  const noDataFound = searchQuery && filteredWishListData.length === 0;

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Render each wishlist item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeBtn} 
        onPress={() => handleRemoveItem(item.id)}
      >
        <Ionicons name="close" size={16} color="#777" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image source={item.image} style={styles.image} />

      {/* Product Info */}
      <View style={styles.content}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.title}>{item.title}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Ionicons
                key={i}
                name={
                  i < Math.floor(item.rating)
                    ? 'star'
                    : i < item.rating
                    ? 'star-half'
                    : 'star-outline'
                }
                size={14}
                color={'#2E6074'}
              />
            ))}
          </View>
          <Text style={styles.reviewText}>
            {item.rating} | {item.reviews}
          </Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Move to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Wishlist" />
      <View style={styles.main}>
        <CustomSearchInput 
          showCrossIcon={true} 
          onChangeText={handleSearchChange}
          value={searchQuery}
          onCrossPress={clearSearch}
        />
      </View>

      {/* Horizontal Category Row */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.categoryItem,
                activeCategory === cat && styles.activeCategoryItem
              ]}
              onPress={() => handleCategoryChange(cat)}
            >
              <Text style={[
                styles.categoryText,
                activeCategory === cat && styles.activeCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {noDataFound ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      ) : filteredWishListData.length > 0 ? (
        <FlatList
          data={filteredWishListData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={{ justifyContent: 'flex-start', gap: 18 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      )}
    </View>
  );
};

export default WishlistScreen;

