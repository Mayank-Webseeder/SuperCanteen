import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";
export const styles = StyleSheet.create({

   container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  mainContainer: {
    flex: 1,
  },
  lineStyle:{
   marginTop:Height(6)
  },
  horizontalLine:{
    marginTop:Height(15)
  },
  gradientHeader: {
    paddingTop: Height(9),
    paddingBottom: Height(20),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -Height(10), // Pulls content up into the gradient
  },

  categories:{
  marginHorizontal:Height(5),
  marginTop:Height(10)
  },
  subTitle:{
    marginHorizontal:Width(15),
    fontSize:FontSize(12),
    fontFamily:'Inter-Regular',
    color:'#828282',
    marginBottom:Height(10),
    marginTop:Height(4)
  },
   containerStyle:{
    marginTop:Height(-8)
  },
   listContentStyle:{
    marginLeft:Width(-10)
  },
  main:{
    height:"100%",
    width:"100%",
    backgroundColor:COLORS.white
  },
  paginationStyle:{
    marginTop:Height(11)
  },
  dotStyle:{
    height:Width(7),
    width:Width(7)
  }
});