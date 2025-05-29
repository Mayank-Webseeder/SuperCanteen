import { StyleSheet } from "react-native";
import { COLORS , FontSize , Height } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  main:{
    rowGap: 8,
    marginTop:Height(15)
  },
  mainContainer:{
    marginHorizontal:Height(20)
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  textStyle:{
    fontSize: 16 , fontFamily: 'Inter-SemiBold'
  },
  checkbox: {
    width: 19,
    height: 19,
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 10,
    fontSize: FontSize(15),
    color: '#2E60749C',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    marginVertical: 20,
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
    fontSize:FontSize(15)
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
});