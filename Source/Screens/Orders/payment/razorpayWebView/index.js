import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import { getRazorpayKey, clearPaymentState, verifyPayment } from '../../../../redux/slices/paymentSlice';
import { COLORS } from '@constants/index';

const RazorpayWebView = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const webViewRef = useRef(null);
  const { 
    razorpayKey, 
    loading: keyLoading,
    verificationLoading,
    verificationError,
    isVerified
  } = useSelector(state => state.payment);
  
  const {orderId, RazorpayOrderId, amount, userDetails } = route.params;
  const [showWebView, setShowWebView] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState(null);

  console.log("🧾 Razorpay Params:", {
    razorpayKey,
    RazorpayOrderId,
    amount,
    userDetails
  });

  useEffect(() => {
    if (razorpayKey && RazorpayOrderId && amount) {
      setTimeout(() => {
        setShowWebView(true);
      }, 300);
    }
  }, [razorpayKey]);

  useEffect(() => {
    dispatch(getRazorpayKey());
    
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  // Enhanced back handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (paymentStatus === null) {
        showMessage({
          message: 'Payment in progress. Are you sure you want to cancel?',
          type: 'warning',
          actions: [
            {
              text: 'Cancel Payment',
              onPress: () => {
                setPaymentStatus('cancelled');
                navigation.goBack();
              },
              color: COLORS.red
            },
            {
              text: 'Continue',
              onPress: () => {},
              color: COLORS.green
            }
          ]
        });
      } else {
        navigation.goBack();
      }
      return true;
    });

    return () => backHandler.remove();
  }, [navigation, paymentStatus]);

  const handleMessage = async (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.status === 'success') {
      setPaymentStatus('success');
      try {
        await dispatch(verifyPayment({
          orderId: orderId,
          razorpay_payment_id: data.paymentId,
          razorpay_order_id:RazorpayOrderId,
          razorpay_signature: data.signature
        })).unwrap();

        navigation.replace('OrderConfirm', { 
          paymentSuccess: true,
          paymentId: data.paymentId,
          orderId: orderId,
        });
      } catch (error) {
        setPaymentStatus('verification_failed');
        showMessage({
          message: error.message || 'Payment verification failed',
          type: 'danger',
          icon: 'danger',
          duration: 4000,
          onHide: () => navigation.goBack() // Only navigate back after message is hidden
        });
      }
    } else if (data.status === 'failed') {
      setPaymentStatus('failed');
      let errorMessage = data.error?.description || 'Payment failed. Please try again.';
      
      if (errorMessage.includes('another method')) {
        errorMessage = 'The selected payment method failed. Please try another bank or payment option.';
      }

      showMessage({
        message: errorMessage,
        type: 'danger',
        icon: 'danger',
        duration: 4000,
        onHide: () => navigation.goBack() // Only navigate back after message is hidden
      });
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

  if (verificationLoading) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader navigation={navigation} title="Verifying Payment" />
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.green}/>
          <Text style={{ marginTop: 10 }}>Verifying your payment...</Text>
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
            "order_id": "${RazorpayOrderId}",
            "handler": function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: 'success',
                paymentId: response.razorpay_payment_id,
                RazorpayOrderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              }));
            },
            "prefill": {
              "name": "${userDetails.name}",
              "email": "${userDetails.email}",
              "contact": "${userDetails.phone}"
            },
            "theme": {
              "color": '#2E6074'
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
        ref={webViewRef}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          showMessage({
            message: 'Payment gateway error. Please try another method.',
            type: 'danger',
            duration: 4000,
            onHide: () => navigation.goBack()
          });
        }}
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