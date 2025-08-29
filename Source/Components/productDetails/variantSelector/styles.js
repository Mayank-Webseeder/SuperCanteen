import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#000",
  },
  sizeBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  selectedSize: {
    backgroundColor: "#333",
  },
  sizeText: {
    fontSize: 14,
    color: "#333",
  },
  selectedSizeText: {
    color: "#fff",
  },
  disabledSize: {
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
  },
  disabledSizeText: {
    color: "#aaa",
  },
});
