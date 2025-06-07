// src/Components/common/FullScreenLoader.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@constants/index';

const FullScreenLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.green} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default FullScreenLoader;