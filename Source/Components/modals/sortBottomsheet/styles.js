import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../constants";

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.modalOverlay,
  },
   footerButton:{
    flexDirection:"row",
    marginLeft:Height(30)
  },
  footerButtonText:{
    color:COLORS.green,
    fontFamily:"Inter-SemiBold",
    fontSize:14,
   
  },
  backdropTouchable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  contentContainer: {
    flex: 1,
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  resetText:{
    color:COLORS.green,
    fontSize:14,
    fontFamily:"Inter-SemiBold"
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    paddingBottom: 100, // Space for footer
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionItemSelected: {
    backgroundColor: '#f5f9fa',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#444',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: Height(25),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  footerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  applyButton: {
    backgroundColor: '#2E6074',
  },
  footerButtonText: {
    fontSize: 16,
    fontFamily:'Inter-Medium'
  },
  applyButtonText: {
    color: '#fff',
  },
});