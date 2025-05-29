import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../../../constants";

export const styles = StyleSheet.create({
  tabContainer: {
    marginHorizontal: Width(7),
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    borderRadius: 20,
    height: Height(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderColor: COLORS.green,
    borderBottomWidth: 1,
  },
  tabText: {
    color: COLORS.black,
    fontSize: FontSize(13),
    fontFamily: 'Inter-Medium',
    marginTop: Height(10),
  },
  activeTabText: {
    color: COLORS.green,
    fontFamily: 'Inter-Medium',
  },
});
