import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Animated
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import CustomSearch from '../../../Components/searchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWishlistItems,
  removeFromWishlist,
  selectWishlistWithCategories,
  resetWishlistError
} from '../../../redux/slices/wishlistSlice';
import { getCategories } from '../../../redux/slices/categorySlice';
import { IMGURL } from '../../../utils/dataFormatters';
import { addToCart } from '../../../redux/slices/cartSlice';
import { showMessage } from 'react-native-flash-message';
import { showWishlistToast } from '../../../utils/helper';
import EmptyState from '@components/emptyComponent/EmptyState';
import { COLORS } from '@constants/index';

const WishlistScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [skeletonAnimation] = useState(new Animated.Value(0));
  const [isDataReady, setIsDataReady] = useState(false);
  
  const { user } = useSelector(state => state.auth);
  const userId = user?.id;

  const {
    items: wishlistItems,
    categories: reduxCategories,
    loading,
    error,
    lastAdded
  } = useSelector(selectWishlistWithCategories);

  console.log("WHISTITEMS IS=========================>",wishlistItems)

  // Skeleton animation
  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (loading && !wishlistItems.length) {
      animateSkeleton();
    }

    return () => {
      skeletonAnimation.stopAnimation();
    };
  }, [loading, wishlistItems.length]);

  // Load data on focus and initial mount
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        try {
          setIsDataReady(false);
          await dispatch(getCategories());
          await dispatch(fetchWishlistItems(userId));
          if (isActive) {
            setIsDataReady(true);
          }
        } catch (err) {
          if (isActive) {
            setIsDataReady(true);
          }
        } finally {
          if (isActive) {
            setRefreshing(false);
          }
        }
      };

      if (userId) {
        setRefreshing(true);
        loadData();
      }

      return () => {
        isActive = false;
        dispatch(resetWishlistError());
      };
    }, [userId, lastAdded])
  );

  // Handle errors
  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);

  // Memoized categories list
  const categories = useMemo(() => 
    ['All', ...reduxCategories.map(cat => cat.name)],
    [reduxCategories]
  );

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    if (!isDataReady) return [];
    if (activeCategory === 'All') return wishlistItems;
    
    return wishlistItems.filter(item => {
      const itemCategory = reduxCategories.find(cat => cat._id === item.category);
      return itemCategory?.name === activeCategory;
    });
  }, [wishlistItems, activeCategory, reduxCategories, lastAdded, isDataReady]);

  // Memoized search results
  const filteredWishListData = useMemo(() => {
    if (!isDataReady) return [];
    if (!searchQuery) return filteredItems;
    
    return filteredItems.filter(item =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredItems, searchQuery, isDataReady]);

  const noDataFound = searchQuery && filteredWishListData.length === 0 && isDataReady;

  const handleRefresh = useCallback(() => {
    if (userId) {
      setRefreshing(true);
      dispatch(fetchWishlistItems(userId))
        .finally(() => setRefreshing(false));
    }
  }, [userId]);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const handleSearchChange = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleRemoveItem = useCallback(async (wishlistId) => {
    try {
      showWishlistToast('Removed from Wishlist', '💔');
      await dispatch(removeFromWishlist({ wishlistId, userId }));
    } catch (error) {
      showMessage({
        message: 'Failed to remove item',
        description: error?.message || 'Please try again',
        type: 'danger',
        duration: 3000,
      });
    }
  }, [userId]);

  const onAddToCart = useCallback(async (item) => {
    setCartLoadingId(item._id);
    try {
      await dispatch(addToCart({
        productId: item._id,
        quantity: 1,
        price: item.offerPrice || item.price,
        isDigital: item.isDigital
      }));
      showWishlistToast('Item added to cart', <MaterialIcons name="add-shopping-cart" size={18} color="#fff" />);
    } catch (error) {
      showMessage({
        message: 'Failed to add item',
        description: error?.message || 'Something went wrong',
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setCartLoadingId(null);
    }
  }, []);

  const renderSkeletonItem = useCallback(() => {
    const shimmerAnimation = skeletonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-100%', '100%']
    });

    return (
      <View style={styles.card}>
        <View style={[styles.image, { backgroundColor: '#E1E9EE', overflow: 'hidden' }]}>
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#F2F8FC',
              transform: [{ translateX: shimmerAnimation }],
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={{ width: '80%', height: 20, backgroundColor: '#E1E9EE', marginBottom: 8, overflow: 'hidden' }}>
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F2F8FC',
                transform: [{ translateX: shimmerAnimation }],
              }}
            />
          </View>
          <View style={{ width: '60%', height: 16, backgroundColor: '#E1E9EE', marginBottom: 12, overflow: 'hidden' }}>
            <Animated.View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F2F8FC',
                transform: [{ translateX: shimmerAnimation }],
              }}
            />
          </View>
        </View>
      </View>
    );
  }, [skeletonAnimation]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ProductDetails', { productId: item?._id })} style={styles.card}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => handleRemoveItem(item.wishlistId)}
      >
        <Ionicons name="close" size={18} color="#000" />
      </TouchableOpacity>

      <FastImage
        source={{ uri: `${IMGURL}${item?.images?.[0]}` }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
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
          style={[
            styles.cartButton, 
            cartLoadingId === item._id && styles.cartButtonDisabled
          ]}
          disabled={cartLoadingId === item._id}
        >
          {cartLoadingId === item._id ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.cartButtonText}>Move to Cart</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [handleRemoveItem, onAddToCart, cartLoadingId]);

  if (!isDataReady && !wishlistItems.length) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title="My Wishlist" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Items</Text>
          <Text style={styles.itemCount}>0 items</Text>
        </View>
        <FlatList
          data={[...Array(6)]}
          renderItem={renderSkeletonItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.containerStyle}
        />
      </View>
    );
  }

  if (isDataReady && !wishlistItems.length) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title="My Wishlist" />
        <EmptyState
          title={'Your wishlist is empty'}
          imageSource={require('../../../../assets/Icons/emptyWishlist.jpg')}
          onPress={() => navigation.navigate('Main')}
        />
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
          autoFocus={false}
          containerStyle={styles.searchInput}
          backgroundColor={'#f5f5f5'}
          inputStyle={{ fontSize: 14, paddingVertical: 10, marginLeft: 2 }}
        />
      </View>

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
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.activeCategoryText
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {noDataFound ? (
        <View style={styles.noDataContainer}>
          <MaterialIcons name="search-off" size={80} color="#ccc" style={styles.emptyIcon} />
          <Text style={styles.noDataTitle}>No items found</Text>
          <Text style={styles.noDataText}>Try adjusting your search or filters</Text>
        </View>
      ) : (
        <FlatList
          data={isDataReady ? filteredWishListData : [...Array(6)]}
          renderItem={isDataReady ? renderItem : renderSkeletonItem}
          keyExtractor={isDataReady ? (item) => item.wishlistId : (_, index) => index.toString()}
          removeClippedSubviews
          windowSize={5}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={50}
          numColumns={2}
          contentContainerStyle={styles.containerStyle}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#FF6B6B']}
              tintColor={'#FF6B6B'}
            />
          }
        />
      )}
    </View>
  );
};

export default React.memo(WishlistScreen);