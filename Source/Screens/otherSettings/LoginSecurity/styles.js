import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../constants";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 16,marginTop:Height(18),borderWidth:1,borderColor:'#d2d2d2',marginHorizontal:20 },
  sectionTitle: { marginBottom: 10 , fontFamily:'Inter-SemiBold'},
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  label: { fontSize: 12, color: '#999', fontFamily:'Inter-SemiBold' },
  value: { fontSize: 14, marginTop: 2 , fontFamily:'Inter-Regular'},
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  editText: { color: COLORS.green, fontSize: 12 },
});