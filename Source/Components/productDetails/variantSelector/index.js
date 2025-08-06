import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';

const VariantSelector = ({ product, onVariantChange, selectionError, setSelectionError }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [availableSizesForColor, setAvailableSizesForColor] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [selectedColorCode, setSelectedColorCode] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  console.log("ddddddddddddddddd",selectedSize)
 

  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === 'string') return img.startsWith('http') ? img : `${IMGURL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${IMGURL}${img.url}`;
    return null;
  };

  useEffect(() => {
    if (!product?.variants?.length) return;

    const uniqueColors = {};
    const allSizes = new Set();

    product.variants.forEach((variant) => {
      const { name, code } = variant.color || {};
      const colorKey = `${name}-${code}`;
      if (!uniqueColors[colorKey]) {
        uniqueColors[colorKey] = {
          name: name || '',
          code: code || '',
          image: getImageUrl(variant.images?.[0] || product.images?.[0]),
        };
      }

      if (variant.size && variant.size.trim().toLowerCase() !== 'free') {
        allSizes.add(variant.size);
      }
    });

    // Only set options, no default selections
    setColorOptions(Object.values(uniqueColors));
    setSizeOptions(Array.from(allSizes));
    setAvailableSizesForColor([]); // Start with empty available sizes
    setSelectedColorCode(null);
    setSelectedSize(null);
    setSelectedVariant(null);
    onVariantChange?.(null);

  }, [product?.id]);

  


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

 const handleColorSelect = (color) => {
  if (selectedColorCode === color.code) {
    // Deselect if the same color is tapped again
    setSelectedColorCode(null);
    setAvailableSizesForColor([]);
    setSelectedSize(null);
    setSelectedVariant(null);
    onVariantChange?.(null);
    return;
  }

  const variantsWithColor = product.variants.filter(
    (v) => v.color?.code === color.code
  );

  const sizes = variantsWithColor
    .filter((v) => v.size && v.size.trim().toLowerCase() !== 'free')
    .map((v) => v.size);

  const uniqueSizes = [...new Set(sizes)];

  // Select first size by default (if available)
  const defaultSize = uniqueSizes.length > 0 ? uniqueSizes[0] : null;

  // Find the variant that matches the selected color and default size
  const defaultVariant = variantsWithColor.find(
    (v) => v.size === defaultSize
  );

  setSelectedColorCode(color.code);
  setAvailableSizesForColor(uniqueSizes);
  setSelectedSize(defaultSize);
  setSelectedVariant(defaultVariant || null);
  onVariantChange?.(defaultVariant || null);
  setSelectionError(null);
};


const handleSizeSelect = (size) => {
  // Toggle size selection
  if (selectedSize === size) {
    setSelectedSize(null);
    setSelectedVariant(null);
    onVariantChange?.(null);
    return;
  }

  const variantsWithSize = product.variants.filter(
    (v) => v.size === size
  );

  // If a color is already selected, prefer that
  let matchingVariant = null;

  if (selectedColorCode) {
    matchingVariant = variantsWithSize.find(
      (v) => v.color?.code === selectedColorCode
    );

    if (matchingVariant) {
      setSelectedSize(size);
      setSelectedVariant(matchingVariant);
      onVariantChange?.(matchingVariant);
      setSelectionError?.(null);
      return;
    }
  }

  // If no color is selected or matching variant not found with selected color,
  // default to the first variant and auto-select its color
  if (variantsWithSize.length > 0) {
    const variant = variantsWithSize[0];
    const color = variant.color;

    if (color) {
      // Get all available sizes for this color
      const sizesForColor = product.variants
        .filter((v) => v.color?.code === color.code)
        .map((v) => v.size);
      const uniqueSizes = [...new Set(sizesForColor)];

      setSelectedColorCode(color.code);
      setAvailableSizesForColor(uniqueSizes);
    }

    setSelectedSize(size);
    setSelectedVariant(variant);
    onVariantChange?.(variant);
    setSelectionError?.(null);
  } else {
    // No matching variant found
    setSelectedSize(size);
    setSelectedVariant(null);
    onVariantChange?.(null);
  }
};


  const renderColorOption = (color, index) => {
    const isSelected = selectedColorCode === color.code;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleColorSelect(color)}
        style={styles.colorOption}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.colorImageContainer, isSelected && selectedSize !== null  && styles.selectedColor]}>
          <FastImage
            source={{ uri: color.image }}
            style={styles.colorImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          {isSelected && selectedSize !== null && (
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
    const isAvailable = availableSizesForColor.includes(size);
    
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleSizeSelect(size)}
        style={[
          styles.sizeOption, 
          isSelected && styles.selectedSize,
          
             
        ]}
        
        
      >
        <Text style={[
          styles.sizeText, 
          isSelected && styles.selectedSizeText,
          
          
        ]}>
          {size}
        </Text>
      </TouchableOpacity>
    );
  };

  if (!product?.variants?.length) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Variants</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsContainer}>
        {colorOptions.map(renderColorOption)}
      </ScrollView>

      {sizeOptions.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sizes</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizesContainer}>
            {sizeOptions.map(renderSizeOption)}
          </ScrollView>
        </>
      )}


    </Animated.View>
  );
};

export default VariantSelector;