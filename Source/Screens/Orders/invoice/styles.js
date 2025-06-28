import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainerStyle: {
    paddingBottom: Height(20),
  },
  orderHeader: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    color: '#2E6074',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  orderDate: {
    color: '#666',
    fontSize: 12,
  },
  sectionWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
    marginBottom: 12,
  },
  flatListContentStyle: {
    paddingHorizontal: 0
  },
  invoiceSection: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  invoiceCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  invoiceLabel: {
    fontSize: 14,
    color: '#555',
  },
  invoiceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  discountText: {
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  totalRow: {
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E6074',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E6074',
  },
  paymentSection: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  paymentCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#2E6074',
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sellerSection: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sellerText: {
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#2E6074',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#2E6074',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shareButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#2E6074',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  shareButtonText: {
    color: '#2E6074',
    fontWeight: '500',
  },
});