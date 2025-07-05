import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerStyle:{
    marginHorizontal:10
  },
   disabledStyle: {
    opacity: 1
  },
   searchInput: {
    height: Height(35),  // Reduced height
    borderRadius: 5,     // Tighter radius
    paddingHorizontal: 12,
    fontSize: 14,        // Smaller font
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal:Width(18)
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.green,
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