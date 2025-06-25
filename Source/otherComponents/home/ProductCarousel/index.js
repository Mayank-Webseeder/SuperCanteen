import React, { useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import { Height, Width } from '@constants';
import { COLORS } from '@constants/index';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderRow from '../headerRow';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = Height(190);

const ProductCarousel = ({
  products,
  navigation,
  horizontal = false,
  title = 'The Swipe & Shop Spectacular',
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const userId = useSelector(state => state.auth.user?.id);
  const token = useSelector(state => state.auth.token);
  const { user } = useSelector(state => state.auth);
  const [lottieState, setLottieState] = useState({});
  const [wishlistState, setWishlistState] = useState({});

  const isInWishlist = (productId) =>
    wishlistItems?.some((item) => item._id === productId) || wishlistState[productId];


 const handleWishlistToggle = (productId) => {
  if (!user || !user.username) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          state: {
            routes: [{ name: 'Signin' }]
          }
        }
      ]
    });
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
    console.log("✅ Removed from wishlist:", wishlistId);
  } else {
    dispatch(addToWishlist({ productId, token }));
    setWishlistState(prev => ({ ...prev, [productId]: true }));
    setLottieState(prev => ({ ...prev, [productId]: true }));
    console.log("✅ Added to wishlist:", productId);
  }

  setTimeout(() => {
    setLottieState(prev => ({ ...prev, [productId]: false }));
  }, 1500);
};

  const gridItemWidth = (width - Width(40)) / 3;

  const renderItem = ({ item, index }) => {
    const discountPercentage = Math.round(((item.mrp - item.offerPrice) / item.mrp) * 100);
    const isGrid = !horizontal;

    const scale = horizontal
      ? scrollX.interpolate({
          inputRange: [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: 'clamp',
        })
      : 1;

    return (
      <Animated.View
        style={{
          transform: [{ scale }],
          marginHorizontal: horizontal ? Width(4) : Width(3),
          marginBottom: Height(12),
          width: isGrid ? gridItemWidth : CARD_WIDTH,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
          style={[
            styles.cardContainer,
            {
              height: isGrid ? Height(180) : CARD_HEIGHT,
              padding: isGrid ? Width(5) : Width(8),
              marginTop: isGrid ? Height(10) : '',
              marginHorizontal: isGrid ? 2 : '',
              left: !isGrid ? Height(5) : '',
            },
          ]}
        >
          {/* Image Section */}
          <View style={[styles.imageContainer, { height: isGrid ? '50%' : '58%' }]}>
            <Image
              source={{ uri: `${IMGURL}${item.images[0]}` }}
              style={styles.productImage}
              resizeMode={isGrid ? 'contain' : 'cover'}
            />

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <LinearGradient
                colors={['#FF416C', '#FF4B2B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.discountBadge, isGrid && styles.gridDiscountBadge]}
              >
                <Text style={[styles.discountText, isGrid && { fontSize: 8 }]}>
                  {discountPercentage}% OFF
                </Text>
              </LinearGradient>
            )}

            {/* Wishlist Toggle Button */}
            <TouchableOpacity
              style={[styles.wishlistButton, isGrid && styles.gridWishlistButton]}
              onPress={() => handleWishlistToggle(item._id)}
            >
              <View style={{ width: 40, height: 40,alignItems:"center",justifyContent:"center" }}>
                {lottieState[item._id] ? (
                  <LottieView
                    source={require('../../../../assets/lottie/animation.json')}
                    autoPlay
                    loop={false}
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      zIndex: 1,
                    }}
                  />
                ) : isInWishlist(item._id) ? (
                  <MaterialIcons
                    name="favorite"
                    size={isGrid ? 16 : 20}
                    color={'#A94442'}
                  />
                ) : (
                  <MaterialIcons
                    name="favorite-border"
                    size={isGrid ? 16 : 20}
                    color={COLORS.white}
                    
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text
              numberOfLines={2}
              style={[styles.productName, isGrid && styles.gridProductName]}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>

            <View style={styles.priceContainer}>
              <Text style={[styles.offerPrice, isGrid && styles.gridOfferPrice]}>
                ₹{item.offerPrice}
              </Text>
              {item.mrp > item.offerPrice && (
                <Text style={[styles.mrpPrice, isGrid && styles.gridMrpPrice]}>
                  ₹{item.mrp}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {products.length > 0 && (
        <HeaderRow containerStyle={{ marginTop: Height(10) }} title={title} />
      )}

      {horizontal ? (
        <Animated.FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          snapToInterval={CARD_WIDTH + Width(16)}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.gridContentContainer,
            { marginTop: horizontal ? Height(10) : '' },
          ]}
        />
      )}
    </View>
  );
};

export default ProductCarousel;
