import { StyleSheet } from "react-native";
import { Height, Width } from "../../../constants";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    padding: 16,
    width: 360,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    backgroundColor: '#D4DEF226',
    height: 120,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: Height(80),
    height: Height(80),
    resizeMode:"cover"
  },
  infoContainer: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
    marginBottom: 4,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 6,
  },
  truckIcon: {
    width: 20,
    height: 20,
  },
  productDescription: {
    fontSize: 12,
    color: '#8E8E8E',
    right:Width(2)
  },
  linkText: {
    color: '#2E6074',
    textDecorationLine: 'underline',
    fontSize: 13,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  buttonText: {
    color: '#2E6074E8',
    fontSize: 14,
  },
   feedbackContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  feedbackText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 8,
  }
});
