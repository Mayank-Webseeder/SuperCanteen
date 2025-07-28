import { Height, Width,COLORS } from "@constants/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: Height(20),
  },
  flatListContent: {
    paddingHorizontal: Width(10),
    paddingTop: Height(10),
  },
  gridContentContainer: {
    paddingHorizontal: Width(10),
    // paddingTop: Height(10),
    paddingBottom: Height(10),
    // marginTop:Height(10),
    
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: Width(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
  
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: '#F8F8F8',
    borderRadius: Width(8),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Height(5),
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: Width(8),
    paddingVertical: Height(2),
    borderRadius: Width(12),
    zIndex: 1,
  },
  gridDiscountBadge: {
    paddingHorizontal: Width(6),
    paddingVertical: Height(1),
    top: 6,
    left: 6,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: "Inter-SemiBold",
    includeFontPadding: false,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
     backgroundColor: COLORS.green,
    width: Width(28),
    height: Width(28),
    borderRadius: Width(14),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  gridWishlistButton: {
    width: Width(24),
    height: Width(24),
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Width(5),
    
  },
  iconStyle:{
     width: 40,
          height: 40,
          position: 'absolute',
          top: -10,
          left: -10,
          zIndex: 100,
          display: 'flex',
  },
  productName: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: COLORS.dark,
    lineHeight: Height(20),
    marginTop:Height(6)
  },
  gridProductName: {
    fontSize: 12,
    height: Height(32), // Fixed height for 2 lines
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 'auto',
   
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
    marginRight: Width(4),
    includeFontPadding: false,
  },
  gridOfferPrice: {
    fontSize: 14,
  },
  mrpPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    includeFontPadding: false,
  },
  gridMrpPrice: {
    fontSize: 10,
  },
  // Add to your existing styles
addToCartButton: {
  backgroundColor: COLORS.primary,
  paddingVertical: Height(6),
  paddingHorizontal: Width(10),
  borderRadius: 4,
  marginTop: Height(5),
  alignItems: 'center',
  justifyContent: 'center',
},
gridAddToCartButton: {
  paddingVertical: Height(4),
  paddingHorizontal: Width(5),
  marginTop: Height(3),
},
addToCartText: {
  color: COLORS.white,
  fontSize: 12,
  fontWeight: 'bold',
},
 lottieAnimation: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: -15,
    left: -15,
    backgroundColor: 'transparent',
  },
});

