// components/AddressSkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const AddressSkeletonLoader = () => {
  return (
    <>
      {[1, 2, 3].map((_, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.badge} />
          <View style={styles.line} />
          <View style={styles.lineShort} />
          <View style={styles.line} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  badge: {
    width: 80,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  line: {
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
  lineShort: {
    width: '60%',
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default AddressSkeletonLoader;
