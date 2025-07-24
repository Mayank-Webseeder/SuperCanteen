import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 10,
    bottom:-19
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
  },
  applyButton: {
   backgroundColor: COLORS.green,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  applyButtonText: {
    color: '#fff',
  },
  resetButton: {
  backgroundColor: '#f0f0f0',
  marginRight: 8,
},
});