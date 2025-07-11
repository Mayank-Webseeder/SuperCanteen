import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { shallowEqual } from 'react-redux';
import { IMGURL } from '../../../utils/dataFormatters';
import { fetchSections } from '../../../redux/slices/sectionSlice'; 
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '@constants/index';
import { styles } from './styles';
import LottieView from 'lottie-react-native';
import { showWishlistToast } from  '../../../utils/helper'


const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = 240;

const SectionRenderer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [lottieStates, setLottieStates] = useState({});

  const { sections, loading, error } = useSelector(state => state.section, shallowEqual);
  const { items: wishlistItems } = useSelector(state => state.wishlist, shallowEqual);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const sectionTypes = [ 'categories', 'bestSellers', 'deals', 'newArrivals', 'featured'];

  const isInWishlist = useCallback((productId) => wishlistItems.some(item => item._id === productId), [wishlistItems]);

  const handleLoginCheck = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
    });
  }, [navigation]);

  const handleWishlistToggle = useCallback((productId) => {
    if (!token) return handleLoginCheck();
    setLottieStates(prev => ({ ...prev, [productId]: true }));
    if (isInWishlist(productId)) {
      const wishlistItem = wishlistItems.find(item => item.product?._id === productId);
      if (!wishlistItem) return;
      const idToRemove = wishlistItem.wishlistId || wishlistItem._id;
      dispatch(removeFromWishlist({ wishlistId: idToRemove, userId }));
      showWishlistToast('Removed from Wishlist', '💔');
    } else {
      dispatch(addToWishlist({ productId, token }));
      showWishlistToast('Added to Wishlist', '❤️');
    }
  }, [token, wishlistItems, dispatch, userId, isInWishlist, handleLoginCheck]);



  const renderCard = (item, sectionType) => {
    const productId = item.product?._id;
    const isFavourite = isInWishlist(productId);
    const showLottie = lottieStates[productId];

    return (
      <TouchableOpacity
        style={{
          width: CARD_WIDTH,
          height: sectionType == 'categories' ?  190 : CARD_HEIGHT,
          backgroundColor: '#fff',
          marginHorizontal: 8,
          marginVertical:8,
          marginBottom:10,
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
          onPress={(e) => { e.stopPropagation(); handleWishlistToggle(productId); }}
          style={styles.whishlistButton}
        >
          {showLottie ? (
            <LottieView source={require('../../../../assets/lottie/animation.json')} autoPlay loop={false} style={{ width: 40, height: 40 }} />
          ) : (
            <Ionicons name={isFavourite ? "heart" : "heart-outline"} size={20} color={isFavourite ? COLORS.error : COLORS.white} />
          )}
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.name}>{item.product?.name}</Text>
          <Text style={styles.price}>₹{item.product?.offerPrice}</Text>
        
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (section, index) => {
    const sectionType = sectionTypes[index % sectionTypes.length];
    return (
      <View style={[styles.titleStyle,{marginTop: sectionType == 'categories' && 13}]} key={section._id}>
        {section.title && sectionType !== 'banner' && (
          <Text style={styles.title}>{section.title}</Text>
        )}

        <FlatList
          data={section.products}
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
        <ActivityIndicator size="large" color={COLORS.green} />
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
      data={sections}
      renderItem={({ item, index }) => renderSection(item, index)}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default SectionRenderer;
