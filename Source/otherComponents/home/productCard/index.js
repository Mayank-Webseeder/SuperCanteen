import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { moderateScale } from 'react-native-size-matters';
import { IMGURL } from '../../../utils/dataFormatters';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { showWishlistToast } from '../../../utils/helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '@constants/index';

const { width } = Dimensions.get('window');
const itemWidth = (width - moderateScale(50)) / 2; 
const itemHeight = (width - moderateScale(40)) / 2.5;

const ModernProductGrid = ({ products, navigation, loadMore, loading, hasMore }) => {
  const dispatch = useDispatch();
  const [cartLoadingId, setCartLoadingId] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleAddToCart = async (item) => {
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
      console.error('Add to cart error:', error);
    } finally {
      setCartLoadingId(null);
    }
  };

  // FIXED: Simplified load more handler
  const handleLoadMore = useCallback(() => {
    if (loadMore && hasMore && !loading && !isLoadingMore) {
      setIsLoadingMore(true);
      loadMore();
      // Reset loading state after a short delay
      setTimeout(() => setIsLoadingMore(false), 1000);
    }
  }, [loadMore, hasMore, loading, isLoadingMore]);

  const handleProductPress = useCallback((productId) => {
    navigation.navigate('ProductDetails', { productId });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => {
    const imageUrl = item.images?.[0] ? `${IMGURL}${item.images[0]}` : null;
    const discountPercentage = item.mrp && item.offerPrice 
      ? Math.round(((item.mrp - item.offerPrice) / item.mrp) * 100)
      : 0;

    return (
      <TouchableOpacity
        style={[styles.productCard, { width: itemWidth }]}
        onPress={() => handleProductPress(item._id)}
        activeOpacity={0.9}
      >
        {/* Image with badges */}
        <View style={[styles.imageContainer, { height: itemHeight * 1 }]}>
          {imageUrl ? (
            <FastImage 
              source={{ uri: imageUrl, priority: FastImage.priority.high }} 
              style={styles.productImage}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
            </View>
          )}
        </View>
        
        {/* Product info */}
        <View style={styles.productInfo}>
          {item.weight && item.weightUnit && (
            <View style={styles.weightContainer}>
              <Text style={styles.weightText}>
                {item.weight} {item.weightUnit}
              </Text>
            </View>
          )}
          {item.brand?.name && (
            <Text style={styles.brandName} numberOfLines={1}>
              {item.brand.name}
            </Text>
          )} 
          {item.name && (
            <Text numberOfLines={2} style={styles.productName}>
              {item.name}
            </Text>
          )}
          
          {/* Price section */}
          <View style={styles.priceContainer}>
            {item.offerPrice ? (
              <Text style={styles.offerPrice}>₹{item.offerPrice}</Text>
            ) : item.price ? (
              <Text style={styles.offerPrice}>₹{item.price}</Text>
            ) : null}
            
            {item.mrp > (item.offerPrice || item.price) && (
              <Text style={styles.originalPrice}>₹{item.mrp}</Text>
            )}
          </View>
          
          {/* Add to cart button */}
          <View style={styles.cartButtonContainer}>
            <TouchableOpacity
              onPress={() => handleAddToCart(item)}
              style={[
                styles.addToCartBtn,
                cartLoadingId === item._id && styles.inCartBtnDisable
              ]}
              disabled={cartLoadingId === item._id}
              activeOpacity={0.7}
            >
              {cartLoadingId === item._id ? (
                <ActivityIndicator size="small" color={COLORS.black} />
              ) : (
                <Text style={styles.cartButtonText}>+ Add</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [cartLoadingId, itemHeight, itemWidth, handleProductPress, handleAddToCart]);

  const keyExtractor = useCallback((item) => item._id, []);

  const getItemLayout = useCallback((data, index) => ({
    length: itemHeight + 120,
    offset: (itemHeight + 120) * index,
    index,
  }), [itemHeight]);

  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Increased threshold for better detection
        ListFooterComponent={
          (loading || isLoadingMore) && hasMore ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator color={COLORS.green} size="small" />
            </View>
          ) : null
        }
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default React.memo(ModernProductGrid);