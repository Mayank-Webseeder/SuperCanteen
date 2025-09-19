import { StyleSheet } from "react-native";
import { COLORS, Height } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    marginBottom: Height(9),
  },
  label: {
    marginBottom: Height(8),
    rowGap: 10 ,
    fontFamily: 'Inter-SemiBold',
    color:COLORS.black
    
  },
  inputContainer: {
  flexDirection: 'row',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 12,
  alignItems: 'center',
  backgroundColor: '#fff',

  // Shadow for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,

  // Shadow for Android
  elevation: 3,
},
  input: {
    flex: 1,
    paddingVertical: 11,
    color: '#000',
  },
  iconWrapper: {
    padding: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: Height(6),
    color: 'red',
    fontSize: 13,
    lineHeight:Height(16)
  },
});