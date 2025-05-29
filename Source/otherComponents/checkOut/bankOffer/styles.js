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
    marginBottom: 12,
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
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    viewAllText: {
      color: COLORS.green,
      fontSize: 13,
      fontFamily:'Inter-SemiBold',
      marginHorizontal:Width(8)
    },
     sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: COLORS.green,
    marginLeft: 8,
  }
})