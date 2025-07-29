// styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import { Height, Width } from '@constants/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scrollContainer: {
    paddingHorizontal: Width(12),
    paddingBottom: Height(120)
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: Width(16),
    marginBottom: Height(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Height(5),
    paddingBottom: Height(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputStyle: {
    paddingVertical: 13
  },
  cardTitle: {
    marginLeft: Width(8),
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(6),
  },
  halfInput: {
    width: '48%',
  },
  typeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(8),
    marginTop: Height(6)
  },
  typeButton: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Height(10),
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  selectedTypeButton: {
    borderColor: COLORS.green,
    backgroundColor: '#e8f4f8',
  },
  typeButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#95a5a6',
  },
  selectedTypeButtonText: {
    color: COLORS.green,
    fontWeight: '600',
  },
  saveButton: {
    height: Height(46),
    borderRadius: 8,
    backgroundColor: COLORS.green,
    shadowColor: '#2E6074',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 18
  },
  textArea: {
    marginVertical: 3
  },
  buttonView: {
    marginHorizontal: 20,
    bottom: Height(22)
  },
  addressModeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500'
  },
  toggleLink: {
    color: '#2E6074',
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E6074',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  manualModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000,
  },
  manualModalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  manualModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  manualModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  manualModalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  manualModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  manualModalCancel: {
    padding: 10,
    marginRight: 10,
  },
  manualModalCancelText: {
    color: '#666',
  },
  manualModalConfirm: {
    backgroundColor: '#2E6074',
    padding: 10,
    borderRadius: 4,
  },
  manualModalConfirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
});