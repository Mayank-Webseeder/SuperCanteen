import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../Components/CustomBotton';
import { styles } from './styles';
import { iconOptions, settingsOptions } from '../../Mock/Data/settingOptions';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth)

  const onLogoutBtnClick = async () => {
    try {
      await dispatch(logout());
      navigation.navigate('Signin')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const footerItems = [
    { 
      label: 'FAQ', 
      icon: <MaterialCommunityIcons name="help-circle-outline" size={22} color="#2E6074" />,
      action: () => navigation.navigate('FAQ')
    },
    { 
      label: 'ABOUT US', 
      icon: <Ionicons name="information-circle-outline" size={22} color="#2E6074" />,
      action: () => navigation.navigate('AboutUs')
    },
    { 
      label: 'PRIVACY POLICY', 
      icon: <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#2E6074" />,
      action: () => navigation.navigate('PrivacyPolicy')
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
                    onPress={() => navigation.navigate(screen)}
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
              <TouchableOpacity key={name} onPress={() => navigation.navigate(screen)}>
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
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.settingsRow}>
                <Text style={styles.label}>Super Canteen Rewards</Text>
                <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <View style={styles.footerGrid}>
              {footerItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.footerItem}
                  onPress={item.action}
                >
                  <View style={styles.iconContainer}>
                    {item.icon}
                  </View>
                  <Text style={styles.footerLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>App Version 1.0.0</Text>
            </View>
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