import { StyleSheet } from "react-native";
import { COLORS, Width } from "../../../constants";
export const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    
  },
  stepTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:Width(25)
  },
  connector: {
    width: Width(30),
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  completedConnector: {
    backgroundColor: COLORS.green,
  },
  stepText: {
    fontSize: 12,
    color:COLORS.darkGray,
    marginTop: 4,
    textAlign: 'center',
 marginRight:Width(25)
  },
  completedText: {
    color: COLORS.green,
    fontWeight: '600',
  },
});
