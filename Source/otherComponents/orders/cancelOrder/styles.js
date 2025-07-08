import { COLORS } from "@constants/index";
import { StyleSheet,Dimensions } from "react-native";
const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily:"Inter-Bold",
    color:COLORS.black
  },
  closeButton: {
    fontSize: 16,
    color: '#666',
    fontFamily:"Inter-SemiBold"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    fontFamily:"Inter-Medium"
  },
  reasonsContainer: {
    marginBottom: 2,
  },
  reasonButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedReason: {
    borderColor: COLORS.green,
    backgroundColor: '#F4F8FB',
  },
  reasonText: {
    fontSize: 14,
    color:COLORS.text
  },
  otherReasonInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    textAlignVertical: 'top',
    minHeight: 100,
  },
 errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
     fontFamily:"Inter-Bold"
  },
  submitButton: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.green,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
     fontFamily:"Inter-Bold"
  },
});