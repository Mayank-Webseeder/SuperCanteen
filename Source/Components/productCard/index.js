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
import VariantSelector from './variantSelector';
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

  console.log("DATA IS ==========>",data)

  const onToggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
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

  const getDisplayPrice = (product) => {
  const basePrice = product.offerPrice ?? product.price ?? 0;

  if (selectedVariants[product._id] && product.variants) {
    const selectedVariant = product.variants.find(
      v => v._id === selectedVariants[product._id]
    );
    if (selectedVariant?.additionalPrice) {
      return basePrice + selectedVariant.additionalPrice;
    }
  }
  
  return basePrice;
};


  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
        renderItem={({ item }) => {
          const isFavourite = favourites.includes(item._id);
          const displayImage = getDisplayImage(item);
          const displayPrice = getDisplayPrice(item);
          const isLoading = loadingImages[item._id];

          console.log("ITEM IS",item)
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
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
                  onLoadStart={() => handleImageLoadStart(item._id)}
                  onLoadEnd={() => handleImageLoadEnd(item._id)}
                />
                
                {/* Favourite Button */}
                <TouchableOpacity 
                  style={styles.favouriteButton}
                  onPress={() => onToggleFavourite(item._id)}
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
                <Text style={styles.brandName}>{item.brand?.name}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
                
                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>₹{displayPrice}</Text>
                  {item.price > displayPrice && (
                    <Text style={styles.originalPrice}>₹{item.price}</Text>
                  )}
                </View>
                
                {/* Variant Selector */}
                {item.variants?.length > 0 && (
                  <VariantSelector 
                    variants={item.variants}
                    selectedVariant={selectedVariants[item._id]}
                    onSelect={(variantId) => 
                      setSelectedVariants(prev => ({
                        ...prev,
                        [item._id]: variantId
                      }))
                    }
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};



export default CustomProductCard;