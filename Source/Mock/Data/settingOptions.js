import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const iconOptions = [
  { label: 'Orders', icon: <Ionicons name="cart-outline" size={24} color="#2E6074E8" />, screen: 'Orders' },
  { label: 'Wishlist', icon: <MaterialIcons name="favorite-border" size={24} color="#2E6074E8" />, screen: 'Wishlist' },
  { label: 'Coupons', icon: <FontAwesome5 name="ticket-alt" size={22} color="#2E6074E8" />, screen: 'Coupons' },
  // { label: 'Help', icon: <FontAwesome5 name="headset" size={22} color="#2E6074E8" />, screen: 'Help' },
];

export const settingsOptions = [
  { name: 'Personal Information', screen: 'LoginSecurity' },
  { name: 'Notifications', screen: 'NotificationScreen' },
  { name: 'Manage Address', screen: 'AddressListScreen' },
  // { name: 'Payment Methods', screen: 'PaymentScreen' },
  { name: 'Contact Support', screen: 'ContactSupport' },
  { name: 'Bug Report', screen:'BugReportScreen'}, 
  { name: 'Rate Us', screen: '' },
];

export const footerItems = ['FAQ', 'ABOUT US', 'TERMS OF USE', 'PRIVACY POLICY'];