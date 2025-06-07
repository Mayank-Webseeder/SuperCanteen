// src/Components/common/ErrorView.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@constants/index';

const ErrorView = ({ message, onRetry, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
     {/* <Text style={styles.errorText}>{message || 'Something went wrong'}</Text> 
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text style={styles.retryText}>Try Again</Text>
    </TouchableOpacity> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ErrorView;