import { StyleSheet } from "react-native";
import { COLORS , FontSize , Height,Width } from "../../../constants";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  headerContainer: {
    paddingHorizontal: Width(20),
    paddingBottom: Height(10),
     marginTop:Height(6)
  },
  welcomeText: {
    fontSize: FontSize(20),
    fontFamily: 'Inter-SemiBold',
    color: COLORS.green,
    marginBottom: Height(5),
  },
  subtitleText: {
    fontSize: FontSize(14),
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  inputView: {
    rowGap: 10, 
     marginTop: Height(7), 
    marginHorizontal: Height(20)
  },
  buttonView: {
    marginTop: Height(20),
  },
  modernDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Height(20),
    marginHorizontal: Width(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#64748B',
    fontFamily: 'Inter-Medium',
    fontSize: FontSize(12),
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 1,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.green,
    fontFamily: "Inter-Regular"
  },
  signInText: {
    color: COLORS.green,
    fontFamily: "Inter-Medium",
    fontSize: FontSize(14)
  },
  textStyle: {
    fontSize: 16, 
    fontFamily: 'Inter-SemiBold'
  }
});