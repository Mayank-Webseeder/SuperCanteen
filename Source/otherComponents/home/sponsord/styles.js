import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../constants/constants";

export const styles = StyleSheet.create({
card:{
    backgroundColor:COLORS.card
},
row:{
    flexDirection:"row",alignItems:"center"
},
textStyle:{
    top: 20, fontSize: 15, fontFamily:'Inter-SemiBold',marginLeft:20
},
iconStyle:{
    height:20,width:20,top:20,marginHorizontal:6
},
listStyle:{
    marginBottom:Height(20),marginTop:Height(32)
}
})