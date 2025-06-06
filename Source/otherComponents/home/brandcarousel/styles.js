import { StyleSheet } from "react-native";
import { COLORS, Height , Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: Height(12),
  },
  card: {
    marginRight: Width(12),
    borderColor:COLORS.border,
    borderWidth:1,
    padding:10 

  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Height(18),
  },
  dot: {
    width: Width(9),
    height: Width(9),
    borderRadius: Width(10),
    marginHorizontal: Width(2),
    top: Height(-8),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  contentContainerStyle:{
    paddingHorizontal:12
  },
  brandName: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: COLORS.pink ?? '#ff4081',
  color: COLORS.white,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
  fontSize: 14,
  fontFamily: 'Inter-SemiBold', // Optional funky font
  fontStyle: 'italic',
  fontWeight: 'bold',
  textShadowColor: 'rgba(0, 0, 0, 0.7)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
  elevation: 3,
  
},

bottomGradient: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

brandAbout: {
  color: '#fff',
  fontSize: 13,
  textAlign: 'center',
  fontStyle: 'italic',
  fontWeight: '600',
  fontFamily: 'Cochin',
  textShadowColor: 'rgba(0, 0, 0, 0.6)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
  lineHeight:Height(15)
},

});