import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "../../../constants/constants";

export const styles = StyleSheet.create({
  main:{
    flexDirection: 'row', alignItems: 'center', columnGap: Width(10),justifyContent:"space-between",paddingHorizontal:Width(10) ,
    marginTop:Height(20)
  },
  innerView:{
    flexDirection:"row",
    alignItems:"center"
  },
   top:{
    marginTop:Height(2)
  },
  textStyle:{
    fontSize: FontSize(13.5) , marginHorizontal:10,fontFamily:'Inter-SemiBold'
  },
  image:{
     height: Height(24), width: Width(28),resizeMode:"cover" 
  },
  searchContainer:{
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, paddingVertical: 8, justifyContent: 'space-between',marginTop:Height(7) 
  },
  searchView:{
    flex: 1, marginRight: 12
  },
  cartImg:{
    width: Width(17), height: Height(17),right:Height(2)
  },
  disabledStyle:{
    opacity:1
  }

})