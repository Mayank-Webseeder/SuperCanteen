import { StyleSheet,Platform } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
  },
  backdropTouchable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Height(30),
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: Platform.select({ ios: 20, android: 0 }), 
   
  },
  footerButton:{
   flexDirection:"row",
   marginLeft:Height(30)
  },
   resetText:{
    color:COLORS.green,
    fontSize:14,
    fontFamily:"Inter-SemiBold"
  },
  panelContainer:{
   padding:15
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: 120,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  leftColumnContent: {
    paddingBottom: 20,
  },
  rightColumn: {
    flex: 1,
  },
  rightColumnContent: {
    paddingBottom: 100, // Ensure space for footer
  },
  rightPaneContainer: {
    paddingLeft: 12,
    paddingBottom: 20,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#f0f8ff',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTextSelected: {
    color: '#376275',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem:{
 width: '50%',
   flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  colorCircleStyle: {
    width: Height(23),
    height:  Width(23),
    marginRight: 8,
    borderRadius:4
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    // flex: 1,
  },
  checkboxTouchable:{
    flexDirection:"row"
  },
  checkIcon: {
    marginLeft:8
  },
  sizeOptionSelected: {
    borderColor: '#376275',
    backgroundColor: '#f0f8ff',
  },
  sizeText: {
    fontSize: 14,
    color: '#555',
  },
  sizeTextSelected: {
    color: '#376275',
    fontWeight: '600',
  },
  // Add these to your existing styles
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 0,
},
checkboxLabel: {
  marginLeft: 10,
  fontSize: FontSize(13),
  color: '#333',
  width:Width(160)
},
rightPaneContainer: {
  padding: 15,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#333',
},
optionsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
},
optionItem: {
  flexDirection:"row",
  padding: 8,
  marginBottom: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ddd',
  marginHorizontal:6
},
optionItemSelected: {
  borderColor: '#376275',
  backgroundColor: '#f0f8ff',
 
},
colorCircle: {
  width: 20,
  height: 20,
  borderRadius: 10,
  marginRight: 8,
},
optionText: {
  fontSize: 14,
},
sizeOption: {
  width: 60,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 5,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ddd',
},
sizeOptionSelected: {
  borderColor: '#376275',
  backgroundColor: '#f0f8ff',
},
sizeText: {
  fontSize: 14,
},
sizeTextSelected: {
  color: '#376275',
  fontWeight: 'bold',
},
emptyText: {
  fontSize: 14,
  color: '#888',
  textAlign: 'center',
  marginTop: 20,
  fontFamily:"Inter-Regular",
  lineHeight:Height(18)
},
});
