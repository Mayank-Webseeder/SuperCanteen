import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { IMGURL } from '../../../utils/dataFormatters';
import { fetchSections } from '../../../redux/slices/sectionSlice'; 
import { addToWishlist, removeFromWishlist, fetchWishlistItems } from '../../../redux/slices/wishlistSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '@constants/index';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import { showWishlistToast } from '../../../utils/helper';
import { verticalScale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SectionRenderer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [lottieStates, setLottieStates] = useState({});
  const [wishlistState, setWishlistState] = useState({});

  const { sections, loading, error } = useSelector(state => state.section, shallowEqual);
  const { items: wishlistItems, initialized } = useSelector(state => state.wishlist, shallowEqual);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user?.id);
  const user = useSelector(state => state.auth.user);

  console.log("whislist items is",wishlistItems)

   const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const CARD_WIDTH = dimensions.width * 0.45;
  const CARD_HEIGHT = verticalScale(220);

  useEffect(() => {
    dispatch(fetchSections());
    if (userId && !initialized) {
      dispatch(fetchWishlistItems(userId));
    }
  }, [dispatch, userId, initialized]);

  const sectionTypes = ['categories', 'bestSellers', 'deals', 'newArrivals', 'featured'];

const isInWishlist = (productId) => {
  // If wishlist hasn't loaded yet, return false
  if (!initialized) return false;
  
  // Check both the Redux state and local state
  const inRedux = wishlistItems.some(item => 
    item._id === productId || item.product?._id === productId
  );
  
  // If we have explicit local state, use that (for immediate UI feedback)
  // Otherwise fall back to Redux state
  return wishlistState.hasOwnProperty(productId) 
    ? wishlistState[productId] 
    : inRedux;
};


useEffect(() => {
  // When wishlist loads or updates, reset our local state
  if (initialized) {
    const newWishlistState = {};
    wishlistItems.forEach(item => {
      const productId = item._id || item.product?._id;
      if (productId) {
        newWishlistState[productId] = true;
      }
    });
    setWishlistState(newWishlistState);
  }
}, [wishlistItems, initialized]);


  const handleLoginCheck = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] }}],
    });
  }, [navigation]);

const handleWishlistToggle = (productId) => {
  if (!user || !user.username) {
    handleLoginCheck();
    return;
  }

  const isCurrentlyInWishlist = isInWishlist(productId);
  
  if (isCurrentlyInWishlist) {
    // Find the wishlist item to get its ID
    const wishlistItem = wishlistItems.find(
      item => item._id === productId || item.product?._id === productId
    );
    const wishlistId = wishlistItem?._id;
    
    if (!wishlistId) {
      console.warn('Wishlist ID not found for product:', productId);
      return;
    }
    
    dispatch(removeFromWishlist({ wishlistId, userId }));
    setWishlistState(prev => ({ ...prev, [productId]: false }));
    setLottieStates(prev => ({ ...prev, [productId]: false }));
    showWishlistToast('Removed from Wishlist', '💔');
  } else {
    dispatch(addToWishlist({ productId, token }));
    setWishlistState(prev => ({ ...prev, [productId]: true }));
    setLottieStates(prev => ({ ...prev, [productId]: true }));
    showWishlistToast('Added to Wishlist', '❤️');
  }
};

  const renderCard = (item) => {
    const productId = item.product?._id;
    const showLottie = lottieStates[productId];
    const isFavourite = isInWishlist(productId);

    console.log("PRODUCT ID IS",productId)

    return (
      <TouchableOpacity
        style={{
          width: CARD_WIDTH,
          height:  CARD_HEIGHT,
          backgroundColor: '#fff',
          marginHorizontal: 8,
          marginVertical: 8,
          marginBottom: 10,
          borderRadius: 12,
          overflow: 'hidden',
          elevation: 3,
        }}
        onPress={() => navigation.navigate('ProductDetails', { productId })}
        activeOpacity={0.9}
      >
        <FastImage
          source={{ uri: `${IMGURL}${item.product?.images[0]}` }}
          style={{ width: '100%', height: '60%' }}
          resizeMode={FastImage.resizeMode.cover}
        />

       <TouchableOpacity
  onPress={(e) => {
    e.stopPropagation();
    handleWishlistToggle(productId);
  }}
  style={styles.whishlistButton}
>
  <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
    {showLottie ? (
      <LottieView
        source={require('../../../../assets/lottie/animation.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => setLottieStates(prev => ({ ...prev, [productId]: false }))}
        style={{ width: 40, height: 40 }}
      />
    ) : (
      <MaterialIcons 
        name={isFavourite ? "favorite" : "favorite-border"} 
        size={18} 
        color={isFavourite ? "#E53E3E" : COLORS.white} 
      />
    )}
  </View>
</TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.name}>{item.product?.name}</Text>
          <Text style={styles.price}>₹{item.product?.offerPrice}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (section, index) => {
  const validProducts = section.products.filter(item => item.product !== null);
  if (validProducts.length === 0) return null; 
    const sectionType = sectionTypes[index % sectionTypes.length];
    return (
      <View style={[styles.titleStyle,{marginTop: sectionType == 'categories' && 13}]} key={section._id}>
     <View style={styles.horiZontal}/>
        {section.title && sectionType !== 'banner' && (
          <Text style={styles.title}>{section.title}</Text>
        )}

        <FlatList
          data={validProducts}
          renderItem={({ item }) => renderCard(item, sectionType)}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        /> 
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle" size={50} color={COLORS.error} />
        <TouchableOpacity onPress={() => dispatch(fetchSections())} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
 <FlatList
  data={sections?.filter(section =>
    Array.isArray(section.products) &&
    section.products.some(item => item.product !== null)
  )}
  renderItem={({ item, index }) => renderSection(item, index)}
  keyExtractor={(item) => item._id}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.container}
/>

  );
};

export default SectionRenderer;
