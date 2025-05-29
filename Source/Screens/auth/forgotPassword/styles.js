import { StyleSheet } from "react-native";
import { COLORS , Height } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    color: COLORS.content,
    fontWeight: '600',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.green,
    fontFamily: "Inter-Regular",
    bottom:12,
    lineHeight:15
  },
  resendText: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.green,
    fontFamily: "Inter-Regular",
    marginTop: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  textStyle:{
    fontSize: 16 , fontFamily: 'Inter-SemiBold'
  },
  buttonView:{
     marginTop: Height(20)
  },
  textInputStyle:{
    rowGap: 10 , paddingHorizontal:20 ,marginTop:20
  }
});
