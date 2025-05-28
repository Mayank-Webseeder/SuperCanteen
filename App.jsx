import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Source/Screens/Home/home/HomeScreen';
import Categories from './Source/Screens/Categories/Categories';
import Orders from './Source/Screens/Orders/orders';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProductsScreen from './Source/Screens/Catogory/ProductsScreen';
import ProdcutCategory from './Source/Screens/Catogory/ProductCategoryScreen';
import WelcomeScreen from './Source/auth/welcomeScreen';
import SigninScreen from './Source/auth/signInScreen';
import SignUpScreen from './Source/auth/signUpScreen';
import ForgotPasswordScreen from './Source/auth/forgotPasswordScreen';
import ResetPasswordScreen from './Source/auth/resetPasswordScreen';
import ProductDetails from './Source/Screens/ProductDetails/ProductDetails';
import ProductCheckoutScreen from './Source/Screens/Orders/productCheckoutScreen';
import PaymentMethodScreen from './Source/Screens/Orders/selectPaymentMethod';
import PaymentConfirmationProcess from './Source/Screens/Orders/paymentConfirmationProcess';
import OrderConfirm from './Source/Screens/Orders/orderConfirm';
import AccountScreen from './Source/Screens/Account/accountScreen';
import CreateAddressScreen from './Source/Screens/Address/CreateAddressScreen';
import AddressListScreen from './Source/Screens/Address/AddressListScreen';
import CartScreen from './Source/Screens/Orders/cart/CartScreen';
import WishlistScreen from './Source/Screens/Home/wishlist/WishlistScreen';
import SearchScreen from './Source/Screens/Search/SearchScreen';
import { HomeIcon } from './assets/Icons/svgIcons/home';
import { CategoryIcon } from './assets/Icons/svgIcons/category';
import { OrdersIcon } from './assets/Icons/svgIcons/orders';
import { AccountIcon } from './assets/Icons/svgIcons/account_circle';
import OrderDetailScreen from './Source/Screens/Orders/orderDetailScreen';
import CouponsScreen from './Source/Screens/otherSettings/Coupons';
import PaymentScreen from './Source/Screens/otherSettings/PaymentMethods';
import NotificationScreen from './Source/Screens/otherSettings/Notification';
import OffersScreen from './Source/Screens/otherSettings/offers';
import LoginSecurityScreen from './Source/Screens/otherSettings/LoginSecurity';
import EditFieldScreen from './Source/Screens/otherSettings/LoginSecurity/EditFieldScreen';
import LanguageScreen from './Source/Screens/otherSettings/Languages';
import HelpScreen from './Source/Screens/otherSettings/HelpSupport';
import OrderConfirmFinal from './Source/Screens/Orders/orderConfirmFinal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    
   
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CategoriesMain" component={Categories} />  
  </Stack.Navigator>
);


const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
    <Stack.Screen name="AddressListScreen" component={AddressListScreen} />
    <Stack.Screen name="LoginSecurity" component={LoginSecurityScreen} />
    <Stack.Screen name="EditField" component={EditFieldScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
  </Stack.Navigator>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2E6074E8',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Inter-SemiBold' },
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon color={color} size={size} />;
            case 'Categories':
              return <CategoryIcon color={color} size={size} />;
            case 'Orders':
              return <OrdersIcon color={color} size={size} />;
            case 'Account':
              return <AccountIcon color={color} size={size} />;
            default:
              return <HomeIcon color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
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
              <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
            <Stack.Screen name="PaymentConfirmationProcess" component={PaymentConfirmationProcess} />
          <Stack.Screen name="CreateAddressScreen" component={CreateAddressScreen} />
          <Stack.Screen name="Coupons" component={CouponsScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="Offers" component={OffersScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
const styles = StyleSheet.create({});
