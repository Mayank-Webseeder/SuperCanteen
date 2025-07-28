import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice';
import { COLORS } from '@constants/index';
import { showWishlistToast } from '../../../utils/helper'

const CustomSimilarProducts = ({
  cardWidth = 160,
  data,
  navigation,
  flatListContentStyle,
  onAddToCart
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user?.id);

  const [lottieState, setLottieState] = useState({});
  const [wishlistState, setWishlistState] = useState({});

  const isInWishlist = (productId) =>
    wishlistItems?.some(item => item._id === productId) || wishlistState[productId];

  const handleWishlistToggle = (productId) => {
    if (!token) {
      navigation.reset({
        index: 0,
        routes: [
          { name: 'Auth', state: { routes: [{ name: 'Signin' }] } }
        ]
      });
      return;
    }

    const wishlistItem = wishlistItems.find(item => item._id === productId);
    const wishlistId = wishlistItem?.wishlistId;

    if (isInWishlist(productId)) {
      if (!wishlistId) return;
      dispatch(removeFromWishlist({ wishlistId, userId }));
      setWishlistState(prev => ({ ...prev, [productId]: false }));
      setLottieState(prev => ({ ...prev, [productId]: false }));
        showWishlistToast('Removed from Wishlist', '💔');
    } else {
      dispatch(addToWishlist({ productId, token }));
      setWishlistState(prev => ({ ...prev, [productId]: true }));
      setLottieState(prev => ({ ...prev, [productId]: true }));
        showWishlistToast('Added to Wishlist', '❤️');
    }

    setTimeout(() => {
      setLottieState(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const renderItem = ({ item }) => {
    const fullStars = Math.floor(item.rating || 0);
    const stars = [...Array(5)].map((_, i) => (
      <FontAwesome
        key={i}
        name={i < fullStars ? 'star' : 'star-o'}
        size={10}
        color={i < fullStars ? '#4CAF50' : '#CFCFCF'}
        style={{ marginRight: 2 }}
      />
    ));

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
        activeOpacity={0.8}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Wishlist Button */}
            <TouchableOpacity style={styles.wishlistButton} onPress={() => handleWishlistToggle(item.id)}>
              {lottieState[item.id] ? (
                <LottieView
                  source={require('../../../../assets/lottie/animation.json')}
                  autoPlay
                  loop={false}
                  style={{ width: 32, height: 32 }}
                />
              ) : isInWishlist(item.id) ? (
                   <Ionicons name="heart"   size={18} color={COLORS.error} />
              
              ) : (
                <Ionicons name="heart-outline" size={18} color="#000" />
              )}
            </TouchableOpacity>

            {/* Discount Badge */}
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.brand}>{item.brand || 'Brand'}</Text>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

            {/* Price Section */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}</Text>
              {item.mrp && item.price < item.mrp && (
                <Text style={styles.originalPrice}>₹{item.mrp}</Text>
              )}
            </View>

            {/* Rating Section */}
            {/* {item.rating > 0 && (
              <View style={styles.ratingContainer}>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  <FontAwesome name="star" size={10} color="#fff" />
                </View>
                <Text style={styles.reviews}>({item.reviews || 0})</Text>
              </View>
            )} */}

            {/* Add to Cart Button */}
            <TouchableOpacity onPress={() => onAddToCart(item)} style={styles.addButton}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.flatListContent, { ...flatListContentStyle }]}
    />
  );
};

export default CustomSimilarProducts;
