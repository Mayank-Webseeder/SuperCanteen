import  { useRef, useState, useEffect } from 'react';
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
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlistItems,
} from '../../../redux/slices/wishlistSlice';
import { showWishlistToast } from '../../../utils/helper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = Height(220);

const ProductCarousel = ({
  products,
  navigation,
  horizontal = false,
  title = 'The Swipe & Shop Spectacular',
  containerStyle,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const initialized = useSelector(state => state.wishlist.initialized);
  const userId = useSelector(state => state.auth.user?.id);
  const token = useSelector(state => state.auth.token);
  const { user } = useSelector(state => state.auth);
  const [lottieState, setLottieState] = useState({});
  const [wishlistState, setWishlistState] = useState({});

  useEffect(() => {
    if (userId && !initialized) {
      dispatch(fetchWishlistItems(userId));
    }
  }, [dispatch, userId, initialized]);

const isInWishlist = (productId) => {
  if (!initialized) return false;

  const inRedux = wishlistItems?.some(
    item => item._id === productId || item.product?._id === productId
  );

  // Optimistically return local state while Redux catches up
  return wishlistState[productId] ?? inRedux;
};


  const handleWishlistToggle = productId => {
    if (!user || !user.username) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
      });
      return;
    }

    const wishlistItem = wishlistItems.find(
      item => item._id === productId || item.productId === productId
    );
    const wishlistId = wishlistItem?.wishlistId;

    if (isInWishlist(productId)) {
      if (!wishlistId) return;

      dispatch(removeFromWishlist({ wishlistId, userId }));
      requestAnimationFrame(() => {
        setWishlistState(prev => ({ ...prev, [productId]: false }));
        setLottieState(prev => ({ ...prev, [productId]: false }));
      });
      showWishlistToast('Removed from Wishlist', '💔');
    } else {
      console.log("PRODUCT ID IS",productId)
      dispatch(addToWishlist({ productId, token }));
      requestAnimationFrame(() => {
        setWishlistState(prev => ({ ...prev, [productId]: true }));
        setLottieState(prev => ({ ...prev, [productId]: true }));
      });
      showWishlistToast('Added to Wishlist', '❤️');
    }

    
  };

  const gridItemWidth = (width - Width(40)) / 3;

  const renderItem = ({ item, index }) => {
    const discountPercentage = Math.round(
      ((item.mrp - item.offerPrice) / item.mrp) * 100
    );
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
            minHeight: isGrid ? Height(150) : Height(190),
             maxHeight: isGrid ? Height(250) : CARD_HEIGHT,
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
              <View
                style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
              >
                {lottieState[item._id] ? (
                  <LottieView
                    source={require('../../../../assets/lottie/animation.json')}
                    autoPlay
                    loop={false}
                    pointerEvents="none"
                    style={{
                      width: 40,
                      height: 40,
                      position: 'absolute',
                      zIndex: 1,
                    }}
                  />
                ) : isInWishlist(item._id) ? (
              
                   <Ionicons name="heart"   size={isGrid ? 16 : 20} color={COLORS.error} />
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


  const enabledProducts = products.filter(product => product.isEnable);

 return (
  <View style={styles.container}>
    {enabledProducts.length > 0 ? (
      <>
        <HeaderRow containerStyle={{ marginTop: Height(10), ...containerStyle }} title={title} />

        {horizontal ? (
          <Animated.FlatList
            data={enabledProducts}
            renderItem={renderItem}
            keyExtractor={item => item._id}
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
            removeClippedSubviews={true}
            initialNumToRender={5}
            maxToRenderPerBatch={6}
            windowSize={7}
          />
        ) : (
          <FlatList
            data={enabledProducts}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.gridContentContainer,
              { marginTop: horizontal ? Height(10) : '' },
            ]}
            removeClippedSubviews={true}
            initialNumToRender={6}
            maxToRenderPerBatch={9}
            windowSize={7}
          />
        )}
      </>
    ) : (
     <></>
    )}
  </View>
);

};

export default ProductCarousel;
