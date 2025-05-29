import { StyleSheet } from "react-native";
import { FontSize, Height, Width } from "../../constants";
import { COLORS } from "../../constants";
export const styles = StyleSheet.create({
  main:{
    paddingVertical:Height(10)
  },
  card: {
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 6,
  },
  label: {
    fontSize: FontSize(12),
    color: COLORS.grey,
    fontFamily:'Inter-Bold' ,
    right:Width(3)
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Height(6),
  },
  title: {
    fontSize: FontSize(12),
    color: '#545454',
    marginTop: 6,
    fontFamily:'Inter-SemiBold'
  },
  price: {
    fontSize: FontSize(12),
    color: '#545454',
    marginTop: 2,
    textAlign: 'left',
    paddingLeft: Width(2),
    fontFamily:'Inter-Regular'
  },
});