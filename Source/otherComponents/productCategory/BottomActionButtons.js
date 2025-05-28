// Components/BottomActionButtons.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomActionButtons = ({
  onCancel,
  onApply,
  applyDisabled = false,
  cancelText = 'Cancel',
  applyText = 'Apply',
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
      <TouchableOpacity
        onPress={onCancel}
        style={[styles.footerButton, styles.cancelButton]}
      >
        <Text style={styles.footerButtonText}>{cancelText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onApply}
        style={[
          styles.footerButton,
          styles.applyButton,
          applyDisabled && { opacity: 0.5 },
        ]}
        disabled={applyDisabled}
      >
        <Text style={[styles.footerButtonText, styles.applyButtonText]}>
          {applyText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionButtons;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingTop: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  applyButton: {
   backgroundColor: '#2E6074',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  applyButtonText: {
    color: '#fff',
  },
});
