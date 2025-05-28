import { StyleSheet } from "react-native";
import { COLORS, FontSize, Height, Width } from "../../constants/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: 'space-between',
    paddingTop: Height(20),
  },
  iconStyle: {
    marginLeft: Width(6),
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: Width(10)
  },
  scrollContainer: {
    paddingBottom: Height(20),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Height(100)
  },
  noDataText: {
    fontSize: FontSize(16),
    color: COLORS.gray
  },
  textStyle:{
    fontSize: FontSize(13), marginBottom: Height(12)
  },
  containerView:{
    paddingTop: Height(8), marginHorizontal: Width(12)
  },
  mainStyle:{
    paddingTop: Height(13), marginHorizontal: Height(12)
  },
  section:{
    paddingTop: Height(13), marginHorizontal: Height(13)
  }
});