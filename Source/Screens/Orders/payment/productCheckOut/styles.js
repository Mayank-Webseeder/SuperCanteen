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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
 
  deliveryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  
  },
  deliveryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  deliveryDate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentButton: {
    paddingBottom: Height(8),
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