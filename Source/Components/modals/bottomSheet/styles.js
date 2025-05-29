import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

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
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
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
  optionItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  optionItemSelected: {
    borderColor: '#376275',
    backgroundColor: '#f0f8ff',
  },
  colorCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  sizeOption: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
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
  }
});
