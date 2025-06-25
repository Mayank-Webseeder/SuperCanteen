import { COLORS } from "@constants/index";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
   
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  favouriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.green,
    borderRadius: 20,
    padding: 6,
  },
  discountBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#E53E3E',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  detailsContainer: {
    padding: 12,
  },
  brandName: {
    fontSize: 10,
    color: '#718096',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#2C3E50',
  },
  originalPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#A0AEC0',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});