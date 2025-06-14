import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  
  },
  contentContainerStyle:{
      paddingBottom:Height(20)
  },
  orderId: {
    color: '#666',
    fontSize: 14,
    padding: 16,
    paddingBottom: 8,
  },
   sectionWrapper: {
        paddingHorizontal: 16,
        paddingVertical: Height(5),
        paddingTop:Height(15)
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily:'Inter-SemiBold',
        color: '#000',
        marginBottom: 8,
      
      },
      flatListContentStyle:{
        paddingHorizontal:0
      },
      blank:{
        height:Height(10)
      },
        paymentBox: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    marginTop:Height(20)
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
    row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    currencyIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
    sellerText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  link: {
    color: '#2E6074E8',
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: Height(10),
    width: Width(190),
  },
  disabledButtonText: {
    fontSize: 14,
    color: '#aaa',
  },
});