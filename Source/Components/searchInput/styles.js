import { StyleSheet } from "react-native";
import { COLORS, Height, Width } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontFamily:"Inter-Regular",
    elevation: 4,
    paddingLeft:10,
    borderColor:"#D4D4D4",
    borderWidth:1.2,
    height:Height(38)
  },
  disabledInput: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.shadow,
    top:1,
    paddingVertical: 8,
    marginLeft: 5,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 5,
  },
  icon:{
    left:Width(8)
  }
});