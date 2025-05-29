// components/BottomActionButtons.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

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


