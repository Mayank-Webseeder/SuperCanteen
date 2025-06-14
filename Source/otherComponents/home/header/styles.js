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
    marginRight: 4,
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
  },
  badgeContainer: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: '#FF3B30', // red color
  borderRadius: 10,
  minWidth: 18,
  height: 18,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 3,
  zIndex: 10,
},
badgeText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: 'bold',
},

});