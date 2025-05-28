import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "../../../constants/constants";

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingBottom: Height(20),
    marginTop: Height(20),
  },
  background: {
    position: 'absolute',
    width: Width(330),
    height: Height(220),
    borderRadius: Width(18),
    alignSelf: 'center',
    top: 0,
  },
  header: {
    paddingHorizontal: Width(24),
    paddingTop: Height(16),
  },
  title: {
    color: '#fff',
    fontSize: FontSize(13),
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingLeft: Width(24),
    paddingTop: Height(16),
  },
  card: {
    width: Width(94),
    height: Height(150),
    borderRadius: Width(18),
    marginRight: Width(10), // ← spacing between cards
    overflow: 'hidden',
    alignItems:"center",
    justifyContent:"center"

  },
  image: {
    width: '100%',
    height: Height(110), // ← smaller image
    borderTopLeftRadius: Width(18),
    borderTopRightRadius: Width(18),
    marginTop:Height(20)
  },
  cardFooter: {
    backgroundColor: '#092E3DE8',
    justifyContent: 'center',
    alignItems: 'center',
   width: Width(130),
    height: Height(40),


  },
  cardText: {
    color: '#C0C9CD',
    fontSize: FontSize(12),
    textAlign: 'center',
    fontFamily:"Inter-SemiBold",
    bottom:Height(5)
  },
  
});