import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height } from "../../../constants";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.modal,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxHeight: '85%',
    elevation: 10,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: FontSize(18),
    fontFamily:'Inter-SemiBold',
    color: COLORS.modalTitle,
  },
  closeText: {
    fontSize: Height(18),
    color: COLORS.black,
  },
  filterSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#444',
    marginBottom: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionSelected: {
    backgroundColor: '#D6EAF8',
    borderColor: '#2874A6',
  },
  optionText: {
    color: '#555',
    fontSize: 14,
    fontFamily:'Inter-Regular'
  },
  optionTextSelected: {
    color: '#2874A6',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#ECECEC',
  },
  applyButton: {
    backgroundColor: '#2E6074E8',
  },
  cancelButtonText: {
    color: '#777',
    fontFamily:'Inter-SemiBold'
  },
  applyButtonText: {
    color: '#fff',
     fontFamily:'Inter-SemiBold'
  },
});
