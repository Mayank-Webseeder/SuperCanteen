import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

const SuperCanteenRewards = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
         <Entypo name="chevron-small-left" size={28} color="#1C1B1F" />
      </TouchableOpacity>

      {/* Rewards Content */}
      <View style={styles.iconBox}>
        <Ionicons name="gift-outline" size={60} color="#2E6074" />
      </View>
      <Text style={styles.title}>SuperCanteen Rewards</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.description}>
        We’re working on something exciting! Earn points, unlock rewards, and enjoy exclusive offers with SuperCanteen Rewards.
      </Text>
    </View>
  );
};

export default SuperCanteenRewards;
