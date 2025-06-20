import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "@constants";
import { COLORS } from "@constants/index";

export const styles = StyleSheet.create({
     categories:{
      marginHorizontal:Height(5),
      },
      textStyle:{
            fontSize: FontSize(10.5), fontFamily: 'Inter-Medium',
            width:Width(55),
          
      },
      imageStyle:{
            borderRadius:32
      },
      loadingContainer:{
            marginTop:Height(4)
      },
      image:{
        height:32,
        width:32,
        resizeMode:"contain"
      },
   categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 3,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize(13.5),
   fontFamily:"Inter-Medium",
    color: '#333',
    paddingTop:4,
    paddingBottom:5
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: COLORS.green,
    fontFamily:"Inter-Medium",
    marginRight: 4,
  fontSize: FontSize(13.5),
  },
   noDataText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginVertical: 10,
  },
  contentContainerStyle:{
     gap:0,
  }
})