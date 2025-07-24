import { StyleSheet } from 'react-native';
import { COLORS, Height } from '../../constants';

export const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  
    
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 10,
    rowGap: 10,
  },
  main: {
    marginHorizontal: 10,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    color: '#888',
    fontFamily: 'Inter-Regular',
  },
  containerBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  box: {
    padding: 21,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter-Medium',
  },
  sectionBox: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Inter-SemiBold',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  footerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FBFD',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F4F8',
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  gradientIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4F0F5',
    marginBottom: 6,
  },

footerWrapper: {
  marginTop: 20,
  alignItems: 'center',
  
 
},

footerCard: {
    flexDirection: 'row',
  justifyContent: 'space-around', // Changed from 'space-between'
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingVertical: 18,
  width: '100%',
  maxWidth: 500, // Add maxWidth for larger screens
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  borderWidth: 1,
  borderColor: '#F0F0F0',
},

footerItemEqual: {
  flex: 1, // Equal space
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 80, // Minimum width for each item
  paddingHorizontal: 4, // Reduced padding
},

footerIconCircle: {
   backgroundColor: '#EDF6FA',
  width: 48,
  height: 48,
  borderRadius: 24,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 6,
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
},

footerText: {
    fontSize: 10, // Use numeric value instead of FontSize()
  fontFamily: 'Inter-Medium',
  color: '#2E6074',
  textAlign: 'center',
  paddingHorizontal: 2, // Small padding
  flexWrap: 'wrap', // Allow text to wrap
  maxWidth: '100%', // Take full available width
  marginTop:8
},

appVersionText: {
  marginTop: 12,
  fontSize: 12,
  color: '#999',
  fontFamily: 'Inter-Regular',
},

appVersionText: {
  marginTop: 10,
  fontSize: 12,
  color: '#999',
  fontFamily: 'Inter-Regular',
},

  versionContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Inter-Regular',
  },
  loginPromptText: {
  color: '#888',
  fontSize: 12,
  fontStyle: 'italic',
},
loginPromptContainer: {
  backgroundColor: '#f5f5f5',
  padding: 15,
  borderRadius: 8,
  marginTop: 5,
  marginBottom: 10,
},
loginPromptDescription: {
  color: '#555',
  fontSize: 14,
  marginBottom: 10,
},
loginButton: {
  backgroundColor: '#2E6074',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
},
loginButtonText: {
  color: COLORS.black,
  fontWeight: 'Inter-Regular',
  lineHeight:Height(20)

},
});
