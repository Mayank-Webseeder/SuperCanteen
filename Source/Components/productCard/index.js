import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomProductCard = ({
  data = [],
  navigation,
  numColumns = 2,
  containerStyle
}) => {
  const [favourites, setFavourites] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

 const onToggleFavourite = (id) => {
  setFavourites((prevFavourites) => {
    if (prevFavourites.includes(id)) {
      return prevFavourites.filter(favId => favId !== id);
    } else {
      return [...prevFavourites, id];
    }
  });
};

  const handleImageLoadStart = (id) => {
    setLoadingImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id) => {
    setLoadingImages(prev => ({ ...prev, [id]: false }));
  };

  const getDisplayImage = (product) => {
    // If variant is selected, use variant image
    if (selectedVariants[product._id] && product.variants) {
      const selectedVariant = product.variants.find(
        v => v._id === selectedVariants[product._id]
      );
      if (selectedVariant?.images?.[0]) {
        return { uri: `${selectedVariant.images[0]}` };
      }
    }
    
    // Fallback to main product image
    if (product.images?.[0]) {
      return { uri: `${product.images[0]}` };
    }
    
    // Final fallback
   
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
        renderItem={({ item }) => {
          const isFavourite = favourites.includes(item.id);
          const displayImage = getDisplayImage(item);
          const isLoading = loadingImages[item.id];
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetails', {productId: item.id })}
              style={styles.card}
            >
              {/* Product Image */}
              <View style={[styles.imageContainer,{ height: SCREEN_WIDTH / 2.5}]}>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#416F81" />
                  </View>
                )}
                <FastImage
                  source={displayImage}
                  style={styles.productImage}
                  resizeMode="contain"
                  onLoadStart={() => handleImageLoadStart(item.id)}
                  onLoadEnd={() => handleImageLoadEnd(item.id)}
                />
                
                {/* Favourite Button */}
                <TouchableOpacity 
                  style={styles.favouriteButton}
                  onPress={() => onToggleFavourite(item.id)}
                >
                  <Ionicons
                    name={isFavourite ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isFavourite ? '#E53E3E' : '#2D3748'}
                  />
                </TouchableOpacity>
                
                {/* Discount Badge */}
                {item.discountPercent > 0 && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{item.discountPercent}% OFF</Text>
                  </View>
                )}
              </View>

              {/* Product Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.brandName}>{item?.brandName}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item?.name}
                </Text>
                
                {/* Price */}
             <View style={styles.priceContainer}>
 <Text style={styles.currentPrice}>₹{item.price}</Text>
    {item.mrp > item.price && (
        <Text style={styles.originalPrice}>₹{item.mrp}</Text>
    )}
</View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};



export default CustomProductCard;