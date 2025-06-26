
import { View, Text, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const toastConfig = {
  wishlistToast: ({ text1, props }) => (
    <View style={styles.toastContainer}>
      <View style={styles.toastContent}>
        <View style={styles.toastIcon}>
          {typeof props.iconType === 'string' ? (
            <Text style={{ fontSize: 16 }}>{props.iconType}</Text>
          ) : (
            props.iconType
          )}
        </View>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    </View>
  ),
};


const styles = StyleSheet.create({
   toastContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 14,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 7,
    width: '90%',
    alignSelf: 'center',
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  wishlistIcon: {
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
})
