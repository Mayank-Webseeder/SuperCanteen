import { StyleSheet } from "react-native";
import { Height } from "../../constants";

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
    fontSize: 15,
    fontFamily:'Inter-Medium'

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
    marginTop: 10,
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
  footerLinks: {
    paddingTop: Height(20),
    paddingHorizontal:Height(5)
  },
  footerText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    fontFamily:'Inter-Regular'
  },
  logoutContainer: {
    paddingHorizontal: 20,
   paddingBottom: 30,
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});