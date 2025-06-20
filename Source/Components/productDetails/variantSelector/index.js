import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { COLORS } from '@constants/index';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';

const VariantSelector = ({ product, onVariantChange }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const colors = {};
      product.variants.forEach(variant => {
        const key = `${variant.color.name}-${variant.color.code}`;
        if (!colors[key]) {
          colors[key] = {
            name: variant.color.name,
            code: variant.color.code,
            image: variant.images?.[0] || null,
          };
        }
      });
      setColorOptions(Object.values(colors));

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }).start();
    }
  }, [product]);

  const updateAvailableSizes = (color) => {
    const sizes = product.variants
      .filter(v => v.color.name === color.name && v.color.code === color.code && v.size)
      .map(v => v.size);
    setAvailableSizes([...new Set(sizes)]);
  };

  const trySelectVariant = (color, size) => {
    console.log("Trying to select variant with:", { color, size });

    const variant = product.variants.find(v =>
      v.color.name === color.name &&
      v.color.code === color.code &&
      (v.size === size || !v.size || size === null)
    );

    if (variant) {
      console.log("Variant selected:", variant);
      setSelectedVariant(variant);
      if (typeof onVariantChange === 'function') {
        onVariantChange(variant);
      }
    } else {
      console.log("No matching variant found for:", { color, size });
    }
  };

  const handleColorSelect = (color) => {
    // console.log("Color selected:", color);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 300,
        useNativeDriver: true
      })
    ]).start();

    setSelectedColor(color);
    setSelectedSize(null);
    updateAvailableSizes(color);

    const hasSizes = product.variants.some(v =>
      v.color.name === color.name &&
      v.color.code === color.code &&
      v.size
    );

    // if (!hasSizes) {
      trySelectVariant(color, null);
    // }
  };

  const handleSizeSelect = (size) => {
    console.log("Size selected:", size);
    setSelectedSize(size);
    if (selectedColor) {
      trySelectVariant(selectedColor, size);
    }
  };

  const renderColorOption = (colorOption, index) => {
    const isSelected = selectedColor?.code === colorOption.code;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleColorSelect(colorOption)}
        style={styles.colorOption}
      >
        <Animated.View style={[
          styles.colorImageContainer,
          isSelected && styles.selectedColor,
          { transform: [{ scale: isSelected ? scaleAnim : 1 }] }
        ]}>
          {colorOption.image && (
            <FastImage 
              source={{ uri: `${IMGURL}${colorOption.image}` }} 
              style={styles.colorImage}
              resizeMode="cover"
            />
          )}
          {isSelected && (
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
          )}
        </Animated.View>
        <Text style={[styles.colorName, isSelected && styles.selectedColorName]} numberOfLines={1}>
          {colorOption.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSizeOption = (size, index) => {
    const isSelected = selectedSize === size;
    const isAvailable = product.variants.some(v => 
      v.size === size && 
      v.color.name === selectedColor?.name && 
      v.color.code === selectedColor?.code &&
      v.countInStock > 0
    );
    return (
      <TouchableOpacity
        key={index}
        onPress={() => isAvailable && handleSizeSelect(size)}
        style={[styles.sizeOption, isSelected && styles.selectedSize, !isAvailable && styles.sizeDisabled]}
        disabled={!isAvailable}
      >
        <Text style={[styles.sizeText, isSelected && styles.selectedSizeText, !isAvailable && styles.sizeDisabledText]}>
          {size}
        </Text>
        {!isAvailable && <View style={styles.sizeOverlay} />}
      </TouchableOpacity>
    );
  };

  if (!product?.variants?.length) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Select Color</Text>
        {selectedColor && <Text style={styles.selectedColorText}>{selectedColor.name}</Text>}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsContainer}>
        {colorOptions.map(renderColorOption)}
      </ScrollView>

      {availableSizes.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            {selectedSize && <Text style={styles.selectedSizeText}>Size: {selectedSize}</Text>}
          </View>
          <View style={styles.sizesContainer}>
            {availableSizes.map(renderSizeOption)}
          </View>
        </>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ₹{selectedVariant ? product.offerPrice + selectedVariant.additionalPrice : product.offerPrice}
          </Text>
          {product.mrp > product.offerPrice && (
            <Text style={styles.originalPrice}>
              ₹{product.mrp + (selectedVariant?.additionalPrice || 0)}
            </Text>
          )}
          <Text style={styles.discount}>
            {Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)}% OFF
          </Text>
        </View>

        {selectedVariant && (
          <View style={styles.stockContainer}>
            <Ionicons 
              name={selectedVariant.countInStock > 0 ? 'checkmark-circle' : 'close-circle'}
              size={16} 
              color={selectedVariant.countInStock > 0 ? COLORS.green : COLORS.error} 
            />
            <Text style={[styles.stockText, { color: selectedVariant.countInStock > 0 ? COLORS.green : COLORS.error }]}>
              {selectedVariant.countInStock > 0 ? `${selectedVariant.countInStock} in stock` : 'Out of stock'}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default VariantSelector;
