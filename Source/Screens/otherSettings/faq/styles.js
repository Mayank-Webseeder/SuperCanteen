import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height } from "@constants/index";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 0,
  
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
    paddingTop:4
  },
   searchContainer: {
    flex: 0.97,
  
  },
  searchInput: {
      height: Height(34),  // Reduced height
      borderRadius: 5,     // Tighter radius
      paddingHorizontal: 12,
      fontSize: 14,        // Smaller font
    },
  searchIcon: {
    marginRight: 12,
  },
  searchText: {
    fontSize: 16,
    color: COLORS.muted,
    fontFamily: 'Inter-Regular',
  },
  faqContainer: {
    marginBottom: Height(10),
    marginTop:Height(20)
  },
  faqItem: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: FontSize(14),
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: 'Inter-SemiBold',
    marginRight: 12,
    lineHeight:Height(21)
  },
  faqAnswer: {
    padding: 13,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  faqAnswerText: {
    fontSize: FontSize(13.5),
    lineHeight: 22,
    color: COLORS.muted,
    fontFamily: 'Inter-Regular',
  },
  helpSection: {
    backgroundColor:'#EEF4F7',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  helpText: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  helpButton: {
    backgroundColor: COLORS.green,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
  },
});