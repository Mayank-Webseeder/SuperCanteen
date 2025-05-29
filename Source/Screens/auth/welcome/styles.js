import { StyleSheet } from "react-native";
import {  Height , Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4E7F2',
    alignItems:"center",
    justifyContent:"center"
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems:"center",
  },
  header: {
    marginTop: Height(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
   width:Height(250),
   height:Width(40)
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  cardContainer: {
    width: Width(288),
    height: Height(350),
    alignSelf: 'center',
    marginTop: Height(100),
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  buttonGroup: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 10,
    rowGap:Height(30),
    marginTop:Height(50)
  },
});
