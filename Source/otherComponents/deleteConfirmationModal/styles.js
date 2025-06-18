import { StyleSheet } from "react-native";
import { COLORS } from "@constants/index";

export const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 15,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily:"Inter-SemiBold",
    color: '#222',
  },
  closeButton: {
    padding: 4,
  },
  modalMessage: {
    fontSize: 15,
    color: '#555',
    marginTop: 10,
    marginBottom: 16,
    lineHeight: 22,
    fontFamily:"Inter-Medium"
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#e5e5e5',
    height: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#D5E2E9',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  removeButton: {
    backgroundColor: '#fff5f5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#666',
  },
  removeText: {
    color: '#FF3B30',
  },
});