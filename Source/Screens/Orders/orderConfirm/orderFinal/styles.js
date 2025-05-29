import { StyleSheet } from "react-native";
import { COLORS, FontSize, Width } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 22,
   fontFamily:'Inter-SemiBold',
    textAlign: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    color: '#2E6074',
   fontFamily:'Inter-SemiBold',
    marginBottom: 8,
    fontSize: 14,
  },
  addressCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
    borderWidth:0.5,
    borderColor:'gray'

  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressName: {
  fontFamily:'Inter-SemiBold',
    marginBottom: 4,
   
  },
  addressDetails: {
    fontSize: 13,
    color: '#333',
    fontFamily:'Inter-Regular',
    color:'#8A8A8A',
    right:Width(10)
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
    elevation: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
    fontFamily:'Inter-Regular'
  },
  itemBrand: {
    fontFamily:'Inter-SemiBold',
    fontSize: 15,
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
     fontFamily:'Inter-Regular'
  },
  itemDelivery: {
    color: '#2E6074',
    fontSize: 12,
    marginBottom: 4,
     fontFamily:'Inter-Regular'
  },
  itemPrice: {
     fontFamily:'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 2,
  },
  viewDetails: {
    color: '#2E6074',
    fontSize: 13,
     fontFamily:'Inter-SemiBold',
    marginTop: 4,
  },
  notificationContainer: {

    marginBottom: 40,
  flexDirection:"row"

  },
  notificationText: {
     fontFamily:'Inter-SemiBold',
    fontSize: FontSize(13),
    width:210,
    marginBottom: 12,
  },
  notificationImage: {
    width: 160,
    height: 120,
    right:Width(20)
  },
  thankYouContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  thankYouText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    fontFamily:'Inter-Regular'
  },
  thankYouImage: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
     fontFamily:'Inter-SemiBold',
    fontSize: 15,
  },
});