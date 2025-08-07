import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { IMGURL } from '../../../utils/dataFormatters';

const initialState = {
  selectedVariant: null,
  colorOptions: [],
  sizeOptions: [],
  availableSizesForColor: [],
  selectedColorCode: null,
  selectedSize: null,
};

function variantReducer(state, action) {
  switch (action.type) {
    case 'SET_OPTIONS':
      return {
        ...initialState,
        colorOptions: action.colorOptions,
        sizeOptions: action.sizeOptions,
      };
    case 'SELECT_COLOR':
      return {
        ...state,
        selectedColorCode: action.colorCode,
        availableSizesForColor: action.availableSizes,
        selectedSize: action.defaultSize,
        selectedVariant: action.defaultVariant,
      };
    case 'SELECT_SIZE':
      return {
        ...state,
        selectedSize: action.size,
        selectedVariant: action.variant,
      };
    case 'RESET_COLOR':
      return {
    ...state,
    selectedColorCode: null,
    selectedSize: null,
    selectedVariant: null,
    availableSizesForColor: [],
  };
    default:
      return state;
  }
}

const VariantSelector = ({ product, onVariantChange, selectionError, setSelectionError}) => {
  const [state, dispatch] = useReducer(variantReducer, initialState);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    console.log("ffffffffffff",  state.selectedVariant,
)

}, [state.selectedVariant]);

useEffect(() => {
  if (!product?.variants?.length) return;

  // Check if variants have proper color definitions
  const hasRealColors = product.variants.some(v => v.color?.code && v.color.code.trim() !== '');
  
  if (!hasRealColors) {
    // Create a "color" option for each variant
    const variantOptions = product.variants.map(variant => ({
      name: variant.size || 'Variant',
      code: variant._id, // Use variant ID as unique code
      image: getImageUrl(variant.images?.[0] || product.images?.[0]),
      variantId: variant._id
    }));

      console.log("ddddddddddddddddddddffffffff",variantOptions)


    const allSizes = new Set(
      product.variants
        .filter(v => v.size && v.size.trim().toLowerCase() !== 'free')
        .map(v => v.size)
    );

    dispatch({
      type: 'SET_OPTIONS',
      colorOptions: variantOptions,
      sizeOptions: Array.from(allSizes),
    });
    return;
  }

  // Original color-based logic
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

  dispatch({
    type: 'SET_OPTIONS',
    colorOptions: Object.values(uniqueColors),
    sizeOptions: Array.from(allSizes),
  });
}, [product?.id]);


  const getImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === 'string') return img.startsWith('http') ? img : `${IMGURL}${img}`;
    if (img.url) return img.url.startsWith('http') ? img.url : `${IMGURL}${img.url}`;
    return null;
  };


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    onVariantChange?.(state.selectedVariant);
  }, [state.selectedVariant]);

// handleColorSelect
const handleColorSelect = (option) => {
  const isSameSelected = state.selectedColorCode === option.code;

  if (isSameSelected) {
    dispatch({ type: 'RESET_COLOR' });
    onVariantChange?.(null);
    return;
  }

  // Case 1: When options have variantId (direct variant selection)
  if (option.variantId) {
    const selectedVariant = product.variants.find(v => v._id === option.variantId);
    onVariantChange?.(selectedVariant || null);
    dispatch({
      type: 'SELECT_COLOR',
      colorCode: option.code,
      availableSizes: selectedVariant?.size ? [selectedVariant.size] : [],
      defaultSize: selectedVariant?.size || null,
      defaultVariant: selectedVariant || null,
    });
    return;
  }

  // Case 2: When options are regular color options (no variantId)
  const matchingVariants = product.variants.filter(v => {
    // Match by color code if available, otherwise by color name
    if (v.color?.code) return v.color.code === option.code;
    if (v.color?.name) return v.color.name === option.name;
    return false;
  });

  // Find the first variant with this color that has a size
  const sizedVariant = matchingVariants.find(v => v.size);
  
  // Fallback to first variant if none have sizes
  const selectedVariant = sizedVariant || matchingVariants[0];

  if (!selectedVariant) {
    console.warn("No variant found for selected color");
    return;
  }

  // Get available sizes for this color
  const availableSizes = matchingVariants
    .filter(v => v.size)
    .map(v => v.size);

  // Update parent immediately
  onVariantChange?.(selectedVariant);

  dispatch({
    type: 'SELECT_COLOR',
    colorCode: option.code,
    availableSizes: [...new Set(availableSizes)],
    defaultSize: selectedVariant.size || null,
    defaultVariant: selectedVariant,
  });
};

const handleSizeSelect = async (size) => {
  const isSameSizeSelected = state.selectedSize === size;

  if (isSameSizeSelected) {
    dispatch({
      type: 'SELECT_SIZE',
      size: null,
      variant: null,
    });
    onVariantChange?.(null);
    dispatch({ type: 'RESET_COLOR' });
    return;
  }

  // Find all variants with this size
  const variantsWithSize = product.variants.filter(v => v.size === size);
  if (variantsWithSize.length === 0) return;

  let matchingVariant = null;
  let colorOptionToSelect = null;

  // Case 1: When we have a selected color
  if (state.selectedColorCode) {
    matchingVariant = variantsWithSize.find(v => {
      if (state.colorOptions.some(opt => opt.variantId)) {
        const selectedOption = state.colorOptions.find(opt => opt.code === state.selectedColorCode);
        return v._id === selectedOption?.variantId;
      } else {
        if (v.color?.code) return v.color.code === state.selectedColorCode;
        if (v.color?.name) {
          const selectedOption = state.colorOptions.find(opt => opt.code === state.selectedColorCode);
          return v.color.name === selectedOption?.name;
        }
        return false;
      }
    });
  }

  // Case 2: When no color is selected or no matching color variant found
  if (!matchingVariant) {
    matchingVariant = variantsWithSize[0];
    
    // Find matching color option
    colorOptionToSelect = state.colorOptions.find(opt => {
      if (opt.variantId) {
        return opt.variantId === matchingVariant._id;
      } else {
        if (matchingVariant.color?.code) return opt.code === matchingVariant.color.code;
        if (matchingVariant.color?.name) return opt.name === matchingVariant.color.name;
        return false;
      }
    });
  }

  // Update selection
  if (matchingVariant) {
    // First update the size selection
    dispatch({
      type: 'SELECT_SIZE',
      size,
      variant: matchingVariant,
    });
    
    // Then update the color selection if needed
    if (colorOptionToSelect) {
      dispatch({
        type: 'SELECT_COLOR',
        colorCode: colorOptionToSelect.code,
        availableSizes: [size], // Since we're selecting a specific size
        defaultSize: size,
        defaultVariant: matchingVariant,
      });
    }
    
    // Finally notify parent
    onVariantChange?.(matchingVariant);
  }
};



const renderColorOption = (option, index) => {
  const isSelected = state.selectedColorCode === option.code;

  return (
    <TouchableOpacity
      key={`${index}-${option.code}`}
      onPress={() => handleColorSelect(option)}
      style={styles.colorOption}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[
          styles.colorImageContainer,
          isSelected && styles.selectedColor,
        ]}
      >
        <FastImage
          source={{ uri: option.image }}
          style={styles.colorImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        {isSelected && (
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={14} color="#FFF" />
          </View>
        )}
      </Animated.View>
      {/* Show size label if in variant ID mode */}
    
    </TouchableOpacity>
  );
};


 const renderSizeOption = (size, index) => {
  const isSelected = state.selectedSize === size;
  
  // Determine if size is available
  let isAvailable = true;
  if (state.availableSizesForColor.length > 0) {
    isAvailable = state.availableSizesForColor.includes(size);
  }

  // Check if we're in variant ID mode
  const isVariantIdMode = state.colorOptions.some(opt => opt.variantId);
  if (isVariantIdMode) {
    // In variant ID mode, all sizes are available since each "color" is a complete variant
    isAvailable = true;
  }

  return (
    <TouchableOpacity
      key={index}
      onPress={() => isAvailable && handleSizeSelect(size)}
      style={[
        styles.sizeOption, 
        isSelected && styles.selectedSize,
        !isAvailable && styles.disabledSize,
      ]}
      disabled={!isAvailable}
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
    {state.colorOptions.length > 0 && (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Options</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorsContainer}
        >
          {state.colorOptions.map(renderColorOption)}
        </ScrollView>
      </>
    )}

    {state.sizeOptions.length > 0 && (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sizes</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sizesContainer}
        >
          {state.sizeOptions.map(renderSizeOption)}
        </ScrollView>
      </>
    )}
  </Animated.View>
);

};

export default VariantSelector;