import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.green,
    marginLeft: Height(10),
  },
  addressContainer: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    
  },
  addressLine: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  changeButton: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 12,
    paddingBottom: 4,
    borderRadius: 6,
  },
  changeText: {
    color: COLORS.green,
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  emptyAddressContainer: {
    paddingVertical: 0,
  },
  emptyAddressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    marginBottom: 12,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1EDFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    width:Width(170),
    justifyContent:"center"
  },
  addAddressText: {
    color: COLORS.green,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  addIcon: {
    height: 18,
    width: 18,
    marginRight: 8,
    tintColor: COLORS.green,
  },
});
