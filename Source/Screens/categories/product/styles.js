import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Height(8),
 
  },
  loadingContainer:{
    marginTop:Height(28)
  },
  headerView:{
    marginHorizontal:10,

  },
  skeletonContainer: {
    padding: 16,
  },
  errorContainer: {
    marginVertical: Height(20),
    paddingHorizontal: 16,
  },
   searchView:{
    flex: 1, marginRight: 12,
    marginBottom:Height(20),
    marginTop:Height(3),
    left:Height(8)
  },
  searchContainer: {
    marginTop: Height(5),
    alignItems: 'center',
  },
  sectionSpacing: {
    marginBottom: Height(5),
  },
  CasualStyle:{
    marginTop:0
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
    marginTop:Height(-18)
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
  text:{
       fontSize: FontSize(10.5), fontFamily: 'Inter-Medium',
               width:Width(55)
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
     marginTop:Height(8)
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: 300,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
  },
  emptyStateActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#008ECC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 120,
  },
  primaryButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#008ECC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 120,
  },
  secondaryButtonText: {
    color: '#008ECC',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
    mianView: {
    paddingHorizontal: Height(20),
    paddingTop: Height(15),
  },
  categoryList:{
     marginVertical: 1,
     marginBottom:20,
     paddingHorizontal:10
  },
  bottomSheetContainer:{
    flexDirection: 'row', marginHorizontal: 20, columnGap: 10, marginBottom: Height(6),
    marginTop:2
  },
  serachView:{
    paddingTop: 3
  },
  listContentStyle:{
    marginLeft:Width(-10),
    marginBottom:Height(30)
  },
  productContainer:{
    paddingHorizontal:Width(10)
  },
   disabledStyle:{
    opacity:1
  }
  
});