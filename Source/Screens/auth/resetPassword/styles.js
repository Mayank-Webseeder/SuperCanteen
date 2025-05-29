import { StyleSheet } from "react-native";
import { COLORS  , Height } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor:COLORS.white,
    flex: 1,
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    color:COLORS.content,
    fontWeight: '600',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.green,
    fontFamily: "Inter-Regular",
    bottom:12,
    lineHeight:15
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
    color: '#888',
    fontWeight: '600',
  },
  googleButton: {
    alignSelf: 'center',
    padding: 10,

  },
  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signInText: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  inputContainer:{
    rowGap:10,marginHorizontal:20
  },
  buttonView:{
    marginTop:Height(20)
  },
  textStyle:{
    fontSize: 16 , fontFamily: 'Inter-SemiBold'
  }
});