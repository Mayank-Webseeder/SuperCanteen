import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";
export const styles = StyleSheet.create({
  container:{
    flex:1,backgroundColor:COLORS.white,paddingBottom:Height(30)
  },
  categories:{
  marginHorizontal:Height(5),
  marginTop:Height(10)
  },
  mainStyle:{
    marginTop:Height(20)
  },
  subTitle:{
    marginHorizontal:Width(15),
    fontSize:FontSize(12),
    fontFamily:'Inter-Regular',
    color:'#828282',
    marginBottom:Height(10),
    marginTop:Height(4)
  }
});