import { StyleSheet } from "react-native";
import { COLORS , FontSize , Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  inputView:{
    rowGap: 10, marginTop: Height(15), marginHorizontal: Height(20)
  },
  buttonView:{
    marginTop: Height(20),
   
  },
  rowContainer:{
    flexDirection: 'row', alignItems: 'center', marginVertical: 10,
     marginTop:Width(14),
     marginHorizontal:Width(24)
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    color: COLORS.content,
    fontWeight: '600',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor:COLORS.green,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  rememberText: {
    fontSize: 13,
    color: COLORS.green,
    bottom:16,
    fontFamily:"Inter-Regular"
  },
  text:{
      fontSize: FontSize(12.5),
      fontFamily:"Inter-Regular",
      marginHorizontal:Width(9),
      color:COLORS.green
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginVertical: 20,
    marginTop:Height(30)
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#000',
    fontWeight: '600',
  },
  googleButton: {
    alignSelf: 'center',
    padding: 10,

  },
  googleIcon: {
      width: Height(40),
    height: Height(40),
    resizeMode: 'cover',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.green,
    fontFamily:"Inter-Regular"
  },
  signInText: {
     color: COLORS.green,
        fontFamily:"Inter-Medium",
        fontSize:FontSize(14)
  },
  textStyle:{
    fontSize: 16, fontFamily: 'Inter-SemiBold'
  }
});
