import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { styles } from './styles';
import { COLORS } from '@constants/index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomProductCard = ({
  data = [],
  navigation,
  numColumns = 2,
  containerStyle
}) => {
  const [loadingImages, setLoadingImages] = useState({});
  const [lottieState, setLottieState] = useState({});
  const [wishlistState, setWishlistState] = useState({});

  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?.id);
  const token = useSelector(state => state.auth.token);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const isInWishlist = (productId) =>
    wishlistItems?.some(item => item._id === productId) || wishlistState[productId];

  const handleLoginCheck = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
    });
  };

  const handleWishlistToggle = (productId) => {
    if (!token) {
      handleLoginCheck();
      return;
    }

    const wishlistItem = wishlistItems.find(item => item._id === productId);
    const wishlistId = wishlistItem?.wishlistId;

    if (isInWishlist(productId)) {
      if (!wishlistId) {
        console.warn('❌ Wishlist ID not found for product:', productId);
        return;
      }
      dispatch(removeFromWishlist({ wishlistId, userId }));
      setWishlistState(prev => ({ ...prev, [productId]: false }));
      setLottieState(prev => ({ ...prev, [productId]: false }));
      console.log('✅ Removed from wishlist:', wishlistId);
    } else {
      dispatch(addToWishlist({ productId, token }));
      setWishlistState(prev => ({ ...prev, [productId]: true }));
      setLottieState(prev => ({ ...prev, [productId]: true }));
      console.log('✅ Added to wishlist:', productId);
    }

    setTimeout(() => {
      setLottieState(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const handleImageLoadStart = (id) => {
    setLoadingImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id) => {
    setLoadingImages(prev => ({ ...prev, [id]: false }));
  };

  const getDisplayImage = (product) => {
    if (product.images && product.images.length > 0) {
      return { uri: product.images[0] };
    }
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item._id || item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
        renderItem={({ item }) => {
          const id = item._id || item.id;
          const isFavourite = isInWishlist(id);
          const displayImage = getDisplayImage(item);
          const isLoading = loadingImages[id];

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetails', { productId: id })}
              style={styles.card}
            >
              {/* Product Image */}
              <View style={[styles.imageContainer, { height: SCREEN_WIDTH / 2.5 }]}>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#416F81" />
                  </View>
                )}
                {displayImage && (
                  <FastImage
                    source={displayImage}
                    style={styles.productImage}
                    resizeMode="contain"
                    onLoadStart={() => handleImageLoadStart(id)}
                    onLoadEnd={() => handleImageLoadEnd(id)}
                  />
                )}

                {/* Wishlist Toggle */}
                <TouchableOpacity
                  style={styles.favouriteButton}
                  onPress={() => handleWishlistToggle(id)}
                >
                  <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    {lottieState[id] ? (
                      <LottieView
                        source={require('../../../assets/lottie/animation.json')}
                        autoPlay
                        loop={false}
                        style={{
                          width: 40,
                          height: 40,
                          position: 'absolute',
                          zIndex: 1,
                        }}
                      />
                    ) : isFavourite ? (
                      <MaterialIcons name="favorite" size={20} color="#E53E3E" />
                    ) : (
                      <MaterialIcons name="favorite-border" size={20} color={COLORS.white} />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Discount Badge */}
                {item.discountPercent > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discountPercent}% OFF</Text>
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.detailsContainer}>
                <Text style={styles.brandName}>{item?.brandName}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item?.name}
                </Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>₹{item.offerPrice || item.price}</Text>
                  {item.mrp > item.offerPrice && (
                    <Text style={styles.originalPrice}>₹{item.mrp}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CustomProductCard;
