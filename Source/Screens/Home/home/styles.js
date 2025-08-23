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
  searchPressable: {
    flex: 1,
    marginHorizontal: 10,
    marginLeft:6
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
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 120,
  },
  secondaryButtonText: {
    color: COLORS.green,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  emptyStateActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
    searchInput: {
    height: Height(34),  // Reduced height
    borderRadius: 5,     // Tighter radius
    paddingHorizontal: 12,
    fontSize: 14,        // Smaller font
    marginLeft:2
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
skeletonStyle : {
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative', // Add this
    zIndex: 1, // Add this to ensure it renders above other elements
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
  skeletonContainer: {
    padding: 16,
  },
  skeletonCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  skeletonSection: {
    marginBottom: 24,
  },
  skeletonProductGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
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
emptyContainer:{
  alignItems:"center",
  justifyContent:"center",
  flex:1
},
emptyText:{
  color:COLORS.black
}
});