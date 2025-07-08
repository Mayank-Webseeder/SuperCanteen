import { StyleSheet } from "react-native";
import { COLORS} from "../../../constants";

export 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden'
  },
  headerBackground: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  rowContainer:{
    flexDirection:"row"
  },
  headerOrderId: {
    color: '#FFF',
    fontSize: 18,
    fontFamily:"Inter-SemiBold",
    marginBottom: 4
  },
  headerStatus: {
    color: '#FFF',
    fontSize: 16
  },
stickyInvoiceButton: {
  position: 'absolute',
  top: 14,
  right: 15,
  backgroundColor: COLORS.green,
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 15,
  elevation: 3
},
invoiceButtonText: {
  color: COLORS.white,
  fontSize: 12,
  marginLeft: 4
},
  content: {
    paddingTop: 120,
    paddingBottom: 20
  },
  statusCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop:16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom:8
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    marginTop: 4
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily:"Inter-SemiBold",
    marginBottom: 12,
    color: '#333'
  },
  productCard: {
    flexDirection: 'row',
    paddingVertical: 12
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0'
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  
  },
  productName: {
    fontSize: 15,
    fontFamily:"Inter-Medium",
    color: '#333',
    marginBottom: 6
  },
  variantChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
    marginTop:5
    
  },
  chip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6
  },
  chipText: {
    fontSize: 12,
    color: '#666'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  price: {
    fontSize: 16,
    fontFamily:"Inter-SemiBold",
    color: '#333'
  },
  quantity: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12
  },
  buyAgainBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 8
  },
  buyAgainText: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: 'bold'
  },
  timelineContainer: {
    marginTop: 16
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeDot: {
    borderColor: COLORS.green
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.green
  },
  timelineContent: {
    marginLeft: 12
  },
  timelineTitle: {
    fontSize: 14,
    color: '#999'
  },
  activeTitle: {
    color: '#333',
    fontWeight: '500'
  },
  timelineDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2
  },
  timelineLine: {
    position: 'absolute',
    left: 9,
    top: 20,
    bottom: -12,
    width: 2,
    backgroundColor: '#CCC'
  },
  activeLine: {
    backgroundColor: COLORS.green
  },
  addressCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12
  },
  addressName: {
    fontSize: 15,
    fontFamily:"Inter-Medium",
    marginBottom: 4
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2
  },
  addressContact: {
    fontSize: 14,
    color: '#666',
    marginTop: 6
  },
  summaryCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginTop: 8
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily:"Inter-Regular"
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
     fontFamily:"Inter-Regular"
  },
  discountValue: {
    color: '#0A8',
     fontFamily:"Inter-Regular"
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  totalLabel: {
    fontSize: 15,
    fontFamily:"Inter-SemiBold",
    color: '#333'
  },
  totalValue: {
    fontSize: 15,
    fontFamily:"Inter-SemiBold",
    color: '#333'
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  paymentText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
     fontFamily:"Inter-Regular"
  },
  helpCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  helpTitle: {
    fontSize: 16,
    fontFamily:"Inter-Medium",
    marginBottom: 12
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.green,
    width:"97%",
   justifyContent:"center"
  },
  helpButtonText: {
    color: COLORS.green,
    fontSize: 14,
    fontFamily:"Inter-Medium",
    marginLeft: 8
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  primaryBtn: {
    backgroundColor: COLORS.green
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily:"Inter-Medium",
    marginLeft: 6
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#CCC'
  },
  secondaryBtnText: {
    color: '#333',
    fontSize: 14,
    fontFamily:"Inter-Medium",
    marginLeft: 6
  },
  swipeAction: {
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '80%',
    marginTop: 8,
    borderRadius: 8
  },
  swipeActionText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8
  }
});