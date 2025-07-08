import { StyleSheet } from "react-native";
import { COLORS, FontSize } from "@constants/index";
export const styles = StyleSheet.create({
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000
},
modalContainer: {
  backgroundColor: '#fff',
  borderRadius: 10,
  maxHeight: '80%',
  width: '90%',
  marginHorizontal: '5%',
  alignSelf: 'center'
},

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: {
    fontSize: 18,
   fontFamily:"Inter-SemiBold"
  },
  contentContainerStyle:{
     paddingBottom:40
  },
  invoiceContent: {
    padding: 15,
   
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
   fontFamily:"Inter-SemiBold",
    marginBottom: 8
  },
  subTitle:{
    color:COLORS.darkGray,
    fontFamily:"Inter-Regular",
    fontSize:FontSize(13.5)
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  totalLabel: {
   fontFamily:"Inter-SemiBold"
  },
  totalValue: {
   fontFamily:"Inter-SemiBold"
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  downloadButton: {
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5
  },
  downloadButtonText: {
    color: COLORS.white,
    marginLeft: 8,
   fontFamily:"Inter-SemiBold"
  }
});