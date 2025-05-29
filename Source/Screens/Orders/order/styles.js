import { StyleSheet } from "react-native";
import { COLORS, Width } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal:Width(18)
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.green,
  },
    listContent: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },

});