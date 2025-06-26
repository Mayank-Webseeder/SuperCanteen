import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";
export const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
mainContent: {
  backgroundColor: '#fff',
  paddingBottom: Height(20),
},

footerContainer: {
  padding: 16,
  borderTopWidth: 1,
  borderColor: '#ccc',
  backgroundColor: '#f9f9f9',
  marginTop: 10,
  alignItems: 'center',
},
footerRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  marginBottom: 10,
},
footerItem: {
  alignItems: 'center',
},
footerIcon: {
  width: Width(30),
  height: Height(30),
  marginBottom: 4,
},
footerText: {
  fontSize: 12,
  color: '#333',
},
appVersion: {
  fontSize: 12,
  color: '#999',
  marginTop: 8,
},
  mainContainer: {
    flex: 1,
  },
  lineStyle:{
   marginTop:Height(4)
  },
  horizontalLine:{
    marginTop:Height(15)
  },
  mainStyle:{
    marginHorizontal:4
  },
  gradientHeader: {
    overflow: 'hidden',
  },
  categories:{
  marginHorizontal:Height(5),
  marginTop:Height(10)
  },
  subTitle:{
    marginHorizontal:Width(15),
    fontSize:FontSize(12),
    fontFamily:'Inter-Regular',
    color:'#828282',
    marginBottom:Height(10),
    marginTop:Height(4)
  },
   containerStyle:{
    marginTop:Height(-8)
  },
   listContentStyle:{
    marginLeft:Width(-10)
  },
  main:{
    height:"100%",
    width:"100%",
    backgroundColor:COLORS.white
  },
  paginationStyle:{
    marginTop:Height(11)
  },
  dotStyle:{
    height:Width(7),
    width:Width(7)
  },
  imageStyle:{
     height:Height(150),
    width:"100%",
    resizeMode:"cover",
    borderRadius:0,
  
  },
  contentContainerStyle:{
    paddingHorizontal:15
  },
  cardStyle:{
    borderWidth:0,
    padding:0
  },
  // Skeleton Styles
skeletonCategoryContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 15,
  paddingVertical: 10,
},
skeletonCategory: {
  width: 60,
  alignItems: 'center',
},
skeletonCategoryImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#e1e1e1',
},
skeletonCategoryText: {
  width: 50,
  height: 10,
  backgroundColor: '#e1e1e1',
  marginTop: 5,
  borderRadius: 5,
},
skeletonBrandContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 15,
},
skeletonBrand: {
  width: 100,
  height: 50,
  backgroundColor: '#e1e1e1',
  borderRadius: 10,
},
skeletonProductContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: 15,
},
skeletonProduct: {
  width: '48%',
  marginBottom: 15,
},
skeletonProductImage: {
  width: '100%',
  height: 150,
  backgroundColor: '#e1e1e1',
  borderRadius: 10,
},
skeletonProductText: {
  width: '80%',
  height: 12,
  backgroundColor: '#e1e1e1',
  marginTop: 8,
  borderRadius: 4,
},
skeletonProductPrice: {
  width: '50%',
  height: 12,
  backgroundColor: '#e1e1e1',
  marginTop: 8,
  borderRadius: 4,
},
errorContainer: {
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
errorText: {
  color: COLORS.red,
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 15,
},
retryButton: {
  backgroundColor: COLORS.green,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
},
retryButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
});