import { View, TouchableOpacity, SafeAreaView, Dimensions, ToastAndroid, Platform, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomAuthButton from '../../Components/CustomAuthButton';
import { COLORS, Width } from '../../constants';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomPurchaseBar = ({
  onSharePress,
  onAddToCart,
  onBuyNow,
  addToCartLoading,
  selectionError,
}) => {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  const showToast = (msg) => {
    if (!msg) return;
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('Error', msg);
    }
  };

  const handleAddToCart = () => {
    if (selectionError) {
      showToast(selectionError);
    } else {
      onAddToCart?.();
    }
  };

  const handleBuyNow = () => {
    if (selectionError) {
      showToast(selectionError);
    } else {
      onBuyNow?.();
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : height * 0.02 },
        ]}
      >
        <TouchableOpacity style={styles.iconButton} onPress={onSharePress}>
          <FontAwesome name="share-alt" size={20} color="#2E6074" />
        </TouchableOpacity>

        {/* Add to Cart */}
        <CustomAuthButton
          width={Width(114)}
          title="Add to Cart"
          onPress={handleAddToCart}
          backgroundColor={'#FFFFFF'}
          br={10}
          borderWidth={1}
          borderColor="#2E6074"
          textStyle={[
            styles.buyNowText,
            { color: COLORS.green, fontFamily: 'Inter-Bold' },
          ]}
          marginLeft={Width(20)}
          loading={addToCartLoading}
          loadingColor={COLORS.green}
          buttonStyle={{
            elevation: 3,
            opacity: selectionError ? 0.6 : 1, // 🔥 still clickable but looks disabled
          }}
        />

        {/* Buy Now */}
        <CustomAuthButton
          width={Width(114)}
          title="Buy Now"
          onPress={handleBuyNow}
          backgroundColor={COLORS.green}
          br={10}
          borderWidth={selectionError ? 0 : 1}
          borderColor="#2E6074"
          textStyle={[
            styles.buyNowText,
            { color: '#fff', fontFamily: 'Inter-Bold' },
          ]}
          buttonStyle={{
            elevation: 3,
            opacity: selectionError ? 0.6 : 1, // 🔥 same styling trick
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BottomPurchaseBar;
