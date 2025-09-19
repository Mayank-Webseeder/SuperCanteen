import React, { useState, useCallback, memo } from 'react';
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
import { showWishlistToast } from '../../utils/helper'
import { IMGURL } from '../../utils/dataFormatters'


const { width: SCREEN_WIDTH } = Dimensions.get('window');
 const CARD_WIDTH = (SCREEN_WIDTH - 50) / 2; 
// const SPACING = 10; // spacing between cards
// const CARD_WIDTH = (SCREEN_WIDTH - SPACING * (numColumns + 1)) / numColumns;

const IMAGE_HEIGHT = SCREEN_WIDTH / 2.5; // square-ish image
const TEXT_SECTION_HEIGHT = 80; // approximate height for brand, name, price
const CARD_HEIGHT = IMAGE_HEIGHT + TEXT_SECTION_HEIGHT;

// Create a memoized product item component to prevent unnecessary re-renders
const ProductItem = memo(({ 
  item, 
  navigation, 
  isFavourite, 
  lottieState, 
  loadingImages,
  handleWishlistToggle, 
  handleImageLoadStart, 
  handleImageLoadEnd 
}) => {
  const id = item._id || item.id;
  const displayImage = getDisplayImage(item);
  const isLoading = loadingImages[id];
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { productId: id })}
      style={[styles.card,{width:CARD_WIDTH,height:CARD_HEIGHT}]}
    >
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

        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={() => handleWishlistToggle(id)}
        >
          <View style={{ width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
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
              <MaterialIcons name="favorite" size={18} color="#E53E3E" />
            ) : (
              <MaterialIcons name="favorite-border" size={18} color={COLORS.white} />
            )}
          </View>
        </TouchableOpacity>

        {item.discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discountPercent}% OFF</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.brandName}>{item?.brandName}</Text>
        <Text  style={styles.productName} numberOfLines={1}>
          {item?.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{item.offerPrice || item.price}</Text>
          {item.mrp > item.offerPrice || item.price  && (
            <Text style={styles.originalPrice}>₹{item.mrp}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

// Helper function to get display image
const getDisplayImage = (product) => {
  const { images } = product;

  if (!images || images.length === 0) return null;

  // case: images is just a string
  if (typeof images === 'string') {
    return {
      uri: images.startsWith('http')
        ? images
        : `${IMGURL}${images.startsWith('/') ? images : `/${images}`}`,
    };
  }

  // case: images is an array
  if (Array.isArray(images)) {
    const firstImage = images[0];

    if (typeof firstImage === 'string') {
      return {
        uri: firstImage.startsWith('http')
          ? firstImage
          : `${IMGURL}${firstImage.startsWith('/') ? firstImage : `/${firstImage}`}`,
      };
    }

    if (typeof firstImage === 'object' && firstImage?.url) {
      return {
        uri: firstImage.url.startsWith('http')
          ? firstImage.url
          : `${IMGURL}${firstImage.url.startsWith('/') ? firstImage.url : `/${firstImage.url}`}`,
      };
    }
  }

  return null;
};



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
  
  const isInWishlist = useCallback((productId) =>
    wishlistItems?.some(item => item._id === productId) || wishlistState[productId],
    [wishlistItems, wishlistState]
  );

  const handleLoginCheck = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
    });
  }, [navigation]);

  const handleWishlistToggle = useCallback((productId) => {
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
      showWishlistToast('Removed from Wishlist', '💔');
      console.log('✅ Removed from wishlist:', wishlistId);
    } else {
      dispatch(addToWishlist({ productId, token }));
      setWishlistState(prev => ({ ...prev, [productId]: true }));
      setLottieState(prev => ({ ...prev, [productId]: true }));
      console.log('✅ Added to wishlist:', productId);
      showWishlistToast('Added to Wishlist', '❤️');
    }

    setTimeout(() => {
      setLottieState(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  }, [token, wishlistItems, isInWishlist, dispatch, userId, handleLoginCheck]);

  const handleImageLoadStart = useCallback((id) => {
    setLoadingImages(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleImageLoadEnd = useCallback((id) => {
    setLoadingImages(prev => ({ ...prev, [id]: false }));
  }, []);

  const renderItem = useCallback(({ item }) => {
    const id = item._id || item.id;
    return (
      <ProductItem
        item={item}
        navigation={navigation}
        isFavourite={isInWishlist(id)}
        lottieState={lottieState}
        loadingImages={loadingImages}
        handleWishlistToggle={handleWishlistToggle}
        handleImageLoadStart={handleImageLoadStart}
        handleImageLoadEnd={handleImageLoadEnd}
      />
    );
  }, [navigation, isInWishlist, lottieState, loadingImages, handleWishlistToggle, handleImageLoadStart, handleImageLoadEnd]);

  const keyExtractor = useCallback((item) => item._id || item.id, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={10}
        removeClippedSubviews={true}
          columnWrapperStyle={{ justifyContent: 'space-between' }} // ensures two items per row
      />
    </View>
  );
};

export default memo(CustomProductCard);