import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const CustomSimilarProducts = ({
  cardWidth = 160,
  data,
  navigation,
  flatListContentStyle,
  onAddToCart
}) => {
  const renderItem = ({ item }) => {
    const fullStars = Math.floor(item.rating || 0);
    const stars = [...Array(5)].map((_, i) => (
      <FontAwesome
        key={i}
        name={i < fullStars ? 'star' : 'star-o'}
        size={10}
        color={i < fullStars ? '#4CAF50' : '#CFCFCF'}
        style={{ marginRight: 2 }}
      />
    ));

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
        activeOpacity={0.8}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.image}
              resizeMode="cover"
            />
            
            {/* Wishlist Button */}
            <TouchableOpacity style={styles.wishlistButton}>
              <Ionicons name="heart-outline" size={18} color="#000" />
            </TouchableOpacity>
            
            {/* Discount Badge */}
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>
          
          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.brand}>{item.brand || 'Brand'}</Text>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            
            {/* Price Section */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}</Text>
              {item.mrp && item.price < item.mrp && (
                <Text style={styles.originalPrice}>₹{item.mrp}</Text>
              )}
            </View>
            
            {/* Rating Section */}
            {item.rating > 0 && (
              <View style={styles.ratingContainer}>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  <FontAwesome name="star" size={10} color="#fff" />
                </View>
                <Text style={styles.reviews}>({item.reviews || 0})</Text>
              </View>
            )}
            
            {/* Add to Cart Button */}
         <TouchableOpacity onPress={() => onAddToCart(item)} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
         </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.flatListContent,{...flatListContentStyle}]}
    />
  );
};


export default CustomSimilarProducts;