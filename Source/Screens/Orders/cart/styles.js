import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../constants";

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  contentContainerStyle:{
    paddingBottom:Height(20)
  },
  addressView:{
    paddingHorizontal:Height(10),paddingTop:Height(2)
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom:Height(12)
  },
  sortButton: {flexDirection: 'row', alignItems: 'center'},
  blankView:{
    height:Height(15)
  },
  main:{
 paddingHorizontal: 12,
  },
  termsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  termsText: {marginLeft: 8, fontSize: 12,fontFamily:'Inter-Medium'},
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor:COLORS.white,
    padding: 12,
  },
  selectionBtn: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#005c71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {color:COLORS.white, fontWeight: '600'},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});