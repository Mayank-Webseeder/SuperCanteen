import { COLORS, FontSize, Height } from "@constants/index";
import { StyleSheet } from "react-native";
  export const styles = StyleSheet.create({
    container: {
    marginHorizontal: 16,
    marginBottom:Height(3)
  },
   title: {
      fontSize: FontSize(14),
      fontFamily:"Inter-Medium",
      color: '#333',
      marginBottom:Height(8),
      marginTop:Height(10)
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  couponName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  couponPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  couponFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponExpiry: {
    fontSize: 14,
    color: '#666',
  },
  viewDetailsText: {
    color: COLORS.green,
    fontWeight: '500',

  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  discountPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    marginLeft: 12,
    marginBottom:Height(4)
  },
  discountDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  saveText:{
 backgroundColor: '#FFF2F2',
  color: '#FF6B6B',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 4,
  overflow: 'hidden',
  textTransform: 'uppercase',
  fontSize: 14,
  letterSpacing: 0.5,
 
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  expiryText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontWeight: '500',
  },
   couponCard: {
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom:Height(11),
      backgroundColor: '#F9FBFC',
    borderWidth: 1,
    borderColor: '#E8F1F5',
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  savingsContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  savingsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e53935',
    backgroundColor: '#ffebee',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E6074',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    marginBottom: 15,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#555',
  },
   appliedContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  appliedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appliedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appliedText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
})