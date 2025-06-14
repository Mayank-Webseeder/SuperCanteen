import { StyleSheet } from "react-native";
import { Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Height(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  searchPressable: {
    flex: 1,
    marginRight: 10,
  },
  cartPressable: {
    padding: 5,
  },
  searchInput: {
    height: Height(35),  // Reduced height
    borderRadius: 8,     // Tighter radius
    paddingHorizontal: 12,
    fontSize: 14,        // Smaller font
  },
  cartImg: {
    width: Width(20), 
    height: Height(20),
    tintColor: '#333',   // Optional: ensure consistent color
  },
  disabledStyle: {
    opacity: 1
  }
});