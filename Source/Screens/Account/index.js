import React , {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  InteractionManager,
  Linking,
  Platform
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../Components/CustomBotton';
import { styles } from './styles';
import { iconOptions, settingsOptions } from '../../Mock/Data/settingOptions';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';


const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { token, user } = useSelector(state => state.auth);
  const [loading,setLoading] = useState(false)
   const [version, setVersion] = useState('');

    useEffect(() => {
    const v = DeviceInfo.getVersion(); // e.g. "1.0.0"
    setVersion(v);
  }, []);



const rateUs = () => {
  // Show a quick loading state
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    Linking.openURL("https://play.google.com/store/apps/details?id=com.supercanteen&pcampaignid=web_share");
  }, 300); // 300ms delay for smoothness
};

 const onLogoutBtnClick = async () => {
  try {
    setIsLoggingOut(true); // Prevent UI update on logout
    await dispatch(logout());

    InteractionManager.runAfterInteractions(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
            state: {
              routes: [{ name: 'Signin' }],
            },
          },
        ],
      });
    });
  } catch (error) {
    console.error('Logout failed:', error);
    setIsLoggingOut(false);
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

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    if (currentHour < 20) return 'Good Evening';
    return 'Good Night';
  };

  // Filter settings options based on login status
  const getFilteredSettingsOptions = () => {
    return settingsOptions.filter(option => {
      if (!token) {
        // Hide personal info and address management when not logged in
        return !['Personal Information', 'Manage Address'].includes(option.name);
      }
      return true;
    });
  };

    if (isLoggingOut) return null;

  return (
    <ScrollView contentContainerStyle={{paddingBottom:80}} showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <CustomHeader notShowingBackIcon navigation={navigation} label="Your Account" />

          <View style={styles.headerContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}
              {user?.username ? `, ${user.username}!` : ''}
            </Text>
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
                        !token
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

          {/* Login Section (shown only when not logged in) */}
          {!token && (
            <View style={[styles.containerBox, styles.sectionBox]}>
              <Text style={styles.sectionHeader}>Join Us</Text>
              <View style={styles.loginSectionContainer}>
                <Text style={styles.loginButtonText}>
                  Login or create an account to access all features
                </Text>
                <CustomButton
                  onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth', state: { routes: [{ name: 'Signin' }] } }],
                  })}
                  textColor="#fff"
                  backgroundColor="#2E6074E8"
                  label="Login / Register"
                />
              </View>
            </View>
          )}

          {/* Account Settings */}
          <View style={[styles.containerBox, styles.sectionBox]}>
            <Text style={styles.sectionHeader}>Account Settings</Text>
            {getFilteredSettingsOptions().map(({ name, screen }) => (
              <TouchableOpacity
                key={name}
                onPress={() => {
                   if (name === 'Rate Us') {
          rateUs(); // open Play Store
          return;
        }

                  if (
                    (name === 'Bug Report' || name === 'Notifications') &&
                    !token
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
                <View style={styles.settingsRow}>
                  <Text style={styles.label}>{name}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Membership - Only show if logged in */}
          {token && (
            <View style={[styles.containerBox, styles.sectionBox]}>
              <Text style={styles.sectionHeader}>Membership and Offers</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SuperCanteenRewards')}>
                <View style={styles.settingsRow}>
                  <Text style={styles.label}>Super Canteen Rewards</Text>
                  <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer */}
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
                  <Text style={styles.footerText} ellipsizeMode="tail">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.appVersionText}>App Version {version}</Text>
          </View>
        </View>
        
        {/* Logout Button */}
        {user?.id && <View style={styles.logoutContainer}>
          <CustomButton
            onPress={() => onLogoutBtnClick()}
            textColor="#fff"
            backgroundColor="#2E6074E8"
            label="Logout"
          />
        </View>}
      </View>
    </ScrollView>
  );
};

export default AccountScreen;