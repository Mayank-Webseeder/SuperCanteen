import { StyleSheet } from "react-native";
import { COLORS, FontSize, Width } from "@constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop:1
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#212121',
  },
  totalPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: COLORS.green,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
    marginTop: 1,
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: COLORS.green,
    marginLeft: 8,
  },
  addressName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#616161',
    marginBottom: 4,
  },
  addressContact: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#212121',
    marginTop: 8,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemBrand: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#757575',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#212121',
  },
  itemQty: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#757575',
  },
  variantContainer: {
    marginTop: 8,
  },
  variantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  variantLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#757575',
  },
  variantValue: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#212121',
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 4,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.green,
    marginRight: 12,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#212121',
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#757575',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#616161',
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: COLORS.green,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 4,
  },
  shopButton: {
    flex: 1,
    backgroundColor:COLORS.green,
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    alignItems: 'center',
  },
  shopButtonText: {
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});