import { COLORS } from "@constants/index";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 12,
    marginBottom:4
  },
  label: {
    fontSize: 14,
    fontFamily:"Inter-Medium",
    marginBottom: 10,
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical:11,
    marginBottom: 10,
    backgroundColor: "#fafafaff",
  },
  selectedOption: {
    borderColor: COLORS.green,
    backgroundColor:'#e5eef1ff',
  },
  radioWrapper: {
    marginRight: 9,
  },
  info: {
    flex: 1,
  },
  size: {
    fontSize: 13.4,
    color: COLORS.text,
      fontFamily:"Inter-Regular",
  },
  price: {
   fontSize: 13.4,
     fontFamily:"Inter-Medium",
    color: COLORS.black
  },
});
