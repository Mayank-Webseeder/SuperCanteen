import { COLORS } from "@constants/index";
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VariantSelector = ({ variants = [], onVariantChange, setSelectionError }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ Unique colors
  const colors = Array.from(
    new Map(
      variants.map(v => [v.colorCode, { code: v.colorCode, name: v.colorName }])
    ).values()
  );

  // ✅ Unique sizes (for all variants)
  const allSizes = Array.from(new Set(variants.map(v => v.size).filter(Boolean)));

  // ✅ Sizes available for selected color
  const availableSizes = selectedColor
    ? variants.filter(v => v.colorCode === selectedColor).map(v => v.size)
    : [];

  // ✅ Default select first color + size on mount
  useEffect(() => {
    if (variants.length > 0 && !selectedColor && !selectedSize) {
      const first = variants[0];
      setSelectedColor(first.colorCode);
      setSelectedSize(first.size);
    }
  }, [variants]);

  // ✅ Trigger callback only when both selected
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        v => v.colorCode === selectedColor && v.size === selectedSize
      );
      if (variant) {
        onVariantChange?.(variant);
        setSelectionError?.(null);
      }
    }
  }, [selectedColor, selectedSize]);

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
    // auto-select first available size for this color
    const firstSize = variants.find(v => v.colorCode === colorCode)?.size;
    setSelectedSize(firstSize || null);
  };

  const handleSizeSelect = (size) => {
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
      setSelectionError?.(null);
    } else {
      setSelectionError?.("Selected size is not available");
    }
  };

  return (
    <View style={styles.container}>
      {/* Colors Section */}
      {colors.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Color</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.colorsContainer}
          >
            {colors.map((color, index) => {
              const isSelected = selectedColor === color.code;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.colorItem}
                  onPress={() => handleColorSelect(color.code)}
                >
                  <View style={[
                    styles.colorCircle,
                    { backgroundColor: color.code || '#ccc' },
                    isSelected && styles.selectedColor,
                  ]}>
                    {isSelected && (
                      <MaterialIcons 
                        name="check" 
                        size={16} 
                        color={COLORS.green} 
                      />
                    )}
                  </View>
                  <Text style={styles.colorName}>{color.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Sizes Section */}
      {allSizes.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle,{marginBottom:7}]}>Select Size</Text>
          <View style={styles.sizesContainer}>
            {allSizes.map((size, index) => {
              const isAvailable = availableSizes.includes(size);
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeBox,
                    isSelected && styles.selectedSizeBox,
                    !isAvailable && styles.disabledSizeBox,
                  ]}
                  disabled={!isAvailable}
                  onPress={() => handleSizeSelect(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    isSelected && styles.selectedSizeText,
                    !isAvailable && styles.disabledText,
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 12, paddingHorizontal:16 },
  section: { marginBottom: 10,marginTop:10 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textTransform:"uppercase",
  },
  colorsContainer: { paddingRight: 8 },
  colorItem: { marginRight: 10, alignItems: "center" },
  colorCircle: {
    width: 32, height: 32, borderRadius: 18,
    borderWidth: 1.5, borderColor: '#e0e0e0',
    justifyContent: 'center', alignItems: 'center',
  },
  selectedColor: { borderColor: COLORS.green, borderWidth: 1 },
  colorName: { fontSize: 12, marginTop: 4, textAlign: "center", color: '#333',    fontFamily: 'Inter-Regular'},
  sizesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8,marginTop:4 },
  sizeBox: {
    minWidth: 44, height: 36, borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 6,
    paddingHorizontal: 10, justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#fff',
  },
  selectedSizeBox: { backgroundColor: COLORS.green, borderColor:COLORS.green },
  disabledSizeBox: { opacity: 0.4 },
  sizeText: { fontSize: 13, fontWeight: '500', color: '#333', fontFamily: 'Inter-Medium' },
  selectedSizeText: { color: '#fff', fontWeight: '600' },
  disabledText: { color: '#999' },
});

export default VariantSelector;
