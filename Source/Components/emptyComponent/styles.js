import { StyleSheet } from "react-native";
import { COLORS, Height } from "@constants/index";

export const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
  },
  errorContainer: {
    marginVertical: Height(20),
    paddingHorizontal: 16,
  },
  mainContainer: {
    paddingHorizontal: 8,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: 300,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
  },
  emptyStateActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 120,
  },
  primaryButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    minWidth: 120,
  },
  secondaryButtonText: {
    color: COLORS.green,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});