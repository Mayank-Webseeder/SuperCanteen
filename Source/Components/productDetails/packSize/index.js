import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { COLORS } from "@constants/index";

const PackSize = ({ flatVariants, selectedVariant, onVariantChange }) => {
  useEffect(() => {
    if (flatVariants?.length > 0 && !selectedVariant) {
      onVariantChange(flatVariants[0]); // default first selection
    }
  }, [flatVariants]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>PACK SIZE</Text>
      {flatVariants.map((variant) => (
        <TouchableOpacity
          key={variant._id}
          style={[
            styles.option,
            selectedVariant?._id === variant._id && styles.selectedOption,
          ]}
          onPress={() => onVariantChange(variant)}
          activeOpacity={0.8}
        >
          {/* Radio Circle */}
          <View style={styles.radioWrapper}>
            {selectedVariant?._id === variant._id ? (
              <Icon name="radio-button-on" size={18} color={COLORS.green} />
            ) : (
              <Icon name="radio-button-off" size={18} color="#999" />
            )}
          </View>

          {/* Variant Info */}
          <View style={styles.info}>
            <Text
              style={[
                styles.size,
                selectedVariant?._id === variant._id,
              ]}
            >
              {variant.size}
            </Text>
          </View>

          {/* Price */}
          <Text style={styles.price}>₹ {variant.offerPrice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default PackSize;
