import { COLORS } from "@constants/index";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PackSize = ({ item, selected, onSelect }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}
      style={[
        styles.packSizeContainer,
        selected ? styles.packSizeSelected : null,
      ]}
      onPress={() => onSelect(item)}
    >
      {/* Radio Button */}
       <View style={styles.radioCircle}>
        {selected && <View style={styles.radioDot} />}
      </View> 

      {/* Weight */}
     <Text style={styles.weightText}>
        {item.weight} {item.weightUnit}
      </Text> 

      {/* Price (aligned right) */}
       <Text style={styles.priceText}>₹ {item.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  packSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.aliceBlue,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
     marginHorizontal:9,
     marginLeft:5,
     paddingVertical:10,
     marginBottom:17
  },
  packSizeSelected: {
  backgroundColor:COLORS.aliceBlue,
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 5,
    backgroundColor: COLORS.green,
    marginBottom:0.4
  },
  weightText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    fontFamily:"Inter-Regular"
  },
  priceText: {
    fontSize: 14,
    color:COLORS.modalTitle,
    fontFamily:"Inter-Medium"
  },
});

export default PackSize;