import { StyleSheet } from "react-native";
import { Width } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: Width(15),
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,

  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#F4F8FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#2E6074',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});