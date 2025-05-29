import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.content,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: COLORS.green,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  thanksText: {
    textAlign: 'center',
    color: '#27ae60',
    fontSize: 14,
    marginTop: 8,
  },
});