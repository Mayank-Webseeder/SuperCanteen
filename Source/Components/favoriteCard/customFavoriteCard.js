import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../constants';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';

const DATA = [
  {
    id: '1',
    title: 'Sonata Premium Watch',
    price: '₹ 4,000',
    originalPrice: '₹ 6,999',
    discount: '42% OFF',
    image: require('../../../assets/MensWatch/item2.png'),
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
    image: require('../../../assets/MensWatch/item1.png'),
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
    image: require('../../../assets/MensWatch/item2.png'),
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

          <FastImage source={item.image} style={styles.image} resizeMode="contain" />

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

