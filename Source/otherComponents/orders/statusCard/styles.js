import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../../constants";

export  const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop:16,
    paddingBottom:12,
    margin: 16,
    marginBottom: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginTop:Height(7)
  },
  productInfo: {
    marginBottom: 12,
  },
  row:{
    flexDirection:"row", 
  },
  mainContainerStyle:{
    marginHorizontal:Width(10)
  },
  image:{
    height:Height(60),
    width:Width(60),
    resizeMode:"contain"
    
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    color: '#2E6074',
    marginBottom: 4,
    lineHeight:Height(17)
  },
  exchangeNote: {
    fontSize: 12,
    color: '#e67e22',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});