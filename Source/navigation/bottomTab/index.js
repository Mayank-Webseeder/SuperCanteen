import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeIcon } from '../../../assets/Icons/svgIcons/home';
import { CategoryIcon } from '../../../assets/Icons/svgIcons/category';
import { OrdersIcon } from '../../../assets/Icons/svgIcons/orders';
import { AccountIcon } from '../../../assets/Icons/svgIcons/account_circle';
import HomeScreen from '../../Screens/Home/home';
import Categories from '../../Screens/categories';
import Orders from '../../Screens/Orders/order';
import AccountStack from '../accountStack';

const Tab = createBottomTabNavigator();

export default function  BottomTabs  (){
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
};