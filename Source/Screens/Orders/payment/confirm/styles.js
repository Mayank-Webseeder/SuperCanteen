import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../../../constants";

// Styles
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white},
    contentContainerStyle:{
        paddingBottom:Height(8)
    },
    footer: {
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: COLORS.white,
        padding: 12,
    },
    selectionBtn: {
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '600',
    },
     confirmButton: {
    backgroundColor: '#2E6074',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
    confirmText: { color: COLORS.white, fontWeight: '600' },
});