import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { StyleSheet } from 'react-native';

const CustomFlashMessage = () => {
  return (
    <FlashMessage
      position="bottom"
      floating
      animationDuration={300}
      style={styles.container}
      titleStyle={styles.title}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#f1f1f1',
  },
});

export default CustomFlashMessage;
