// styles.js
import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "../../../constants";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loaderContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Height(12),
    paddingHorizontal: Width(14),
  },
  headerTitle: {
    fontSize: FontSize(20),
    fontFamily: 'Inter-Bold',
    color: COLORS.black,
  },
  itemCount: {
    fontSize: FontSize(14),
    color: COLORS.gray,
    fontFamily: 'Inter-Regular',
  },
  searchContainer: {
    marginBottom: Height(12),
     paddingHorizontal: Width(6),
  },
  searchInput: {
     height: Height(34),  // Reduced height
    borderRadius: 5,     // Tighter radius
    paddingHorizontal: 12,
    fontSize: 14,        // Smaller font
    marginHorizontal:7
  },
  categoryContainer: {
    paddingBottom: Height(8),
  },
  categoryScroll: {
    paddingHorizontal: Width(10),
  },
  categoryItem: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeCategoryItem: {
    backgroundColor:COLORS.green,
    borderColor:COLORS.green,
  },
  categoryText: {
    fontSize: FontSize(13),
    color: COLORS.black,
    fontFamily: 'Inter-Medium'
  },
  activeCategoryText: {
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold'
  },
  listContainer: {
    paddingBottom: Height(20),
     paddingHorizontal:Height(8),
    paddingVertical:8,
     
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Height(8),
 
  },
  card: {
    width: Width(152),
    borderRadius: 16,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    position: 'relative',
    padding: Height(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: Height(12),
    marginHorizontal:10,
    left:3

  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: Height(140),
    marginBottom: Height(8),
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: FontSize(13),
    color: COLORS.black,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Height(4),
    lineHeight: Height(18),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Height(6),
  },
  price: {
    fontSize: FontSize(15),
    fontFamily: 'Inter-Bold',
    color: COLORS.black,
    marginRight: Width(6),
  },
  originalPrice: {
    fontSize: FontSize(12),
    color: COLORS.gray,
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Height(8),
  },
  stars: {
    flexDirection: 'row',
    marginRight: Width(4),
  },
  reviewText: {
    fontSize: FontSize(11),
    color: COLORS.gray,
    fontFamily: 'Inter-Regular',
  },
  cartButton: {
    backgroundColor:COLORS.green,
    paddingVertical: Height(8),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  cartButtonDisabled: {
  backgroundColor: '#cccccc', // or COLORS.gray if you have a gray color defined
  paddingVertical: Height(8),
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
cartButtonTextDisabled: {
  color: '#888888',
  fontWeight: 'bold',
  fontSize: 14,
},
  cartButtonText: {
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: FontSize(12),
  },

  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Height(80),
  },
  containerStyle:{
   paddingTop:10
  },
  noDataTitle: {
    fontSize: FontSize(18),
    color: COLORS.black,
    fontFamily: 'Inter-Bold',
    marginBottom: Height(4),
  },
  noDataText: {
    fontSize: FontSize(14),
    color: COLORS.gray,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: Width(40),
  },
    emptyIcon: {
    marginBottom: 20,
    color: '#2E6074', // Or any color that matches your theme
  },
  errorContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
errorText: {
  color: COLORS.red,
  textAlign: 'center',
  marginVertical: 10,
},
retryButton: {
  backgroundColor: COLORS.green,
  padding: 10,
  borderRadius: 5,
  marginTop: 15,
},
retryButtonText: {
  color: 'white',
  fontWeight: 'bold',
},

});