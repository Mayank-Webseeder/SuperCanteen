import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "@constants";
import { COLORS } from "@constants/index";

export const styles = StyleSheet.create({
     categories:{
      marginHorizontal:Height(5),
      },
      textStyle:{
            fontSize: FontSize(10.5), fontFamily: 'Inter-Medium',
            width:Width(55)
      },
      imageStyle:{
            borderRadius:32
      },
      loadingContainer:{
            marginTop:Height(4)
      },
   categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize(14),
   fontFamily:"Inter-Medium",
    color: '#333',
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: COLORS.green,
    fontFamily:"Inter-Medium",
    marginRight: 4,
    fontSize: 14,
  },
   noDataText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginVertical: 10,
  },
})