import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Height(8)
  },
  mainView: {
    paddingHorizontal: Height(13),
  },
  loadingContainer:{
    marginTop:Height(28)
  },
  headerView:{
    marginHorizontal:10
  },
  searchContainer: {
    marginTop: Height(5),
    alignItems: 'center',
  },
  sectionSpacing: {
    marginTop: 10,
    marginBottom: Height(5),
  },
  cardStyle:{
   borderColor:COLORS.border,
   borderWidth:1
  },
  searchResultsContainer: {
    padding: 10,
    minHeight: Height(200),
    paddingHorizontal:Height(20),
    marginTop:Height(10)
  },
  searchResultSection: {
    // marginBottom: 20,
  },
  searchSectionTitle: {
    fontSize: 18,
    fontFamily:'Inter-Bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: COLORS.gray,
  },
  contentContainerStyle:{
    paddingHorizontal:Height(4)
  },
  cardContainer:{
    marginTop:10
  },
  containerStyle:{
    marginTop:Height(-8)
  },
  marginTop:{
    marginTop: 20
  },
  offerCardContainer:{
    backgroundColor: "#F0F4F8",paddingBottom:Height(10)
  },
  rowContainer:{
    flexDirection:"row",alignItems:"center"
  },
  textStyle:{
     top: 20, fontSize: 15, fontFamily:'Inter-Bold',marginLeft:20,marginv:Height(10)
  },
  imageStyle:{
    height:20,width:20,top:20,marginHorizontal:6
  },
   main: {
    backgroundColor: COLORS.white,
    paddingTop: Height(10),
  },
  mainContainer:{
     paddingHorizontal: Height(10),
  },
    mianView: {
    paddingHorizontal: Height(20),
    paddingTop: Height(15),
  },
  categoryList:{
     marginVertical: 20
  },
  bottomSheetContainer:{
    flexDirection: 'row', marginHorizontal: 10, columnGap: 10, marginBottom: Height(15)
  },
  serachView:{
    paddingTop: 3
  },
  listContentStyle:{
    marginLeft:Width(-10)
  }
});