import React from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';

const STATUS_OPTIONS = [
  'All Orders',
  'Awaited',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  // 'Return',
  // 'Exchange'
];

const TIME_OPTIONS = [
  'All',
  'Last 30 Days',
  'Last 6 Months',
  'This Year',
  'Last Year',
];

const OrderFilterModal = ({
  visible,
  onClose,
  selectedStatuses = [],
  selectedTime = '',
  toggleStatus,
  setSelectedTime,
  onApply,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Orders</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Status Group */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Order Status</Text>
            <View style={styles.optionsContainer}>
              {STATUS_OPTIONS.map((option) => (
                <Pressable
                  key={`status-${option}`}
                  style={[
                    styles.optionButton,
                    selectedStatuses.includes(option) && styles.optionSelected,
                  ]}
                  onPress={() => toggleStatus(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedStatuses.includes(option) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Time Group */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Time Range</Text>
            <View style={styles.optionsContainer}>
              {TIME_OPTIONS.map((option) => (
                <Pressable
                  key={`time-${option}`}
                  style={[
                    styles.optionButton,
                    selectedTime === option && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedTime(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedTime === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={onApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderFilterModal;