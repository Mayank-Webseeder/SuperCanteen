// navigation/appStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './bottomTab';
import SearchScreen from '../Components/searchScreen';
import ProductDetails from '../Components/productDetails/productDetails';
import ProdcutCategory from '../Screens/categories/productsCategory';
import ProductCheckoutScreen from '../Screens/Orders/payment/productCheckOut';
import OrderConfirm from '../Screens/Orders/orderConfirm';
import CartScreen from '../Screens/Orders/cart';
import OrderDetailScreen from '../Screens/Orders/detail/orderDetailScreen';
import OrderConfirmFinal from '../Screens/Orders/orderConfirm/orderFinal';
import WishlistScreen from '../Screens/Home/wishlist';
import ProductsScreen from '../Screens/categories/product'
import PaymentMethodScreen from '../Screens/Orders/payment/selectPayment';
import PaymentConfirmationProcess from '../Screens/Orders/payment/confirm';
import CreateAddressScreen from '../Components/address/createAddress';
import CouponScreen from '../Screens/otherSettings/Coupons';
import PaymentScreen from '../Screens/otherSettings/paymentMethods';
import NotificationScreen from '../Screens/otherSettings/notification';
import OffersScreen from '../Screens/otherSettings/offers';
import HelpScreen from '../Screens/otherSettings/helpSupport';
import ContactSupport from '@screens/otherSettings/contactSupport';
import SuperCanteenRewards from '@screens/otherSettings/superCanteenRewards';
import AboutUsScreen from '@screens/otherSettings/aboutUs';
import PrivacyPolicyScreen from '@screens/otherSettings/privacyPolicy';
import FAQScreen from '@screens/otherSettings/faq';
import CouponProductsScreen from '@screens/otherSettings/Coupons/CouponProducts';
import InvoiceScreen from '@screens/Orders/invoice';
import AddressListScreen from '@components/address/addressList';
import RazorpayWebView from '@screens/Orders/payment/razorpayWebView';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>   
      {/* Public screens */}
       <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProdcutCategory" component={ProdcutCategory} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupport} />
      <Stack.Screen name="SuperCanteenRewards" component={SuperCanteenRewards} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="CouponProduct" component={CouponProductsScreen} />
     
 
      {/* Protected screens */}
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="OrderConfirmFinal" component={OrderConfirmFinal} />
      <Stack.Screen name="ProductCheckoutScreen" component={ProductCheckoutScreen} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
      <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="PaymentConfirmationProcess" component={PaymentConfirmationProcess} />
      <Stack.Screen name="CreateAddressScreen" component={CreateAddressScreen} />
      <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
      <Stack.Screen name="Coupons" component={CouponScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="RazorpayWebView" component={RazorpayWebView} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
      

    </Stack.Navigator>
  );
};

export default AppStack;
