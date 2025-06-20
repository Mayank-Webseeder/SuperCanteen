import { StyleSheet } from 'react-native';
import { COLORS, Height } from '../../../constants';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EEF4F7' },
  content: {
    padding: 16,
  },
  containerStyle:{
     marginTop:Height(6),
     left:Height(7)
  },
  helpTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1B4E7C',
    marginBottom: 8,
   
  },
  helpSubText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4C5C68',
    marginBottom: 24,
  },
  cardBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2E6074',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
    marginLeft: 28,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
    color: '#000',
  },
  textInput: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    minHeight: Height(100),
    color:COLORS.black
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  submitBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
