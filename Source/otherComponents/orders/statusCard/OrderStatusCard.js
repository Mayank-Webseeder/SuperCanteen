import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS } from '@constants/index';

const OrderStatusCard = ({ status, deliveryDate, actions, onActionPress }) => {
  const getStatusColor = () => {
    if (status.includes('Delivered')) return COLORS.success;
    if (status.includes('Cancelled')) return COLORS.error;
    return COLORS.primary;
  };

  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        <View style={styles.statusIndicator} />
        <View style={styles.statusTextContainer}>
          <Text style={styles.statusTitle}>Current Status</Text>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status}
          </Text>
          {deliveryDate && (
            <Text style={styles.deliveryDate}>
              Expected Delivery: {new Date(deliveryDate).toDateString()}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action}
            style={[
              styles.actionButton,
              action === 'cancel' && { borderColor: COLORS.error },
            ]}
            onPress={() => onActionPress(action)}
          >
            <Text
              style={[
                styles.actionText,
                action === 'cancel' && { color: COLORS.error },
                action === 'track' && { color: COLORS.primary },
              ]}
            >
              {action.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statusIndicator: {
    width: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 13,
    color: COLORS.gray,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default OrderStatusCard;