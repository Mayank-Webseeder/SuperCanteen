import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const VariantSelector = ({ variants = [], onVariantChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // ✅ Unique colors
  const colors = Array.from(
    new Map(variants.map(v => [v.color.code, v.color])).values()
  );

  // ✅ Unique sizes (always show all)
  const allSizes = Array.from(new Set(variants.map(v => v.size)));

  // ✅ Sizes available for the selected color
  const availableSizes = selectedColor
    ? variants.filter(v => v.color.code === selectedColor).map(v => v.size)
    : [];

  // 🔥 Auto-select first variant on mount
  useEffect(() => {
    if (variants.length > 0 && !selectedColor && !selectedSize) {
      const firstVariant = variants[0];
      setSelectedColor(firstVariant.color.code);
      setSelectedSize(firstVariant.size);
      onVariantChange?.(firstVariant);
    }
  }, [variants]);

  // 🔥 Trigger callback whenever both are selected
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        v => v.color.code === selectedColor && v.size === selectedSize
      );
      if (variant) {
        onVariantChange?.(variant);
      }
    }
  }, [selectedColor, selectedSize]);

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);

    // Auto-select first available size of this color
    const firstSize = variants.find(v => v.color.code === colorCode)?.size || null;
    setSelectedSize(firstSize);
  };

  const handleSizeSelect = (size) => {
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
    }
  };

  return (
    <View style={styles.container}>
      {/* Colors */}
      {colors.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Colors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
            {colors.map((c, i) => {
              const isSelected = selectedColor === c.code;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c.code },
                    isSelected && styles.selectedColor,
                  ]}
                  onPress={() => handleColorSelect(c.code)}
                />
              );
            })}
          </ScrollView>
        </>
      )}

      {/* Sizes (always show all) */}
      {allSizes.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Sizes</Text>
          <View style={styles.row}>
            {allSizes.map((s, i) => {
              const isAvailable = availableSizes.includes(s);
              const isSelected = selectedSize === s;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.sizeBox,
                    isSelected && styles.selectedSize,
                    !isAvailable && styles.disabledBox,
                  ]}
                  disabled={!isAvailable}
                  onPress={() => handleSizeSelect(s)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.selectedSizeText,
                      !isAvailable && styles.disabledText,
                    ]}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
  row: { flexDirection: "row", flexWrap: "wrap" },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selectedColor: { borderColor: "#007bff", borderWidth: 3 },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSize: { backgroundColor: "#007bff", borderColor: "#007bff" },
  sizeText: { color: "#333" },
  selectedSizeText: { color: "#fff" },
  disabledBox: { opacity: 0.4 },
  disabledText: { color: "#999" },
});

export default VariantSelector;
