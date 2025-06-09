import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Width } from '../../constants';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  // Group variants by type (color, size, etc.)
  const variantTypes = {};
  
  variants.forEach(variant => {
    if (variant.color) {
      variantTypes.color = variantTypes.color || [];
      variantTypes.color.push(variant);
    }
    if (variant.size) {
      variantTypes.size = variantTypes.size || [];
      variantTypes.size.push(variant);
    }
  });

  return (
    <View style={styles.container}>
      {Object.entries(variantTypes).map(([type, options]) => (
        <View key={type} style={styles.variantTypeContainer}>
          <Text style={styles.variantTypeLabel}>
            {type.charAt(0).toUpperCase() + type.slice(1)}:
          </Text>
          <View style={styles.optionsContainer}>
            {options.map(option => (
              <TouchableOpacity
                key={option._id}
                style={[
                  styles.optionButton,
                  type === 'color' && styles.colorOption,
                  selectedVariant === option._id && styles.selectedOption,
                  type === 'color' && selectedVariant === option._id && styles.selectedColorOption,
                  type === 'color' && { backgroundColor: option.color.toLowerCase() }
                ]}
                onPress={() => onSelect(option._id)}
              >
                {type === 'size' && (
                  <Text style={[
                    styles.optionText,
                    selectedVariant === option._id && styles.selectedOptionText
                  ]}>
                    {option.size}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  variantTypeContainer: {
    marginBottom: 8,
  },
  variantTypeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
    marginBottom: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E0',
  },
  selectedOption: {
    borderColor: '#416F81',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#416F81',
  },
  optionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
  },
  selectedOptionText: {
    color: '#416F81',
    fontFamily: 'Inter-SemiBold',
  },
});

export default VariantSelector;