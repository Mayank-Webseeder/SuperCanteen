import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "../../../constants/constants";
import { COLORS } from "../../../constants/constants";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  main: {
    marginHorizontal: Width(10),
    marginBottom: Height(4)
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingLeft: 12,
  },
  categoryItem: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryItem: {
    backgroundColor: '#2E6074',
  },
  categoryText: {
    fontSize: FontSize(13),
    color: '#333',
    fontFamily: 'Inter-SemiBold'
  },
  activeCategoryText: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    width: Width(145),
    marginLeft: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    padding: 8,
    paddingBottom: Height(10),
    marginTop:Height(10)
  },
  closeBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    zIndex: 1,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  title: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
    lineHeight: Height(16),
    marginTop: Height(1)
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 11,
    color: '#666',
  },
  cartButton: {
    borderWidth: 1,
    borderColor: '#2E6074',
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
    height: Height(20),
    width: Width(82),
    marginHorizontal: 50
  },
  cartButtonText: {
    color: '#2E6074',
    fontFamily: 'Inter-SemiBold',
    fontSize: FontSize(10),
    textAlign: "center"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FontSize(16),
    color: '#666',
    fontFamily: 'Inter-SemiBold',
  },
   noDataContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Height(100)
    },
    noDataText: {
      fontSize: FontSize(16),
      color: COLORS.gray
    }
});