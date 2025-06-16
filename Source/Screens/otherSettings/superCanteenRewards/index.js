import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const SuperCanteenRewards = () => {
  return (
    <View style={styles.container}>
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
