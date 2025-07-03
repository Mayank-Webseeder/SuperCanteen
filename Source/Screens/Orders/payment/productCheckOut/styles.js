import { StyleSheet } from "react-native";
import { COLORS, Height } from "@constants";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor:COLORS.white
  },
   borderStyle:{
       borderTopWidth: 1,
   marginTop:Height(5),
    borderColor: '#E8E8E8'
    },
  scrollContent: { 
    padding: 16,
    paddingBottom: Height(150)
  },
  deliveryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  priceSummary: {
    marginVertical: 16,
  },
  bankContainer: {
    marginTop: 8,
  },
  bankLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(18),
  },
  bankLogo: {
    width: 48,
    height: 32,
    resizeMode: 'contain',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding:16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentButton: {
    paddingBottom: Height(6),
    alignItems: 'center',
    marginBottom: 8,
    paddingTop:Height(5)
  },
  paymentText: {
    color: '#2E6074',
   fontFamily:'Inter-SemiBold',
    fontSize: 14,

  },
  confirmButton: {
    borderRadius: 8,
    height: 48,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily:'Inter-Bold'
  },
});

export const productStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontFamily:"Inter-SemiBold",
    color: COLORS.green,
    marginBottom: 10,
    fontFamily: 'Inter-SemiBold',
    marginTop:Height(2)
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingBottom:12
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
    lineHeight:Height(20)
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
  color: COLORS.green,
    marginRight: 8,
    fontFamily: 'Inter-Bold'
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular'
  },
  qty: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: 'Inter-Regular'
  },
  deliveryEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  deliveryIcon: {
    marginRight: 6,
  },
  deliveryText: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'Inter-Regular'
  },
});