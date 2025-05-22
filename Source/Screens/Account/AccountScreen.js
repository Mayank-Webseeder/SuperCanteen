import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../../Components/CustomBotton';
import { Height } from '../../constants/constants';

const AccountScreen = () => {
  const handlePress = (label) => {
    console.log(`Pressed ${label}`);
    // navigation.navigate(label); // Add this if using React Navigation
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <CustomHeader label="Your Account" />
        <View style={{marginHorizontal:10}}>
           <Text style={styles.greeting}>Hi, Apoorva!</Text>
        <Text style={styles.phone}>999-999-9999</Text>
         {/* Action Icons */}
        <View style={styles.containerBox}>
          <View style={styles.row}>
            <View style={styles.iconColumn}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => handlePress('Orders')}>
                <Ionicons name="cart-outline" size={24} color="#2E6074E8" />
              </TouchableOpacity>
              <Text style={styles.label}>Orders</Text>
            </View>

            <View style={styles.iconColumn}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => handlePress('Wishlist')}>
                <MaterialIcons
                  name="favorite-border"
                  size={24}
                  color="#2E6074E8"
                />
              </TouchableOpacity>
              <Text style={styles.label}>Wishlist</Text>
            </View>

            <View style={styles.iconColumn}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => handlePress('Coupons')}>
                <FontAwesome5
                  name="ticket-alt"
                  size={22}
                  color="#2E6074E8"
                />
              </TouchableOpacity>
              <Text style={styles.label}>Coupons</Text>
            </View>

            <View style={styles.iconColumn}>
              <TouchableOpacity
                style={styles.box}
                onPress={() => handlePress('Help')}>
                <FontAwesome5 name="headset" size={22} color="#2E6074E8" />
              </TouchableOpacity>
              <Text style={styles.label}>Help</Text>
            </View>
          </View>
        </View>
         {/* Account Settings */}
        <View style={[styles.containerBox, styles.sectionBox,{marginTop:20}]}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          {[
            'Personal Information',
            'Manage Address',
            'Payment Methods',
            'Language',
            'Notifications',
          ].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(item)}>
              <View style={styles.settingsRow}>
                <Text style={styles.label}>{item}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#2E6074E8"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
         {/* Membership Section */}
        <View style={[styles.containerBox, styles.sectionBox,{marginTop:20}]}>
          <Text style={styles.sectionHeader}>Membership and Offers</Text>
          <TouchableOpacity
            onPress={() => handlePress('Super Canteen Rewards')}>
            <View style={styles.settingsRow}>
              <Text style={styles.label}>Super Canteen Rewards</Text>
              <Ionicons name="chevron-forward" size={18} color="#2E6074E8" />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Footer Links */}
        <View style={styles.footerLinks}>
          {['FAQ', 'ABOUT US', 'TERMS OF USE', 'PRIVACY POLICY'].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item)}>
                <Text style={styles.footerText}>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
        </View>

        <View style={styles.logoutContainer}>
         <CustomButton  textColor={'#fff'}   backgroundColor = '#2E6074E8'label={"Logout"}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
   marginHorizontal:10,
    paddingTop: 10,
    rowGap: 10,
  },
  greeting: {
    fontSize: 15,
    fontFamily:'Inter-Medium'

  },
  phone: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
    fontFamily:'Inter-Regular'
  },
  containerBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  box: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontFamily:'Inter-Medium'
  },
  sectionBox: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontFamily:'Inter-SemiBold'
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingTop:8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  footerLinks: {
    paddingTop: Height(20),
    paddingHorizontal:Height(5)
  },
  footerText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    fontFamily:'Inter-Regular'
  },
  logoutContainer: {
    paddingHorizontal: 20,
   paddingBottom: 30,
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
