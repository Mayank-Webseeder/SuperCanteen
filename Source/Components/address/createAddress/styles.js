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
    paddingBottom: Height(20),
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
  inputStyle:{
   paddingVertical:13
  },
  cardTitle: {
    marginLeft: Width(8),
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Inter-SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(6),
  },
  halfInput: {
    width: '48%',
  },
  thirdInput: {
    width: '31%',
  },
  typeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Height(8),
    marginTop:Height(6)
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
    fontFamily: 'Inter-Medium',
  },
  selectedTypeButtonText: {
    color: COLORS.green,
    fontWeight: '600',
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Height(8),
    padding: Height(8),
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  defaultText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.green,
    fontFamily: 'Inter-Medium',
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
    marginVertical:18
  },
  textArea:{
   marginVertical:3
  },
  buttonView:{
    marginHorizontal:20,
    marginBottom:8,
    
  }
});