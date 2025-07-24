import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FontSize, Height } from "../../../constants";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: FontSize(16),
    fontFamily: 'Inter-SemiBold',
    color: COLORS.modalTitle,
  },
  closeText: {
    fontSize: Height(12),
    color: COLORS.black,
    padding:3
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#444',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
 
  },
  optionSelected: {
    backgroundColor: '#E1F0FA',
    borderColor: '#2E6074',
  },
  optionText: {
    color: '#555',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#2E6074',
    fontFamily: 'Inter-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  applyButton: {
    backgroundColor: '#2E6074',
  },
  cancelButtonText: {
    color: '#555',
    fontFamily: 'Inter-SemiBold',
  },
  applyButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
});