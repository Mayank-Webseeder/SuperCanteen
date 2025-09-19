import { ReturnPolicyIcon } from "../../../../assets/Icons/svgIcons/returnIcon"
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // You can switch icons set
import { StoreIcon } from "../../../../assets/Icons/svgIcons/storeIcon";
import { ReturnMoneyIcon } from "../../../../assets/Icons/svgIcons/returnMoney";
import { COLORS } from "@constants/index";

export const ReturnsSection = ({returnWindow}) => {
  return (
    <View style={styles.container}>
      {/* Title */}
   
      <Text style={styles.title}>Replacement</Text>

      {/* Icons Row */}
      <View style={styles.iconsRow}>
        <View style={styles.iconItem}>
          <ReturnPolicyIcon/>
          <Text style={styles.iconText}>Would you like{'\n'}to return?</Text>
        </View>
        <View style={styles.iconItem}>
         <StoreIcon/>
          <Text style={styles.iconText}>Go to{'\n'}nearest store</Text>
        </View>
        <View style={styles.iconItem}>
         <ReturnMoneyIcon/>
          <Text style={styles.iconText}>Return and{'\n'}get replacement</Text>
        </View>
      </View>

      {/* Info Text */}
      <Text style={styles.infoText}>
        Changed your mind, or having sizing issues? Bring the product with
        original tags and invoice within <Text style={styles.boldTitle}>{returnWindow}</Text> days and get
         replacement. T&C apply.
      </Text>

      {/* Brand Owner */}
      <Text style={styles.brandOwner}>
     <Text style={styles.boldTitle}>Brand Owner</Text> - V3GR+MVF, Pradhuman Vihar, Naurangabad{'\n'}
        Aligarh, Uttar Pradesh 202001 , India
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLORS.white,

  },
  title: {
    fontSize: moderateScale(14),
    fontFamily:"Inter-SemiBold",
    marginBottom: moderateScale(12),
    color:COLORS.black,
    marginTop:2
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(12),
  },
  iconItem: {
    flex: 1,
    alignItems: "center",
  },
  iconText: {
    fontSize: moderateScale(10),
    textAlign: "center",
    marginTop: moderateScale(6),
    color:COLORS.black,
    fontFamily:"Inter-SemiBold",
    lineHeight:14
  },
  infoText: {
    fontSize: moderateScale(11.5),
    color: "#333",
    marginBottom: moderateScale(8),
    fontFamily:"Inter-Regular",
    lineHeight:18
  },
  brandOwner: {
  fontSize: moderateScale(11.5),
    color: "#333",
    marginBottom: moderateScale(12),
    fontFamily:"Inter-Regular",
    lineHeight:18
  },
  boldTitle:{
    fontFamily:"Inter-SemiBold",
  }
});
