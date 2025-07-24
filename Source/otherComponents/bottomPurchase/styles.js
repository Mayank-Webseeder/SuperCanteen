import { StyleSheet,Dimensions } from "react-native";
import { Width } from "../../constants";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeArea: {
    backgroundColor: '#fff'
  },
   container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
  
  },
  iconButton: {
    width: width * 0.12, // 12% of screen width
    height: width * 0.12, // Maintain square aspect ratio
    borderRadius: 10,
    backgroundColor: '#F4F8FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.02, // 2% spacing

  },
  addToCartText: {
    color: '#2E6074',
    fontSize: width * 0.035, // 3.5% of screen width
    fontFamily: 'Inter-Bold',
  },
  buyNowText: {
    fontSize: width * 0.035, // Consistent with addToCartText
    fontFamily: 'Inter-Bold',
  },
});