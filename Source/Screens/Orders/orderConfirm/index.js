import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomCommonHeader from '../../../Components/Common/customCommonHeader';
import { useNavigation } from '@react-navigation/native';

const OrderConfirm = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OrderConfirmFinal'); // Ensure this screen is registered in your navigator
    }, 500);

    return () => clearTimeout(timer); // cleanup if component unmounts early
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="Order Confirm Page" />
      <View style={styles.content}>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your order's on its way — and we're already excited for your next visit!
        </Text>
        <Image
          source={require('../../../../assets/OrderPlaced.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default OrderConfirm;

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
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight:'Inter-Medium',
    marginBottom: 12,
    color: '#216213',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});
