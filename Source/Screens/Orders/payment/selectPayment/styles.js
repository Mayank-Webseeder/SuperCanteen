import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "@constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom:Height(30)
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: Height(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
   // marginLeft: 8,
  },
  subSectionTitle: {
    fontSize: 14,
    color: '#006f94',
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewAllText: {
    color: '#2E6074',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
  },
  paymentOptionContainer: {
    marginBottom: 8,
  },
  selectedOption: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F6FAFD',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D6E7FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E6074',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownContainer: {
    marginVertical: Height(10),
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  upiRadioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upiRadioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E6074',
  },
  upiLogo: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  upiText: {
    fontSize: 14,
    color: '#333',
  },
  agreementContainer: {
    marginVertical: 16,
    marginHorizontal:Width(4),
    marginBottom:Height(15)
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2E6074',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#2E6074',
    borderColor: '#2E6074',
  },
  agreementText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 30,
  },
  priceDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moneyIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
  },
  savingsText: {
    fontSize: 12,
    color: '#4CAF50',
    textAlign: 'right',
    marginTop: 4,
    fontStyle: 'italic',
  },
  confirmButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});