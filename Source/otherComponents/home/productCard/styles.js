import { COLORS, Width } from "@constants/index";
import { StyleSheet } from "react-native";
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { Height } from "@constants/index";
export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(13),
    paddingTop: verticalScale(8),
    backgroundColor:COLORS.white
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(9),
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
    marginHorizontal: moderateScale(4),
    marginBottom: verticalScale(3),
  },
  imageContainer: {
    position: 'relative',
   // Slightly taller image area
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(8),
  },
  weightContainer: {
  paddingVertical: 4,
  borderRadius: 4,
  alignSelf: 'flex-start',
  marginTop: 4,
},
weightText: {
  fontSize: 11.5,
  color: '#6c757d',
  fontWeight: '500',
  fontFamily: 'Inter-Regular',
},
  productImage: {
    width: '100%',
    height: '120%',
  },
  discountBadge: {
    position: 'absolute',
    top: moderateScale(8),
    left: moderateScale(8),
    backgroundColor: '#FF3F6C',
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
  },
  discountText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  productInfo: {
    paddingHorizontal: moderateScale(12),
    paddingVertical:moderateScale(10)
  },
  brandName: {
    color: '#666',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
    fontWeight: '500',
  },
  productName: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(8),
    color: '#333',
    lineHeight: moderateScale(18),
    height: moderateScale(36), // Fixed height for 2 lines
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  offerPrice: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.green,
    marginRight: moderateScale(4),
  },
  originalPrice: {
    color: '#999',
    fontSize: moderateScale(12),
    textDecorationLine: 'line-through',
  },
  cartButtonContainer: {
    alignSelf: 'flex-start',
  },
  addToCartBtn: {
    backgroundColor:COLORS.green,
       paddingVertical: Height(4),
       borderRadius: 8,
       alignItems: 'center',
       justifyContent: 'center',
       width:Width(45),
     
   
  },
  inCartBtnDisable: {
  backgroundColor: '#cccccc', // or COLORS.gray if you have a gray color defined
  paddingVertical: Height(4),
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
   width:Width(45),
  },
  cartButtonText: {
   color: '#fff',
    fontFamily:"Inter-Medium",
    fontSize: 11,
  },
  inCartText: {
    color: '#fff',
  },
   loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCountFooter: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  productCountText: {
    fontSize: 12,
    color: '#666',
  },
});