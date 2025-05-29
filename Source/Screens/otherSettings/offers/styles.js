import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  lineStyle:{
   marginTop:Height(3)
  },
  titleStyle:{
     color:COLORS.green,
     paddingTop:Height(15),
     paddingHorizontal:Height(10),
     fontFamily:"Inter-SemiBold",
     fontSize:FontSize(16)
  },
  listContent: {
    paddingBottom: 20,
    marginHorizontal:Width(10)
  }
 

});