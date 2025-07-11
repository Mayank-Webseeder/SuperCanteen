import { COLORS } from '@constants/index';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  container: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  lottieContainer: {
    width: 100,
    height: 100,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
   fontFamily:"Inter-SemiBold",
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
    fontFamily:"Inter-Regular"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems:"center",
    justifyContent:"center"
  },
  denyButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  denyButtonText: {
    color: '#333',
    fontFamily:"Inter-SemiBold",
  },
  allowButton: {
    // flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: COLORS.green,
    alignItems: 'center',
  },
  allowButtonText: {
    color: '#fff',
    fontFamily:"Inter-SemiBold",
    fontSize:13
  },
});