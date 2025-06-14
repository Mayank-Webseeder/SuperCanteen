import { COLORS } from "@constants/index";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FF3F6C',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: 'Inter-SemiBold',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    fontFamily:"Inter-Medium",
    color: '#535766',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    color: '#282C3F',
    marginBottom: 8,
    height: 36,
     fontFamily:"Inter-Medium",
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontFamily:"Inter-Bold",
    color: '#282C3F',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#94969F',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DBF73',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#fff',
    fontFamily:"Inter-Medium",
    marginRight: 2,
  },
  reviews: {
    fontSize: 12,
    color: '#94969F',
  },
  addButton: {
    backgroundColor: COLORS.green,
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontFamily:"Inter-Medium",
    fontSize: 14,
  }
});