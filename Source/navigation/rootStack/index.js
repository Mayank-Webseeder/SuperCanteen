import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../bottomTab';
import SigninScreen from '../../screens/auth/signIn';
import SignUpScreen from '../../screens/auth/signUp';
import WelcomeScreen from '../../screens/auth/welcome';
import ForgotPasswordScreen from '../../screens/auth/forgotPassword'
import ResetPasswordScreen from '../../screens/auth/resetPassword';
import SearchScreen from '../../components/searchScreen';
import ProductDetails from '../../components/productDetails/productDetails';
import ProdcutCategory from '../../screens/categories/productsCategory';
import ProductCheckoutScreen from '../../screens/orders/payment/productCheckOut'
import OrderConfirm from '../../screens/orders/orderConfirm';
import CartScreen from '../../screens/orders/cart';
import OrderDetailScreen from '../../screens/orders/detail/orderDetailScreen';
import OrderConfirmFinal from '../../screens/orders/orderConfirm/orderFinal'
import WishlistScreen from '../../screens/home/wishlist';
import ProductsScreen from '../../screens/categories/product';
import PaymentMethodScreen from '../../screens/orders/payment/selectPayment';
import PaymentConfirmationProcess from '../../screens/orders/payment/confirm';
import CreateAddressScreen from '../../components/address/createAddress';
import CouponScreen from '../../screens/otherSettings/Coupons';
import PaymentScreen from '../../screens/otherSettings/paymentMethods';
import NotificationScreen from '../../screens/otherSettings/notification';
import OffersScreen from '../../screens/otherSettings/offers';
import HelpScreen from '../../screens/otherSettings/helpSupport';


const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
     <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
           <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="ProdcutCategory" component={ProdcutCategory} />
              <Stack.Screen name="ProductCheckoutScreen" component={ProductCheckoutScreen} />
                <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
                 <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
               <Stack.Screen name="OrderConfirmFinal" component={OrderConfirmFinal} />
              <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="PaymentMethodScreen" component={  PaymentMethodScreen} />

          
            <Stack.Screen name="PaymentConfirmationProcess" component={PaymentConfirmationProcess} />
          <Stack.Screen name="CreateAddressScreen" component={CreateAddressScreen} />
          <Stack.Screen name="Coupons" component={CouponScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="Offers" component={OffersScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
  )
}