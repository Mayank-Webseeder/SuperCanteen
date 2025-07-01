import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import { getRazorpayKey, clearPaymentState } from '../../../../redux/slices/paymentSlice'
import { COLORS } from '@constants/index';
import { COLORS } from '@constants/index';

const RazorpayWebView = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { razorpayKey, loading: keyLoading } = useSelector(state => state.payment);
  const { orderId, amount, userDetails } = route.params;
  const [showWebView, setShowWebView] = React.useState(false);
  console.log("🧾 Razorpay Params:", {
  razorpayKey,
  orderId,
  amount,
  userDetails
});

useEffect(() => {
  if (razorpayKey && orderId && amount) {
    setTimeout(() => {
      setShowWebView(true);
    }, 300); // wait a bit to ensure render
  }
}, [razorpayKey]);

  // Get Razorpay key on mount
  useEffect(() => {
    dispatch(getRazorpayKey());
    
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    
    if (data.status === 'success') {
      navigation.replace('OrderConfirm', { 
        paymentSuccess: true,
        paymentId: data.paymentId
      });
    } else if (data.status === 'failed') {
      showMessage({
        message: data.error?.description || 'Payment failed. Please try again.',
        type: 'danger',
        icon: 'danger',
        duration: 4000,
      });
      navigation.goBack();
    }
  };

 if (!showWebView) {
  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Secure Payment" />
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.green}/>
      </View>
    </View>
  );
}

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <script>
          var options = {
            "key": "${razorpayKey}",
            "amount": "${amount}", 
            "currency": "INR",
            "name": "Super Canteen",
            "description": "Order Payment",
            "order_id": "${orderId}",
            "handler": function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: 'success',
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              }));
            },
            "prefill": {
              "name": "${userDetails.name}",
              "email": "${userDetails.email}",
              "contact": "${userDetails.phone}"
            },
            "theme": {
              "color": ${COLORS.green}
            }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();
          
          rzp1.on('payment.failed', function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              status: 'failed',
              error: response.error
            }));
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Secure Payment" />
      <WebView
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
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
    alignItems: 'center'
  }
});

export default RazorpayWebView;