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
  
    paddingBottom: 10,
  },
  mainStyle:{
    paddingHorizontal:24
  },
  section: {
    marginBottom:0,
    marginTop:5,
    paddingHorizontal:24
  },
  sectionTitle: {
    fontSize: FontSize(17),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: Height(5),
    fontFamily: 'Inter-Bold',
  },
  sectionText: {
    fontSize: FontSize(14),
    lineHeight: 24,
    color: COLORS.content,
    fontFamily: 'Inter-Regular',
  },
  policySection: {
    marginTop: Height(0),
  },
  policyItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal:24
  },
  policyIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  policyTextContainer: {
    flex: 1,
  },
  policyTitle: {
    fontSize: Height(14),
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: Height(4),
    fontFamily: 'Inter-SemiBold',
  },
  policyText: {
    fontSize: FontSize(13),
    lineHeight: 22,
    color: COLORS.muted,
    fontFamily: 'Inter-Regular',
  },
  updateSection: {
    marginTop: 32,
    paddingTop: 16,
  
  },
  updateText: {
    fontSize: 14,
    color: COLORS.muted,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});