
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom:10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  couponCode: {
    fontSize: 16,
    color: '#FF6B6B',
    marginTop: 4,
    fontFamily:"Inter-Medium"
  },
  productCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  brandName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginRight: 8,
  },
  mrpPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  bestSellerTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bestSellerText: {
    fontSize: 10,
    color: '#FFA000',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});
