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
    paddingBottom: 40,
  },
  // Section Styles
  section: {
    paddingHorizontal: 24,
    marginBottom: Height(3),
  
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    fontFamily: 'Inter-Bold',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.content,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  
  // Stats Section
  statsSection: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: Height(10),
    paddingBottom:14
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statNumber: {
    fontSize: FontSize(19),
    fontWeight: '800',
    color: COLORS.green,
    marginBottom: 4,
    fontFamily: 'Inter-ExtraBold',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  
  // Values Section
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Height(6),
  },
  valueCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  valueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  valueText: {
    fontSize: 14,
    color: COLORS.muted,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  
  // Team Section
 
  // CTA Section
  ctaContainer: {
    backgroundColor: COLORS.green,
    padding: 22,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaIcon: {
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  ctaText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter-Medium',
    lineHeight:Height(20)
  },
  ctaButton: {
    backgroundColor:  '#4C7891',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
  },
});