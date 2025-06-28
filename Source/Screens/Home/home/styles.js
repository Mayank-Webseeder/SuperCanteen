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
 fullScreenSkeleton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  skeletonHeader: {
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  skeletonSection: {
    marginBottom: 25,
  },
  skeletonTitle: {
    height: 20,
    width: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 15,
  },
  skeletonCategory: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  skeletonBrand: {
    width: 120,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  skeletonProduct: {
    width: '48%',
    height: 180,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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