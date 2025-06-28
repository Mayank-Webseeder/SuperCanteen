import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from '@constants/index';

export const styles = StyleSheet.create({
  mainContainer: {
    // marginTop: 10,
     paddingTop: 10,
    
  },
  fireIcon: {
    fontSize: 10,
    marginHorizontal: 3,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:2
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: COLORS.green,
  },
  listContent: {
    paddingLeft: Height(15),
  },
  dealCard: {
    width: Width(130),
    marginRight: 15,
    borderRadius: 15,
     backgroundColor: '#EDF6F9',
    padding: 15,
    elevation: 2,
    marginBottom:7,
    borderWidth:0.5,
    borderColor:COLORS.border,
    marginTop:5
   
  },
  hotRibbon: {
    position: 'absolute',
    top: 6,
    left: -5,
    backgroundColor: COLORS.green,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    transform: [{ rotate: '-15deg' }],
  },
  hotRibbonText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 8,
    lineHeight:Height(20)
  },
  ratingContainer: {
    backgroundColor: '#CDE4E7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingText: {
    color: COLORS.green,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    color: COLORS.green,
  },
  discountPill: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
});
