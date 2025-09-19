import { COLORS, Height } from "@constants/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Height(8),
    
 
  },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyText: {
    fontSize: 16, color: 'gray'
  },
  errorText: {
    fontSize: 16, color: 'red'
  },
   disabledStyle:{
      opacity:1
    },
      searchInput: {
      height: Height(34),  // Reduced height
      borderRadius: 5,     // Tighter radius
      paddingHorizontal: 12,
      fontSize: 14,        // Smaller font
     
    },
    searchView:{
   marginRight: 12,
    left:Height(8),
  },
}); 
 
 
 