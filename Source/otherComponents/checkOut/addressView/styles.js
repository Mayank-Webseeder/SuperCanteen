import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../constants";

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
   addIcon: {
    height: 16,
    width: 16,
    marginRight: 6,
    tintColor: COLORS.green,
  },
   sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
   sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: COLORS.green,
    marginLeft: 8,
  },
   addressContainer: {
    marginBottom: 12,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 8,
    fontFamily:'Inter-Regular'
  },
  changeButton: {
    alignSelf: 'flex-start',
    fontFamily:'Inter-SemiBold',
  },
  changeText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  addAddressContainer: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAddressPrompt: {
    flex: 1,
    fontSize: 12,
    color: '#555',
    fontFamily:'Inter-Regular',
    lineHeight:Height(15)
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1EDFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
   addAddressText: {
    color: COLORS.green,
    fontSize: 13,
   
  }
})