import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getRazorpayKey, clearPaymentState, verifyPayment } from '../../../../redux/slices/paymentSlice';
import { COLORS } from '@constants/index';
const RazorpayWebView = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const webViewRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { razorpayKey, loading: keyLoading } = useSelector(state => state.payment);
  const { orderId, RazorpayOrderId, amount, userDetails } = route.params;

  useEffect(() => {
    dispatch(getRazorpayKey());
    return () => dispatch(clearPaymentState());
  }, [dispatch]);


  
 const handleBackPress = useCallback(() => {
    // Immediately go back without Razorpay confirmation
    navigation.goBack();
    return true; // Prevent default back action
  }, [navigation]);


    useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
      return () => backHandler.remove();
    }, [handleBackPress])
  );


  const handleMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.status === 'success') {
        setIsProcessing(true);
        await dispatch(verifyPayment({
          orderId,
          razorpay_payment_id: data.paymentId,
          razorpay_order_id: RazorpayOrderId,
          razorpay_signature: data.signature
        }));
        navigation.replace('OrderConfirm', {
          paymentSuccess: true,
          paymentId: data.paymentId,
          orderId
        });
      } else if (data.status === 'closed' || data.status === 'failed') {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Payment error:', error);
      navigation.goBack();
    } finally {
      setIsProcessing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Simply go back without any custom alert
        navigation.goBack();
        return true;
      };
      const handler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => handler.remove();
    }, [navigation])
  );

  const getHtmlContent = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>body { margin: 0; padding: 0; }</style>
      </head>
      <body>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script>
          var options = {
            key: "${razorpayKey}",
            amount: "${amount}",
            currency: "INR",
            name: "Super Canteen",
            description: "Order Payment",
            order_id: "${RazorpayOrderId}",
            prefill: {
              name: "${userDetails.name}",
              email: "${userDetails.email}",
              contact: "${userDetails.phone}"
            },
            theme: { color: "#2E6074" },
            modal: {
              ondismiss: function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'closed' }));
              },
              escape: true,  // Allow ESC key to close
              backdropclose: true  // Allow clicking outside to close
            },
            handler: function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: 'success',
                paymentId: response.razorpay_payment_id,
                RazorpayOrderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              }));
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();

          rzp1.on('payment.failed', function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'failed', error: response.error }));
          });
        </script>
      </body>
    </html>
  `;

  if (keyLoading || !razorpayKey) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: getHtmlContent() }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        overScrollMode="never"
        pullToRefreshEnabled={false}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        onError={(e) => {
          console.error('WebView error:', e.nativeEvent);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default RazorpayWebView;
