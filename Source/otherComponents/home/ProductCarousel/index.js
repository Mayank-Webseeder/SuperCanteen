import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  StyleSheet
} from 'react-native';
import { Height, Width } from '@constants';
import { COLORS } from '@constants/index';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderRow from '../headerRow';
import { styles } from './styles';
const IMG_URL = 'https://super-canteen-backend.onrender.com';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = Height(190);

const ProductCarousel = ({ products, navigation, horizontal = horizontal ? horizontal : false, title = 'The Swipe & Shop Spectacular' }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // Calculate grid item width for perfect alignment
  const gridItemWidth = (width - Width(40)) / 3; // 10px padding on each side + 10px gap between items

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
          marginHorizontal: horizontal ? Width(8) : Width(3),
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
              marginTop: isGrid ?  Height(10) : "",
              marginHorizontal: isGrid ? 2 : "",
               left: !isGrid ? Height(5) : ""
            },
          ]}
        >
          {/* Product Image with Badges */}
          <View style={[styles.imageContainer, { height: isGrid ? '50%' : '58%' }]}>
            <Image
              source={{ uri: `${IMG_URL}${item.images[0]}` }}
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

            {/* Wishlist Button */}
            <TouchableOpacity
              style={[styles.wishlistButton, isGrid && styles.gridWishlistButton]}
              onPress={() => console.log('Add to wishlist')}
            >
              <MaterialIcons 
                name="favorite-border" 
                size={isGrid ? 16 : 20} 
                color={COLORS.white} 
              />
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

            {/* Price */}
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
          contentContainerStyle={[styles.gridContentContainer,{marginTop: horizontal ? Height(10) : ""}]}
        />
      )}
    </View>
  );
};


export default ProductCarousel;