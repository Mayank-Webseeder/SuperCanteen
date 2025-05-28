import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FontSize, Height } from '../../constants/constants';

const OrderFilterModal = ({
  visible,
  onClose,
  selectedStatuses,
  selectedTime,
  toggleStatus,
  setSelectedTime,
  onApply,
  onCancel,
}) => {
  const statusOptions = [
    'All Orders',
    'Arriving',
    'Delivered',
    'Cancelled',
    'Return',
    'Exchange',
  ];

  const timeOptions = [
    'All',
    'Last 30 Days',
    'Last 6 Months',
    'This Year',
    'Last Year',
  ];

  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      transparent
      onRequestClose={onClose}>
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
              {statusOptions.map((option, index) => (
                <Pressable
                  key={`status-${index}`}
                  style={[
                    styles.optionButton,
                    selectedStatuses.includes(option) && styles.optionSelected,
                  ]}
                  onPress={() => toggleStatus(option)}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedStatuses.includes(option) && styles.optionTextSelected,
                    ]}>
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
              {timeOptions.map((option, index) => (
                <Pressable
                  key={`time-${index}`}
                  style={[
                    styles.optionButton,
                    selectedTime === option && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedTime(option)}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedTime === option && styles.optionTextSelected,
                    ]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={onApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: FontSize(20),
    fontFamily:'Inter-SemiBold',
    color: '#1A1A1A',
  },
  closeText: {
    fontSize: Height(18),
    color: COLORS.black,
  },
  filterSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily:'Inter-SemiBold',
    color: '#444',
    marginBottom: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionSelected: {
    backgroundColor: '#D6EAF8',
    borderColor: '#2874A6',
  },
  optionText: {
    color: '#555',
    fontSize: 14,
    fontFamily:'Inter-Regular'
  },
  optionTextSelected: {
    color: '#2874A6',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#ECECEC',
  },
  applyButton: {
    backgroundColor: '#2E6074E8',
  },
  cancelButtonText: {
    color: '#777',
    fontFamily:'Inter-SemiBold'
  },
  applyButtonText: {
    color: '#fff',
     fontFamily:'Inter-SemiBold'
  },
});


export default OrderFilterModal;