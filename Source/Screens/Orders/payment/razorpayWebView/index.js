import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import {
  getRazorpayKey,
  clearPaymentState,
  verifyPayment
} from '../../../../redux/slices/paymentSlice';
import { COLORS } from '@constants/index';

const RazorpayWebView = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const webViewRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { razorpayKey, loading: keyLoading } = useSelector(state => state.payment);
  const { orderId, RazorpayOrderId, amount, userDetails } = route.params;
  const isNavigatingRef = useRef(false);

  // Get Razorpay key
  useEffect(() => {
    dispatch(getRazorpayKey());
    return () => dispatch(clearPaymentState());
  }, [dispatch]);

  // Debug logs
  useEffect(() => {
    console.log('🔑 RazorpayKey:', razorpayKey);
    console.log('🧾 RazorpayOrderId:', RazorpayOrderId);
    console.log('💰 Amount:', amount);
  }, [razorpayKey, RazorpayOrderId, amount]);

  const handleBackPress = useCallback(() => {
    if (isNavigatingRef.current) return true;
    isNavigatingRef.current = true;

    if (isModalOpen) {
      webViewRef.current?.injectJavaScript(`
        try {
          if (typeof window.rzp1 !== 'undefined') {
            window.rzp1.close();
          } else {
            window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'closed' }));
          }
        } catch(e) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'closed' }));
        }
      `);
    } else {
      navigation.goBack();
    }

    return true;
  }, [isModalOpen, navigation]);

  // Android hardware back
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
      return () => backHandler.remove();
    }, [handleBackPress])
  );

  // Custom header back button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={handleBackPress} />
      ),
    });
  }, [navigation, handleBackPress]);

const handleMessage = async (event) => {
  try {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.status === 'success') {
      setIsProcessing(true);
      setIsModalOpen(false);

      // Navigate immediately
      navigation.replace('OrderConfirm', {
        paymentSuccess: true,
        paymentId: data.paymentId,
        orderId
      });

      // Trigger verify in background
      dispatch(verifyPayment({
        orderId,
        razorpay_payment_id: data.paymentId,
        razorpay_order_id: RazorpayOrderId,
        razorpay_signature: data.signature
      }));
    } else if (data.status === 'modalOpened') {
      setIsModalOpen(true);
    } else if (data.status === 'closed') {
      setIsModalOpen(false);
      if (!isNavigatingRef.current) navigation.goBack();
    } else if (data.status === 'failed') {
      setIsModalOpen(false);
      navigation.goBack();
    }
  } catch (error) {
    console.error('Payment error:', error);
    navigation.goBack();
  } finally {
    setIsProcessing(false);
    isNavigatingRef.current = false;
  }
};


  const getHtmlContent = () => {
    if (!razorpayKey || !RazorpayOrderId || !amount) {
      console.warn("Missing Razorpay credentials.");
      return `<h3>Unable to initiate Razorpay Checkout. Please try again later.</h3>`;
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              transition: opacity 0.3s;
              background-color: transparent;
            }
            iframe {
              background-color: transparent !important;
            }
          </style>
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
                ondismiss: function () {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'closed' }));
                },
                backbutton: false,
                escape: false,
                backdropclose: false
              },
              handler: function (response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  status: 'success',
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature
                }));
              }
            };

            var rzp1 = new Razorpay(options);
            rzp1.on('modal.visible', function () {
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'modalOpened' }));
            });

            rzp1.open();

            rzp1.on('payment.failed', function () {
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'failed' }));
            });
          </script>
        </body>
      </html>
    `;
  };

  if (!razorpayKey || !RazorpayOrderId || !amount) {
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
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ backgroundColor: 'transparent' }}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            isNavigatingRef.current = false;
          }
        }}
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
    backgroundColor: 'transparent'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default RazorpayWebView;
