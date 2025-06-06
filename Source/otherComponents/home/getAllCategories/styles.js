import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "@constants";

export const styles = StyleSheet.create({
     categories:{
      marginHorizontal:Height(5),
      marginTop:Height(10)
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
      }
})