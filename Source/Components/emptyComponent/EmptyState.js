import { COLORS, Height } from '@constants/index';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const EmptyState = ({ 
  imageSource, 
  title, 
  subtitle = 'Just relax, let us help you find some first-class products', 
  buttonLabel = 'Continue Shopping', 
  onPress,
  notDisplayButton,
  allEmpty
}) => {
  return (
    <View style={styles.container}>
     
      {allEmpty ? <Text style={styles.title}>No data</Text> : <>
       {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
{!notDisplayButton && <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>}
      </>}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily:"Inter-SemiBold",
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight:Height(20),
    fontFamily:"Inter-Regular"
  },
  button: {
    backgroundColor: COLORS.green, 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
