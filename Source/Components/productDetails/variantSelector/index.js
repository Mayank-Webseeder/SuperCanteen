import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';

const VariantSelector = ({ product, onVariantChange , selectionError,setSelectionError }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Initialize with product variants
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const colors = {
        'default-default': {
          name: 'Default',
          code: 'default',
          image: getImageUrl(product.images?.[0]),
          isDefault: true,
          hasSizes: false
        }
      };
      
      product.variants.forEach(variant => {
        const key = `${variant.color.name}-${variant.color.code}`;
        if (!colors[key]) {
          colors[key] = {
            name: variant.color.name,
            code: variant.color.code,
            image: getImageUrl(variant.images?.[0] || product.images?.[0]),
            isDefault: false,
            hasSizes: variant.size !== undefined
          };
        } else {
          colors[key].hasSizes = colors[key].hasSizes || variant.size !== undefined;
        }
      });
      
      setColorOptions(Object.values(colors));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [product]);

  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === 'string') return img.startsWith('http') ? img : `${IMGURL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${IMGURL}${img.url}`;
    return null;
  };

  const updateAvailableSizes = (color) => {
    setSelectionError(null); // Clear error when updating sizes
    
    if (!color) {
      setAvailableSizes([]);
      return;
    }

    const colorOption = colorOptions.find(c => c.code === color.code);
    if (!colorOption?.hasSizes) {
      setAvailableSizes([]);
      trySelectVariant(color, null);
      return;
    }

    const sizes = product.variants
      .filter(v => 
        v.color.name === color.name && 
        v.color.code === color.code && 
        v.size
      )
      .map(v => v.size);
    setAvailableSizes([...new Set(sizes)]);
  };

 const trySelectVariant = (color, size) => {
  setSelectionError(null);

  let variant = null;

  // Default color logic
  if (!color || color.isDefault) {
    variant = product.variants.find(v =>
      (!v.color || v.color.name === 'Default' || v.color.code === 'default') &&
      (!v.size || v.size === size)
    );
  } else {
    // Check if size is required but not selected
    const requiresSize = product.variants.some(v =>
      v.color.name === color.name &&
      v.color.code === color.code &&
      v.size !== undefined
    );

    if (requiresSize && !size) {
      setSelectionError('Please select a size for this color');
      setSelectedVariant(null);
      return;
    }

    // Try to find matching variant
    variant = product.variants.find(v =>
      v.color.name === color.name &&
      v.color.code === color.code &&
      (v.size === size || (!v.size && !size))
    );
  }

  setSelectedVariant(variant);
  onVariantChange?.(variant);
};

const handleColorSelect = (color) => {
  setSelectionError(null); // Clear previous error

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

  if (color.isDefault) {
    setSelectedColor(null);
    setSelectedSize(null);
    setAvailableSizes([]);
    trySelectVariant(null, null);
    return;
  }

  setSelectedColor(color);
  setSelectedSize(null);
  updateAvailableSizes(color);

  // 🟡 NEW: check if this color requires sizes
  const hasSizes = product.variants.some(
    (v) =>
      v.color.name === color.name &&
      v.color.code === color.code &&
      v.size !== undefined
  );

  if (hasSizes) {
    setSelectionError('Please select a size for this color'); // ❗ Show immediate error
  } else {
    trySelectVariant(color, null); // No size needed
  }
};


  const handleSizeSelect = (size) => {
    setSelectionError(null); // Clear error on size selection
    setSelectedSize(size);
    trySelectVariant(selectedColor, size);
  };


  const renderColorOption = (colorOption, index) => {
    const isSelected = colorOption.isDefault 
      ? !selectedColor 
      : selectedColor?.code === colorOption.code;
    
    const imageSource = colorOption.image ? { uri: colorOption.image } : null;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleColorSelect(colorOption)}
        style={styles.colorOption}
        activeOpacity={0.7}
      >
        <Animated.View style={[
          styles.colorImageContainer,
          isSelected && styles.selectedColor,
          colorOption.isDefault && styles.defaultOption,
          { transform: [{ scale: isSelected ? scaleAnim : 1 }] }
        ]}>
          {imageSource ? (
            <FastImage 
              source={imageSource}
              style={styles.colorImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={24} color="#CCC" />
            </View>
          )}
          
          {isSelected && (
            <View style={colorOption.isDefault ? styles.defaultBadge : styles.checkBadge}>
              <Ionicons 
                name={colorOption.isDefault ? "close" : "checkmark"} 
                size={14} 
                color="#FFF" 
              />
            </View>
          )}
        </Animated.View>
        <Text style={[styles.colorName, isSelected && styles.selectedColorName]}>
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
        style={[
          styles.sizeOption,
          isSelected && styles.selectedSize,
          !isAvailable && styles.sizeDisabled,
        ]}
        disabled={!isAvailable}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.sizeText,
          isSelected && styles.selectedSizeText,
          !isAvailable && styles.sizeDisabledText
        ]}>
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
        <Text style={styles.sectionTitle}>Similar products</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.colorsContainer}
      >
        {colorOptions.map(renderColorOption)}
      </ScrollView>

      {availableSizes.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Size</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sizesContainer}
          >
            {availableSizes.map(renderSizeOption)}
          </ScrollView>
                {selectionError && (
 
    <Text style={styles.errorText}>{selectionError}</Text>
 
)}
        </>
      )}

    </Animated.View>
  );
};

export default VariantSelector;