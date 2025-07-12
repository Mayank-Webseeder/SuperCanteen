import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FontSize, Width } from '@constants/index';
import { Height } from '@constants/index';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  sectionContainer: {
    marginBottom: 14,
    marginTop:4
    
  },
  featuredSectionContainer: {
    marginBottom: 10,
  },
  newArrivalsSectionContainer: {
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dealsHeader: {
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginBottom: 0,
    marginLeft:13,
    marginRight:11
  },
  newArrivalsHeader: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
    paddingBottom: 6,
    marginTop:4
  },
  sectionTitle: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-SemiBold',
    marginHorizontal:6
  },
  dealsTitle: {
    color: COLORS.black,
    fontFamily:"Inter-SemiBold",
    fontSize:FontSize(14),
    right:12,
   
  },
  // Product Cards
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
    marginBottom:1,
  
  },
featuredCard: {
  width: width * 0.45,
  marginRight: 12,
 
},
  dealCard: {
backgroundColor:"#FFFAF3",
elevation:3,
    width: width * 0.65,
    marginRight: 12,
    paddingBottom:0,
    marginVertical:1
    
  },
 
  bestSellerCard: {
    width: width * 0.45,
    marginRight: 12,
    position: 'relative',
  },
  newArrivalCard: {
    width: (width / 2) - 24,
    margin: 8,
    borderRadius: 10,
  },

  // Image Containers
  imageContainer: {
    position: 'relative',
  },
  featuredImageContainer: {
    height: 180,
  },
  dealImageContainer: {
    height: 140,
    backgroundColor: '#FFF',
  },
  bestSellerImageContainer: {
    height: 160,
    backgroundColor: '#FFF',
  },
  newArrivalImageContainer: {
    height: 150,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  featuredImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dealImage: {
    backgroundColor: '#FFF',
  },
  bestSellerImage: {
    backgroundColor: '#FFF',
  },
  newArrivalImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  // Badges
  ribbon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    zIndex: 2,
  },
  dealRibbon: {
    backgroundColor: '#F57C00',
  },
  bestSellerRibbon: {
    backgroundColor: '#FFA000',
  },
  newArrivalRibbon: {
    backgroundColor: '#00C853',
  },
  ribbonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  discountBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF5722',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    zIndex: 2,
  },
  dealDiscountBadge: {
    backgroundColor: '#E53935',
  },
  bestSellerDiscountBadge: {
    backgroundColor: '#FF6D00',
  },
  newArrivalDiscountBadge: {
    backgroundColor: '#00C853',
  },
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 2,
  },
  newArrivalWishlistButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  // Product Info
  productInfo: {
    padding: 12,
    position: 'relative',
  },
  newArrivalProductInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
  },
  featuredName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  bestSellerName: {
    paddingRight: 60,
  },
  newArrivalName: {
    fontSize: 13,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  newArrivalRatingBox: {
    backgroundColor: '#E8F5E9',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontFamily: 'Roboto-Medium',
  },
  ratingCount: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'Roboto-Regular',
  },
  newArrivalRatingCount: {
    color: '#666',
  },
  newTag: {
    fontSize: 10,
    color: '#00C853',
    marginLeft: 'auto',
    fontFamily: 'Roboto-Bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  newArrivalPriceContainer: {
    marginTop: 2,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    fontFamily: 'Roboto-Bold',
  },
  featuredPrice: {
    fontSize: 18,
  },
  bestSellerPrice: {
    color: COLORS.black,
  },
  newArrivalPrice: {
    fontSize: 15,
  },
  originalPrice: {
    fontSize: 13,
    color:COLORS.green,
    marginLeft: 8,
    textDecorationLine: 'line-through',
    fontFamily: 'Roboto-Regular',
  },
  featuredOriginalPrice: {
    fontSize: 14,
  },
  bestSellerOriginalPrice: {
    color: '#888',
  },
  newArrivalOriginalPrice: {
    fontSize: 12,
  },

  // Best Seller Badge
  bestSellerBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#FFA000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    zIndex: 2,
  },
  bestSellerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },


  // Add to Cart Button
  addToCartButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
    cartButtonDisabled: {
    backgroundColor: '#cccccc', // or COLORS.gray if you have a gray color defined
    paddingVertical: Height(8),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Categories
  categoriesContainer: {
    paddingHorizontal: 8,
  },
  categoryCard: {
    width: 100,
    marginRight: 8,
    alignItems: 'center',
  },
  categoryImageContainer: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 2,
  marginBottom: 12,
  overflow: 'hidden',
 
},
categoryImage: {
  width: '100%',
  height: '100%',
  borderRadius: 40,

},

  categoryName: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    marginHorizontal:18
  },

  // Banner
  bannerContainer: {
    width: width - 32,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    marginTop:8
  },
  bannerImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
      backgroundColor: '#74B3C7',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 15,
    marginBottom: 4,
    fontFamily:"Inter-Medium",
      fontStyle: 'italic',
    
  },
  shopNowBtn:{
   backgroundColor:COLORS.green,
   paddingHorizontal:4,
   paddingVertical:6,
   width:Width(90),
   alignItems:"center",
   justifyContent:"center",
   borderRadius:4,
   marginVertical:8
   
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 14,
    fontFamily:"Inter-SemiBold"
  },
  bannerContentContainer: {
    paddingTop: 7,
  },

  // Section Content Containers
  productsContainer: {
    paddingHorizontal: 8,
  },
  featuredContentContainer: {
  paddingHorizontal: 16,
  paddingBottom: 1,
},
  dealsContentContainer: {
    paddingLeft: 6,
  
  },
  newArrivalsContentContainer: {
    paddingVertical: 8,

  },
  newArrivalsColumnWrapper: {
    justifyContent: 'space-between',
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop:20
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF'
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Roboto-Medium',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  whishlistButton:{
    position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: COLORS.green,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
  },
  title:{
    fontSize: 16, fontFamily:"Inter-SemiBold", marginHorizontal: 22, 
    marginTop:13,
    marginBottom:6
  },
  titleStyle:{
  marginBottom: 12,
  },
  horiZontal:{
  width: '100%', height: 1, backgroundColor: '#F3F4F5'
  },
  name:{
    fontSize: 13, marginBottom: 4,
    fontFamily:"Inter-SemiBold",
    lineHeight:22
  },
  titleContainer:{
    paddingVertical: 8 ,
paddingHorizontal:10,
  },
  price:{
    fontSize: 14, fontFamily:"Inter-Bold",
    marginVertical:Height(2)
  }
 
});