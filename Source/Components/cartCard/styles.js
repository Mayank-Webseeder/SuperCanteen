import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  selectionControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  selectAllText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#416E81',
    fontWeight: '500',
  },
  selectionText: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily:"Inter-SemiBold"
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  listContent: {
     paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedCard: {
    borderColor: '#416E81',
    backgroundColor: '#f5f9fa',
  },
  selectButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    zIndex: 1,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#416E81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 12,
    marginTop:Height(10)
  },
  details: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 18,
    fontFamily:'Inter-Regular'
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#416E81',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dropdownWrapper: {
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f7fa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
  },
  dropdownTextSmall: {
    fontSize: 12,
    color: '#416E81',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 4,
    marginHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItemSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedDropdownItem: {
    backgroundColor: '#f0f7fa',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItemTextSmall: {
    fontSize: 13,
    color: '#416E81',
  },
  selectedDropdownItemText: {
    color: '#416E81',
    fontWeight: '500',
  },
  dropdownCheckIcon: {
    marginLeft: 10,
  },
  stepperContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f5f7fa',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#e1e5e9',
  paddingHorizontal: 10,
  paddingVertical: 4,
  width: 100,
  justifyContent: 'space-between',
},
stepperButton: {
  paddingHorizontal: 6,
  paddingVertical: 2,
},
stepperText: {
  fontSize: 16,
  color: '#416E81',
  fontWeight: 'bold',
},
qtyText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
},

  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  shadowAndroid: {
    elevation: 5,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom:2
  },
  returnInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  deliveryText: {
    fontSize: 12,
    marginHorizontal:7
  },
  returnPolicy: {
    fontSize: 12,
    color: '#666',
  },
  seller: {
    fontSize: 12,
    color: COLORS.green,
    marginTop: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalText: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#416E81',
  },
  checkoutButton: {
    backgroundColor: '#416E81',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkouButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyCartText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
errorContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
errorText: {
  color: 'red',
  textAlign: 'center',
},
removeButton: {
  marginTop: 0,
  alignSelf: 'flex-end',
  padding:10,
},
removeText: {
  color: '#FF3B30',
  fontSize: 14,
},
  outOfStockCard: {
    opacity: 0.6,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1,
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disabledStepper: {
    opacity: 0.5,
  },
  stockMessage: {
    fontSize: 12,
    color: COLORS.green,
    marginTop: 4,
    fontStyle: 'italic',
  },
  lowStockMessage: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
});