import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white,
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
    fontFamily:'Inter-Bold',
    letterSpacing: 0.5,
  },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#416E81',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  methodText: {
    flexShrink: 1,
  },
  methodTitle: {
    fontSize: 15,
    color: '#111827',
    fontFamily:'Inter-SemiBold'
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
    fontFamily:'Inter-Regular'
  },
  primaryActionButton: {
    backgroundColor: '#416E81',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  primaryActionText: {
    color: '#fff',
    fontSize: 13,
    fontFamily:'Inter-SemiBold'
  },
  textButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  textActionText: {
    fontSize: 13,
    color: '#416E81',
    fontFamily:'Inter-SemiBold'
  },
});
