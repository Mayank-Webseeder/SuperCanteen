import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FontSize, Height, Width } from '../constants/constants';

const DATA = [
  {
    id: '1',
    title: 'Sonata Premium Watch',
    price: '₹ 4,000',
    originalPrice: '₹ 6,999',
    discount: '42% OFF',
    image: require('../../assets/MensWatch/item2.png'),
    screen: 'ProductDetails',
    brand: 'Official Brand',
    rating: 4.2,
    reviews: 128,
  },
  {
    id: '2',
    title: 'Sonata Classic Edition',
    price: '₹ 3,499',
    originalPrice: '₹ 5,499',
    discount: '36% OFF',
    image: require('../../assets/MensWatch/item1.png'),
    screen: 'ProductDetails',
    brand: 'Official Brand',
    rating: 4.5,
    reviews: 98,
  },
  {
    id: '3',
    title: 'Sonata Sports Chrono',
    price: '₹ 4,799',
    originalPrice: '₹ 7,499',
    discount: '36% OFF',
    image: require('../../assets/MensWatch/item2.png'),
    screen: 'ProductDetails',
    brand: 'Official Brand',
    rating: 4.0,
    reviews: 64,
  },
];

const WatchCard = ({ item, useGradientBackground, isFavourite, onToggleFavourite, navigation }) => {
  const [scaleValue] = useState(new Animated.Value(1));
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const CardWrapper = useGradientBackground ? LinearGradient : View;
  const wrapperProps = useGradientBackground
    ? {
        colors: ['#FFFFFF', '#F5F9FC'],
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
        style: styles.card,
      }
    : { style: [styles.card, { backgroundColor: '#fff' }] };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigation.navigate(item.screen)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <CardWrapper {...wrapperProps}>
          {/* Prominent AD badge */}
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>SPONSORED</Text>
          </View>

          <Image source={item.image} style={styles.image} resizeMode="contain" />

          {/* Brand and rating */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>{item.brand}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewsText}>({item.reviews})</Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          
          {/* Price section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <Text style={styles.discount}>{item.discount}</Text>
          </View>

          {/* Shop Now Button */}
          <TouchableOpacity 
            style={styles.shopNowButton}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
          
          {/* Favorite button */}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => onToggleFavourite(item.id)}
          >
            <Ionicons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavourite ? COLORS.green : '#A0A0A0'}
            />
          </TouchableOpacity>
        </CardWrapper>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function CustomFavoriteCard({ whiteBg = false, listStyle, navigation }) {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <FlatList
      data={DATA}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <WatchCard
          item={item}
          useGradientBackground={!whiteBg}
          isFavourite={favourites.includes(item.id)}
          onToggleFavourite={toggleFavourite}
          navigation={navigation}
        />
      )}
      contentContainerStyle={[styles.list, listStyle]}
      showsHorizontalScrollIndicator={false}
      snapToInterval={140}
      decelerationRate="fast"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 8,
  },
  card: {
    width: Width(160),
    height: Height(250),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 16,
    padding: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  adBadge: {
    position: 'absolute',
    top: -6,
    left: 12,
    backgroundColor: '#FF6F61',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  adBadgeText: {
    color: '#fff',
    fontSize: FontSize(10),
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  brandText: {
    fontSize: FontSize(10),
    fontFamily: 'Inter-SemiBold',
    color: '#416F81',
    backgroundColor: '#E6F0F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FontSize(10),
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 2,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: FontSize(9),
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  title: {
    fontSize: FontSize(12),
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginTop: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 14,
    color: '#2E6074',
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 11,
    color: '#34C759',
    fontFamily: 'Inter-Bold',
  },
  shopNowButton: {
    backgroundColor: '#2E6074',
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E6074',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginTop:Height(4)
  },
  shopNowText: {
    color: '#fff',
    fontSize: FontSize(12),
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 6,
    zIndex: 2,
  },
});