import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../components/customHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/customBotton';
import { styles } from './styles';
import { footerItems , iconOptions, settingsOptions } from '../../mock/Data/settingOptions';

const AccountScreen = ({ navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.main}>
          <CustomHeader notShowingBackIcon navigation={navigation} label="Your Account" />

          <Text style={styles.greeting}>Hi, Apoorva!</Text>
          <Text style={styles.phone}>999-999-9999</Text>

          {/* Icon Grid */}
          <View style={styles.containerBox}>
            <View style={styles.row}>
              {iconOptions.map(({ label, icon, screen }) => (
                <View key={label} style={styles.iconColumn}>
                  <TouchableOpacity style={styles.box} onPress={() => navigation.navigate(screen)}>
                    {icon}
                  </TouchableOpacity>
                  <Text style={styles.label}>{label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Account Settings */}
          <View style={[styles.containerBox, styles.sectionBox, { marginTop: 20 }]}>
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
          <View style={[styles.containerBox, styles.sectionBox, { marginTop: 20 }]}>
            <Text style={styles.sectionHeader}>Membership and Offers</Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.settingsRow}>
                <Text style={styles.label}>Super Canteen Rewards</Text>
                <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerLinks}>
            {footerItems.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => {}}>
                <Text style={styles.footerText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <CustomButton
            onPress={() => {}}
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
