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
     fontSize:FontSize(16),
     marginBottom:Height(1)
  },
  listContent: {
    paddingBottom: 20,
    marginHorizontal:Width(10)
  },
  loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
errorText: {
  color: 'red',
  textAlign: 'center',
  marginTop: 20
}
 

});