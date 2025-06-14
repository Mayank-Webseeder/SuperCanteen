import { StyleSheet } from "react-native";
import {  Height } from "../../constants";

export const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
   marginHorizontal:10,
    paddingTop: 10,
    rowGap: 10,
  },
  main:{
    marginHorizontal: 10 
  },
  greeting: {
    fontSize: 18,
    fontFamily:'Inter-SemiBold'

  },
  phone: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    fontFamily:'Inter-Regular'
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
    padding: 16,
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
    fontFamily:'Inter-Medium'
  },
  sectionBox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily:'Inter-SemiBold'
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop:8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
 

  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footerContainer: {
    marginTop: 20,
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
  iconContainer: {
    backgroundColor: '#E8F4FF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerLabel: {
    fontSize: 12,
    color: '#2E6074',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    letterSpacing: 0.2,
    lineHeight:Height(19)
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
  
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,

    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});