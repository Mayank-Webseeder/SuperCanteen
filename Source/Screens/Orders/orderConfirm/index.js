import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../../redux/slices/orderSlice';
import LottieView from 'lottie-react-native';
import { Height } from '@constants/index';

const OrderConfirm = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orderId } = route.params;
  const { currentOrder } = useSelector(state => state.orders);
  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('OrderConfirmFinal', { orderId });
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Order Confirmed" showBack={false} />
      
      <Animated.View style={[styles.content]}>
        <LottieView
          source={require('../../../../assets/lottie/success.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Your order #{currentOrder?.orderId} has been confirmed
        </Text>
        
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryText}>
            Estimated Delivery: {new Date(currentOrder?.createdAt).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
    color: '#2E7D32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
    lineHeight:Height(20)
  },
  deliveryInfo: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 14,
    color: '#2E7D32',
    fontFamily: 'Inter-Medium',
  },
});

export default OrderConfirm;