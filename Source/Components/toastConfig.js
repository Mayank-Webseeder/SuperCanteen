
import { View, Text } from 'react-native';

export const toastConfig = {
  wishlistToast: ({ text1 }) => (
    <View
      style={{
        backgroundColor: '#2E6074',
        padding: 14,
        borderRadius: 14,
        marginHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        width:"80%"
      }}>
      <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>
        {text1}
      </Text>
    </View>
  ),
};
