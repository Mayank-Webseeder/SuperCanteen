import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.green,
    marginTop: 24,
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 14,
    color: '#34495e',
    fontFamily: 'Inter-Medium',
  },
  typeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedTypeButton: {
    borderColor: COLORS.green,
    backgroundColor: '#f0f7f9',
  },
  typeButtonText: {
    marginLeft: 8,
    color: '#95a5a6',
    fontFamily: 'Inter-Medium',
  },
  selectedTypeButtonText: {
    color: COLORS.green,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  defaultText: {
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.green,
    fontFamily: 'Inter-Medium',
  },
  saveButton: {
    marginTop: 8,
  },
});