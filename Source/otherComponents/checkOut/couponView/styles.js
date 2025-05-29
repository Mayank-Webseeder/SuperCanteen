import { StyleSheet } from "react-native";
import { COLORS, Width } from "../../../constants";

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
  sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: COLORS.green,
    marginLeft: 8,
  },
 
  couponCard: {
     backgroundColor: COLORS.aliceBlue,
     borderWidth: 1,
     borderColor: COLORS.shadowBlue,
     borderRadius: 8,
     padding: 12,
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 12,
   },
   couponInfo: {
     flex: 1,
   },
   couponCode: {
     fontFamily:'Inter-SemiBold',
     fontSize: 14,
     color: COLORS.green,
     marginBottom: 4,
   },
   couponDesc: {
     fontSize: 12,
     color: COLORS.darkGray,
     fontFamily:'Inter-Regular'
   },
   applyButton: {
       backgroundColor: COLORS.green,
       paddingHorizontal: 16,
       paddingVertical: 8,
       borderRadius: 4,
     },
     applyText: {
       color: COLORS.white,
      fontFamily:'Inter-Bold',
       fontSize: 12,
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
     }
})