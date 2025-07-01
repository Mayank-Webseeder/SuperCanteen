import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageBackground
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
import { addToCart } from '../../../redux/slices/cartSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showWishlistToast } from  '../../../utils/helper'

const { width } = Dimensions.get('window');

const SectionRenderer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [lottieStates, setLottieStates] = useState({});
  const [cartLoadingId, setCartLoadingId] = useState(null);
  
  const { sections, loading, error } = useSelector(
    state => state.section,
    shallowEqual
  );
  
  const { items: wishlistItems} = useSelector(
    state => state.wishlist,
    shallowEqual
  );
  
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth.user?.id);

     const onAddToCart = (item) => {
  const productId = item?.product?._id;

  setCartLoadingId(productId);

  const cartPayload = {
    productId,
    quantity: 1,
    price: item?.product?.offerPrice || item?.price,
  };

     setCartLoadingId(item._id);
  dispatch(addToCart(cartPayload))
    .then(() => {
      showWishlistToast(
        'Item added to cart',
        <MaterialIcons name="add-shopping-cart" size={18} color="#fff" />
      );
    })
    .catch((error) => {
      console.log("❌ Add to cart failed", error);
        setCartLoadingId(null);
    })
    .finally(() => {
   setCartLoadingId(null);
    });
};

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const sectionTypes = [
    'banner', 
    'categories',
    'bestSellers',
    'deals',
    'newArrivals',
    'featured'
  ];

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item._id === productId);
  }, [wishlistItems]);

  const handleLoginCheck = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] }}],
    });
  }, [navigation]);

const handleWishlistToggle = useCallback((productId) => {
    if (!token) {
      handleLoginCheck();
      return;
    }

    setLottieStates(prev => ({ ...prev, [productId]: true }));

    if (isInWishlist(productId)) {
      const wishlistItem = wishlistItems.find(item => item.product?._id === productId);
      
      // Debugging log
      console.log('Wishlist item to remove:', wishlistItem);
      
      if (!wishlistItem) {
        console.error('No wishlist item found for product:', productId);
        return;
      }

      const idToRemove = wishlistItem.wishlistId || wishlistItem._id;
      dispatch(removeFromWishlist({ wishlistId: idToRemove, userId }));
      showWishlistToast('Removed from Wishlist', '💔');
    } else {
      dispatch(addToWishlist({ productId, token }));
      showWishlistToast('Added to Wishlist', '❤️');
    }

   

}, [token, wishlistItems, dispatch, userId, isInWishlist, handleLoginCheck]);



  const getSectionType = useCallback((index) => {
    return sectionTypes[index % sectionTypes.length];
  }, []);

  const getFirstWord = useCallback((title) => {
    return title.split(' ')[0];
  }, []);


  const renderSectionHeader = useCallback((title, sectionType) => {
    if (sectionType === 'banner') return null;    
    return (
      <View style={[
        styles.sectionHeader,
        sectionType === 'deals' && styles.dealsHeader,
        sectionType === 'newArrivals' && styles.newArrivalsHeader
      ]}>
        <Text style={[
          styles.sectionTitle,
          sectionType === 'deals' && styles.dealsTitle,
        ]}>{title}</Text>
      </View>
    );
  }, []);

  const renderProductItem = useCallback(({ item, index }, sectionType, sectionTitle) => {
    const discount = item.product?.originalPrice ?
      Math.round(((item.product?.originalPrice - item.product?.offerPrice) / item.product?.originalPrice) * 100) : 0;

    const itemWidth = 
      sectionType === 'deals' ? width * 0.65 :
      sectionType === 'featured' ? width * 0.9 :
      sectionType === 'bestSellers' ? width * 0.45 :
      sectionType === 'newArrivals' ? (width / 2) - 24 :
      width * 0.45;

    const productId = item.product?._id;
    const isFavourite = isInWishlist(productId);
    const showLottie = lottieStates[productId];

    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          sectionType === 'featured' && styles.featuredCard,
          sectionType === 'deals' && styles.dealCard,
          sectionType === 'bestSellers' && styles.bestSellerCard,
          sectionType === 'newArrivals' && styles.newArrivalCard,
          { width: itemWidth }
        ]}
        onPress={() => navigation.navigate('ProductDetails', { productId })}
        activeOpacity={0.9}
      >
        {/* Product Image */}
        <View style={[
          styles.imageContainer,
          sectionType === 'featured' && styles.featuredImageContainer,
          sectionType === 'deals' && styles.dealImageContainer,
          sectionType === 'bestSellers' && styles.bestSellerImageContainer,
          sectionType === 'newArrivals' && styles.newArrivalImageContainer
        ]}>
          <FastImage
            source={{ uri: `${IMGURL}${item.product?.images[0]}` }}
            style={[
              styles.productImage,
              sectionType === 'featured' && styles.featuredImage,
              sectionType === 'deals' && styles.dealImage,
              sectionType === 'bestSellers' && styles.bestSellerImage,
              sectionType === 'newArrivals' && styles.newArrivalImage,
            ]}
            resizeMode={sectionType === 'featured' ? 'cover' : 'contain'}
          />

          {/* Badges */}
          {item.priority < 3 && (
            <View style={[
              styles.ribbon,
              sectionType === 'deals' && styles.dealRibbon,
              sectionType === 'bestSellers' && styles.bestSellerRibbon,
              sectionType === 'newArrivals' && styles.newArrivalRibbon
            ]}>
              <Text style={styles.ribbonText}>
                {getFirstWord(sectionTitle)}
              </Text>
            </View>
          )}

          {discount > 0 && (
            <View style={[
              styles.discountBadge,
              sectionType === 'deals' && styles.dealDiscountBadge,
              sectionType === 'bestSellers' && styles.bestSellerDiscountBadge,
              sectionType === 'newArrivals' && styles.newArrivalDiscountBadge
            ]}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.wishlistButton}
            onPress={(e) => {
              e.stopPropagation();
              handleWishlistToggle(productId);
            }}
          >
            {showLottie ? (
              <LottieView
                source={require('../../../../assets/lottie/animation.json')}
                autoPlay
                loop={false}
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <Ionicons 
                name={isFavourite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavourite ? "#E53E3E" : COLORS.green} 
              />
            )}
          </TouchableOpacity>
        </View>

            <View style={[
          styles.productInfo,
          sectionType === 'newArrivals' && styles.newArrivalProductInfo
        ]}>
          <Text 
            numberOfLines={sectionType === 'featured' ? 1 : 2} 
            style={[
              styles.productName,
              sectionType === 'featured' && styles.featuredName,
              sectionType === 'bestSellers' && styles.bestSellerName,
              sectionType === 'newArrivals' && styles.newArrivalName
            ]}
          >
            {item.product?.name}
          </Text>

          {sectionType !== 'featured' && (
            <View style={styles.ratingContainer}>
              <View style={[
                styles.ratingBox,
                sectionType === 'newArrivals' && styles.newArrivalRatingBox
              ]}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
              <Text style={[
                styles.ratingCount,
                sectionType === 'newArrivals' && styles.newArrivalRatingCount
              ]}></Text>
              {sectionType === 'deals' && (
                <Text style={styles.endingSoon}>Ends soon</Text>
              )}
              {sectionType === 'newArrivals' && (
                <Text style={styles.newTag}>NEW</Text>
              )}
            </View>
          )}

          <View style={[
            styles.priceContainer,
            sectionType === 'newArrivals' && styles.newArrivalPriceContainer
          ]}>
            <Text style={[
              styles.currentPrice,
              sectionType === 'featured' && styles.featuredPrice,
              sectionType === 'bestSellers' && styles.bestSellerPrice,
              sectionType === 'newArrivals' && styles.newArrivalPrice
            ]}>
              ₹{item.product?.offerPrice}
            </Text>
            {item.product?.originalPrice && (
              <Text style={[
                styles.originalPrice,
                sectionType === 'featured' && styles.featuredOriginalPrice,
                sectionType === 'bestSellers' && styles.bestSellerOriginalPrice,
                sectionType === 'newArrivals' && styles.newArrivalOriginalPrice
              ]}>
                ₹{item.product?.originalPrice}
              </Text>
            )}
          </View>

          {sectionType === 'deals' && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.random() * 100}%` }]} />
              </View>
              <Text style={styles.stockText}>Only {Math.floor(Math.random() * 20) + 5} left</Text>
            </View>
          )}

          {sectionType === 'featured' && (
            <TouchableOpacity onPress={() => onAddToCart(item)}  style={[
                        styles.addToCartButton, 
                        cartLoadingId === item._id && styles.cartButtonDisabled
                      ]}
                      disabled={cartLoadingId === item._id}
                    >
          {cartLoadingId === item._id ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.addToCartText}>Move to Cart</Text>
                      )}
            </TouchableOpacity>
          )}

          {sectionType === 'bestSellers' && (
            <View style={styles.bestSellerBadge}>
              <MaterialCommunityIcons name="crown" size={14} color="#FFF" />
              <Text style={styles.bestSellerBadgeText}>BESTSELLER</Text>
            </View>
          )}
        </View>

      </TouchableOpacity>
    );
  }, [isInWishlist, lottieStates, handleWishlistToggle, getFirstWord, onAddToCart,cartLoadingId]);

   const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ProductDetails', {productId: item?.product?._id} )} style={styles.categoryCard}>
        <View style={styles.categoryImageContainer}>
          <FastImage
         
            source={{ uri: `${IMGURL}${item.product?.images[0]}` }}
            style={styles.categoryImage}
          resizeMode={'cover'}
          />
        </View>
        <Text style={styles.categoryName} numberOfLines={1}>{item.product?.name}</Text>
      </TouchableOpacity>
    );
  };

  
  const renderBannerItem = ({ item }) => {
    return (
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={{ uri: `${IMGURL}${item.product?.images[0]}` }}
          style={styles.bannerImage}
          imageStyle={{ borderRadius: 12 }}
        >
         <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>{item.product?.name}</Text>
           <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', {productId: item?.product?._id} )}style={styles.shopNowBtn}>
             <Text style={styles.bannerSubtitle}>Shop Now</Text>
           </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };


  const renderSection = useCallback((section, index) => {
    const sectionType = getSectionType(index);
    
    return (
      <View key={section._id} style={[
        styles.sectionContainer,
        sectionType === 'featured' && styles.featuredSectionContainer,
        sectionType === 'newArrivals' && styles.newArrivalsSectionContainer
      ]}>
        {renderSectionHeader(section.title, sectionType)}
        
        {sectionType === 'categories' ? (
          <FlatList
            data={section.products}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        ) : sectionType === 'banner' ? (
          <FlatList
            data={section.products}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerContentContainer}
          />
        ) : sectionType === 'newArrivals' ? (
          <FlatList
            data={section.products}
            renderItem={(item) => renderProductItem(item, sectionType, section.title)}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={styles.newArrivalsColumnWrapper}
            contentContainerStyle={styles.newArrivalsContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        ) : sectionType === 'featured' ? (
          <View>
            <FlatList
              data={section.products.slice(0, 4)}
              renderItem={(item) => renderProductItem(item, sectionType, section.title)}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContentContainer}
            />
            <FlatList
              data={section.products.slice(4)}
              renderItem={(item) => renderProductItem(item, sectionType, section.title)}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContentContainer}
            />
          </View>
        ) : (
          <FlatList
            data={section.products}
            renderItem={(item) => renderProductItem(item, sectionType, section.title)}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
        )}
      </View>
    );
  }, [getSectionType, renderSectionHeader, renderCategoryItem, renderBannerItem, renderProductItem]);

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
        <TouchableOpacity 
          onPress={() => dispatch(fetchSections())} 
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    sections.length > 0 && (
      <FlatList
        data={sections}
        renderItem={({ item, index }) => renderSection(item, index)}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        windowSize={5} 
        initialNumToRender={3} 
        maxToRenderPerBatch={5} 
      />
    )
  );
};

export default SectionRenderer;