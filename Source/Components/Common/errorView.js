import { View,StyleSheet } from 'react-native';
const ErrorView = ({containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default ErrorView;