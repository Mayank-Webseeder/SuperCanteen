import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CustomBtn = ({
  title = 'Button',
  borderColor = '#d2d2d2',
  backgroundColor = 'transparent',
  textColor = '#1C1B1F7D',
  onPress = () => {},
  icon = null, // expects a React element (icon component)
  width = 150,  // default width
  height = 44,  // default height
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor, backgroundColor, width, height }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomBtn

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // icon and text side by side
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8, // spacing between icon and text
  },
  text: {
    fontFamily:'Inter-SemiBold',
    fontSize: 12,
  },
})
