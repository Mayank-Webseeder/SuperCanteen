import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginRight: 16,
    padding: 10,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 4,
    color: '#1B1B1B',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviews: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12,
  },
});