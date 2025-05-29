import { StyleSheet } from "react-native";
import { Height, Width } from "../../constants";

export const styles = StyleSheet.create({
  list: {
    paddingLeft: 9,
    paddingTop: 30,
    paddingBottom: 20,
  },
  card: {
    width: Width(120),
    height: Height(155),
    marginRight: 12,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginHorizontal:Height(10)
  },
  badge: {
    position: 'absolute',
    top: -15,
    left: -10,
    backgroundColor: '#890D0D',
    borderRadius: 999,
    width: 40,
    height: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    marginTop: 10,
    borderRadius: 4,
  },
  details: {
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    fontFamily:'Inter-Medium',
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    fontFamily:'Inter-Bold',
    color: '#000',
    marginRight: 6,
  },
  mrp: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
    fontFamily:'Inter-Regular'
  },
});