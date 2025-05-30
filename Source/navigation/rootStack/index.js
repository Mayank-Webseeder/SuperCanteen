import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from '../bottomTab';
import SigninScreen from '../../Screens/auth/signIn';
import SignUpScreen from '../../Screens/auth/signUp';
import WelcomeScreen from '../../Screens/auth/welcome';
import ForgotPasswordScreen from '../../Screens/auth/forgotPassword'
import ResetPasswordScreen from '../../Screens/auth/resetPassword';
import SearchScreen from '../../Components/searchScreen';
import ProductDetails from '../../Components/productDetails/productDetails';
import ProdcutCategory from '../../Screens/categories/productsCategory';
import ProductCheckoutScreen from '../../Screens/Orders/payment/productCheckOut'
import OrderConfirm from '../../Screens/Orders/orderConfirm';
import CartScreen from '../../Screens/Orders/cart';
import OrderDetailScreen from '../../Screens/Orders/detail/orderDetailScreen';
import OrderConfirmFinal from '../../Screens/Orders/orderConfirm/orderFinal'
import WishlistScreen from '../../Screens/Home/wishlist';
import ProductsScreen from '../../Screens/categories/product';
import PaymentMethodScreen from '../../Screens/Orders/payment/selectPayment';
import PaymentConfirmationProcess from '../../Screens/Orders/payment/confirm';
import CreateAddressScreen from '../../Components/address/createAddress';
import CouponScreen from '../../Screens/otherSettings/Coupons';
import PaymentScreen from '../../Screens/otherSettings/paymentMethods';
import NotificationScreen from '../../Screens/otherSettings/notification';
import OffersScreen from '../../Screens/otherSettings/offers';
import HelpScreen from '../../Screens/otherSettings/helpSupport';


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