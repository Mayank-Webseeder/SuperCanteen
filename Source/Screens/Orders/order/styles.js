import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerStyle:{
  flexDirection: "row", alignItems: "center" ,marginTop:12
  },
  header:{
    flex: 1,paddingLeft:Height(14),paddingVertical:Height(16),paddingRight:5
  },
   cartPressable: {
    paddingVertical: 5,
    paddingRight:22,
    left:2
  },
   cartImg: {
    width: Width(20), 
    height: Height(20),
    tintColor: '#333',   // Optional: ensure consistent color
  },
  badgeContainer: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: COLORS.error, // red color
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

   disabledStyle: {
    opacity: 1
  },
  searchInput: {
   height: Height(34), 
    borderRadius: 5,     
    paddingHorizontal: 12,
    fontSize: 14,          // Let it grow
},
  title:{
    color:COLORS.black,
    fontFamily:"Inter-SemiBold",
    fontSize:FontSize(16),
   
  },
  orderHeaderRow: {
   flexDirection:"row",justifyContent:"space-between", paddingHorizontal:20,
   marginTop:4
    
  },
    listContent: {
    paddingVertical: Height(16),
    paddingHorizontal:Height(12)
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
    fontFamily:"Inter-Bold"
  },

});