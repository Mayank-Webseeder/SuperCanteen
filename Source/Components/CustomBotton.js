import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({
  label,
  onPress,
  backgroundColor = '#2E6074',
  textColor = '#fff',
  borderRadius = 10,
  paddingVertical = 14,
  fontSize = 16,
  loading = false,
  disabled = false,
  fullWidth = true,
  style = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          borderRadius,
          paddingVertical,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={[
            styles.label,
            { color: textColor, fontSize },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    borderWidth:1,
    borderColor: '#416F81',
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#416F81'

  },
});
