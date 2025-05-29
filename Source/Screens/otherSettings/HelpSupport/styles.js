import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex:1
  },
  leftView:{
    width:'60%'
  },
  rightView:{
    width:'60%',
    right:Width(10)
   
  },
  card: {
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: Height(10),
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal:10
  },
  image: {
    width: Width(180),
    height: Height(120),
    resizeMode:"cover"
  },
  title: {
    fontSize: FontSize(13),
    marginBottom: 4,
    fontFamily:'Inter-SemiBold',
    lineHeight:Height(16)
   
  },
  textStyle:{
fontSize: FontSize(16),
    marginBottom: 4,
    fontFamily:'Inter-SemiBold',
    lineHeight:Height(20),
    marginTop:Height(10),
    width:Width(320)
  },
  subtitle: {
    fontSize: FontSize(12),
    color: '#666',
    fontFamily:'Inter-Regular',
    marginTop:Height(7),
    lineHeight:Height(16)
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width:Width(120),
    marginTop:Height(10)
  },
  chatText: {
    color: COLORS.green,
    marginLeft: 6,
    fontWeight: '600',
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: Height(10),
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E6074',
  },
   listContent: {
    paddingHorizontal: 10,
    paddingBottom:Height(70)
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  }
});