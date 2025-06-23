import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../Components/CustomBotton';
import { styles } from './styles';
import { iconOptions, settingsOptions } from '../../Mock/Data/settingOptions';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';



const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onLogoutBtnClick = async () => {
    try {
      await dispatch(logout());
      navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', state: {
        routes: [{ name: 'Signin' }]
      }}],
    });

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const footerItems = [
    {
      label: 'ABOUT US',
  icon: <MaterialCommunityIcons name="help-circle-outline" size={22} color="#2E6074" />,
     action: () => navigation.navigate('AboutUs'),

    },
    {
      label: 'PRIVACY POLICY',
      icon: <Ionicons name="information-circle-outline" size={22} color="#2E6074" />,
      action: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      label: 'FAQ',
  icon: <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#2E6074" />,
      action: () => navigation.navigate('FAQ'),
    },
  ];


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <CustomHeader notShowingBackIcon navigation={navigation} label="Your Account" />

          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>Hi, {user?.username}!</Text>
            <Text style={styles.subtitle}>Manage your account settings</Text>
          </View>

          {/* Icon Grid */}
          <View style={styles.containerBox}>
  <View style={styles.row}>
    {iconOptions.map(({ label, icon, screen }) => (
      <View key={label} style={styles.iconColumn}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            if (
              (screen === 'Orders' || screen === 'Wishlist') &&
              (!user || !user.username)
            ) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Auth',
                    state: { routes: [{ name: 'Signin' }] },
                  },
                ],
              });
            } else {
              navigation.navigate(screen);
            }
          }}
        >
          {icon}
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
    ))}
  </View>
</View>


          {/* Account Settings */}
          <View style={[styles.containerBox, styles.sectionBox]}>
            <Text style={styles.sectionHeader}>Account Settings</Text>
        {settingsOptions.map(({ name, screen }) => (
  <TouchableOpacity
    key={name}
    onPress={() => {
      if (
        name === 'Personal Information' || name === 'Manage Address' &&
        (!user || !user.username)
      ) {

        navigation.reset({
  index: 0,
  routes: [
    {
      name: 'Auth',
      state: {
        routes: [
          { name: 'Signin' }
        ]
      }
    }
  ]
});


      
      } else {
        navigation.navigate(screen);
      }
    }}
  >
    <View style={styles.settingsRow}>
      <Text style={styles.label}>{name}</Text>
      <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
    </View>
  </TouchableOpacity>
))}

          </View>

          {/* Membership */}
          <View style={[styles.containerBox, styles.sectionBox]}>
            <Text style={styles.sectionHeader}>Membership and Offers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SuperCanteenRewards')}>
              <View style={styles.settingsRow}>
                <Text style={styles.label}>Super Canteen Rewards</Text>
                <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
       {/* Modern Footer Section */}
{/* Redesigned Footer with Equal Spacing */}
<View style={styles.footerWrapper}>
  <View style={styles.footerCard}>
    {footerItems.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={item.action}
        style={styles.footerItemEqual}
        activeOpacity={0.8}
      >
        <View style={styles.footerIconCircle}>{item.icon}</View>
        <Text
          style={styles.footerText}
          // numberOfLines={1}
          ellipsizeMode="tail"
          
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  <Text style={styles.appVersionText}>App Version 1.0.0</Text>
</View>


        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <CustomButton
            onPress={() => onLogoutBtnClick()}
            textColor="#fff"
            backgroundColor="#2E6074E8"
            label="Logout"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
