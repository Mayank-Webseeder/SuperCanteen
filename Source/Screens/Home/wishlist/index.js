import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import CustomSearch from '../../../Components/searchInput';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchWishlistItems, 
  removeFromWishlist,
  selectWishlistWithCategories
} from '../../../redux/slices/wishlistSlice';
import { getCategories } from '../../../redux/slices/categorySlice';
import { IMGURL } from '../../../utils/dataFormatters';
import { COLORS } from '@constants/index';
import { addToCart } from '../../../redux/slices/cartSlice';
import { showMessage } from 'react-native-flash-message';

const WishlistScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector(state => state.auth);
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const userId = user?.id;
  
  const {
    items: wishlistItems,
    categories: reduxCategories,
    loading,
    error
  } = useSelector(selectWishlistWithCategories);

  useEffect(() => {
    dispatch(getCategories()).then(() => {
      dispatch(fetchWishlistItems(userId));
    });
  }, [dispatch, userId]);

  const categories = ['All', ...reduxCategories.map(cat => cat.name)];

  const filteredItems = activeCategory === 'All' 
    ? wishlistItems 
    : wishlistItems.filter(item => {
        const itemCategory = reduxCategories.find(cat => cat._id === item.category);
        return itemCategory?.name === activeCategory;
      });

  const filteredWishListData = searchQuery 
    ? filteredItems.filter(item => 
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())))
    : filteredItems;

  const noDataFound = searchQuery && filteredWishListData.length === 0;

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleRemoveItem = (wishlistId) => {
    dispatch(removeFromWishlist({ wishlistId, userId }));
  };

  const onAddToCart = (item) => {
  setCartLoadingId(item._id); // Show loader for specific item

  dispatch(addToCart({
    productId: item._id,
    quantity: item.minOrderQuantity || 1,
    price: item.offerPrice || item.price,
    isDigital: item.isDigital
  }))
    .then((res) => {
      setCartLoadingId(null);
      showMessage({
        message: 'Item added to cart',
        description: `Successfully moved item to your cart.`,
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    })
    .catch((error) => {
      setCartLoadingId(null);
      showMessage({
        message: 'Failed to add item',
        description: error?.message || 'Something went wrong while adding to cart',
        type: 'danger',
        icon: 'danger',
        duration: 3000,
      });
    });
};


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.closeBtn} 
        onPress={() => handleRemoveItem(item.wishlistId)}
      >
        <MaterialCommunityIcons name="heart" size={20} color='#A94442' />
      </TouchableOpacity>

      <FastImage 
        source={{ uri: `${IMGURL}${item.images[0]}`}} 
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.offerPrice}</Text>
          {item.mrp > item.offerPrice && (
            <Text style={styles.originalPrice}>₹{item.mrp}</Text>
          )}
        </View>
        
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Ionicons
                key={i}
                name={i < Math.floor(item.rating || 0) ? 'star' : 'star-outline'}
                size={14}
                color={'#FFC107'}
              />
            ))}
          </View>
          <Text style={styles.reviewText}>({item.numReviews || '0'})</Text>
        </View>

     <TouchableOpacity
  onPress={() => onAddToCart(item)}
  style={styles.cartButton}
  disabled={cartLoadingId === item._id}
>
  {cartLoadingId === item._id ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.cartButtonText}>Move to Cart</Text>
  )}
</TouchableOpacity>

      </View>
    </View>
  );

  if (loading && wishlistItems.length === 0) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title="My Wishlist" />
        <View style={[styles.emptyContainer, {justifyContent: 'center'}]}>
          <ActivityIndicator size="large" color={COLORS.green} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="My Wishlist" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Items</Text>
        <Text style={styles.itemCount}>{filteredWishListData.length} items</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <CustomSearch
          showCrossIcon={!!searchQuery}
          onChangeText={handleSearchChange}
          value={searchQuery}
          onCrossPress={clearSearch}
          placeholder="Search in your wishlist"
          autoFocus={true}
          containerStyle={styles.searchInput}
          backgroundColor={'#f5f5f5'}
          inputStyle={{ fontSize: 14, paddingVertical: 11, marginLeft: 2}}
        /> 
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
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

      {/* Content Area */}
      {noDataFound ? (
        <View style={styles.noDataContainer}>
          <MaterialIcons name="search-off" size={80} color="#ccc" style={styles.emptyIcon} />
          <Text style={styles.noDataTitle}>No items found</Text>
          <Text style={styles.noDataText}>Try adjusting your search or filters</Text>
        </View>
      ) : filteredWishListData.length > 0 ? (
        <FlatList
          data={filteredWishListData}
          renderItem={renderItem}
          keyExtractor={(item) => item.wishlistId}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptyText}>Start adding items you love!</Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Main')}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WishlistScreen;