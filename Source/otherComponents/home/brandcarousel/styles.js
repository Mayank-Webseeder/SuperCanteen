import { StyleSheet } from "react-native";
import { Height , Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    marginTop: Height(12),
  },
  card: {
    marginRight: Width(12),
    

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
});