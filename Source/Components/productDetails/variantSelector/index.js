import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';

const VariantSelector = ({ product, onVariantChange, selectionError, setSelectionError }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === 'string') return img.startsWith('http') ? img : `${IMGURL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${IMGURL}${img.url}`;
    return null;
  };

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const uniqueColors = {};

      product.variants.forEach((variant) => {
        const { name, code } = variant.color || {};
        const key = `${name}-${code}`;
        if (!uniqueColors[key]) {
          uniqueColors[key] = {
            name: name || '',
            code: code || '',
            image: getImageUrl(variant.images?.[0] || product.images?.[0]),
            hasSizes: !!variant.size,
          };
        }
      });

      setColorOptions(Object.values(uniqueColors));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [product]);

  const trySelectVariant = (color, size) => {
    setSelectionError(null);
    let variant = product.variants.find(
      (v) =>
        v.color?.code === color?.code &&
        (!size || v.size === size || v.size?.trim().toLowerCase() === 'free')
    );

    setSelectedVariant(variant);
    onVariantChange?.(variant);
  };

  const updateAvailableSizes = (color) => {
    if (!color) return;

    const sizes = product.variants
      .filter(
        (v) =>
          v.color?.code === color.code &&
          v.size?.trim() &&
          v.size.trim().toLowerCase() !== 'free'
      )
      .map((v) => v.size);

    setAvailableSizes([...new Set(sizes)]);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    updateAvailableSizes(color);

    const requiresSize = product.variants.some(
      (v) => v.color?.code === color.code && v.size?.trim() && v.size.trim().toLowerCase() !== 'free'
    );

    if (!requiresSize) trySelectVariant(color, null);
    else setSelectionError('Please select a size for this color');
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    trySelectVariant(selectedColor, size);
  };

  const renderColorOption = (color, index) => {
    const isSelected = selectedColor?.code === color.code;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleColorSelect(color)}
        style={styles.colorOption}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[styles.colorImageContainer, isSelected && styles.selectedColor]}
        >
          {color.image ? (
            <FastImage
              source={{ uri: color.image }}
              style={styles.colorImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={24} color="#CCC" />
            </View>
          )}

          {isSelected && (
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderSizeOption = (size, index) => {
    const isSelected = selectedSize === size;
    const isAvailable = product.variants.some(
      (v) => v.size === size && v.color?.code === selectedColor?.code && v.countInStock > 0
    );

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleSizeSelect(size)}
        style={[styles.sizeOption, isSelected && styles.selectedSize]}
      
      >
        <Text
          style={[styles.sizeText, isSelected && styles.selectedSizeText]}
        >
          {size}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!product?.variants?.length) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Similar Products</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsContainer}>
        {colorOptions.map(renderColorOption)}
      </ScrollView>

      {availableSizes.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Size</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizesContainer}>
            {availableSizes.map(renderSizeOption)}
          </ScrollView>
        </>
      )}

      {selectionError && <Text style={styles.errorText}>{selectionError}</Text>}
    </Animated.View>
  );
};

export default VariantSelector;
