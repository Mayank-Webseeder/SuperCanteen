import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconBox: {
    backgroundColor: '#E8F4FF',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E6074',
    fontFamily: 'Inter-Bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4D8DA9',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#4A6C80',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
});
