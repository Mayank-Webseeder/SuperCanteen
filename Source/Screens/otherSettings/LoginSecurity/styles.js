import { StyleSheet } from 'react-native';
import { COLORS, Height, Width } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingVertical:2
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Inter-SemiBold',
    marginBottom: Height(12),
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingBottom: Height(19),
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-SemiBold',
  },
  input: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-SemiBold',
    paddingVertical: 4,
    width: Width(200),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.green,
    backgroundColor: '#fff', // fixes underline issue on Android
  },
  inputFocused: {
    borderBottomColor: COLORS.border,
  },
  editButton: {
    padding: 6,
  },
  editText: {
    color: COLORS.green,
    fontFamily: 'Inter-SemiBold',
  },
  saveButton: {
    backgroundColor: COLORS.green,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: Height(14),
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});
