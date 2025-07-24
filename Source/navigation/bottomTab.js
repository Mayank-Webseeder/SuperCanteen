import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeIcon } from '../../assets/Icons/svgIcons/home';
import { CategoryIcon } from '../../assets/Icons/svgIcons/category';
import { OrdersIcon } from '../../assets/Icons/svgIcons/orders';
import { AccountIcon } from '../../assets/Icons/svgIcons/account_circle';
import HomeScreen from '../Screens/Home/home';
import Categories from '../Screens/categories';
import Orders from '../Screens/Orders/order';
import AccountStack from './accountStack';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
export default function  BottomTabs  ({navigation}){
   const { token } = useSelector(state => state.auth);
     const insets = useSafeAreaInsets();
  return (
   <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2E6074E8',
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Inter-SemiBold', paddingBottom: 4 },
        tabBarStyle: {  
          height: 70 + insets.bottom, 
          paddingTop: 8,
          backgroundColor: 'white',
          borderTopWidth: 0,
          // Remove position absolute and elevation
          // Add shadow for iOS
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          // Elevation for Android
          elevation: 10, },
           tabBarItemStyle: {
          height: 50, // Adjust item height
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home': return <HomeIcon color={color} size={size} />;
            case 'Categories': return <CategoryIcon color={color} size={size} />;
            case 'Orders': return <OrdersIcon color={color} size={size} />;
            case 'Account': return <AccountIcon color={color} size={size} />;
            default: return <HomeIcon color={color} size={size} />;
          }
        },
        tabBarButton: (props) => {
          if (route.name === 'Orders' && !token) {
            return (
              <TouchableOpacity
                {...props}
                onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
              />
            );
          }
          return <TouchableOpacity {...props} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen 
        name="Orders" 
        component={Orders}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!token) {
              e.preventDefault();
              navigation.navigate('Auth', { screen: 'Login' });
            }
          },
        })}
      />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};