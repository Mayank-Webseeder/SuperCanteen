import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';

const CancelOrderModal = ({ 
  visible, 
  onClose, 
  onCancelOrder, 
  isLoading 
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [error, setError] = useState('');

  const cancellationReasons = [
    'Changed my mind',
    'Found better price elsewhere',
    'Delivery time too long',
    'Ordered by mistake',
    'Other reason'
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      setError('Please select a reason');
      return;
    }
    
    if (selectedReason === 'Other reason' && !otherReason.trim()) {
      setError('Please specify the reason');
      return;
    }

    const reason = selectedReason === 'Other reason' 
      ? otherReason 
      : selectedReason;


    onCancelOrder({ cancelReason: reason });
    setError('');
  };

  const handleClose = () => {
    setSelectedReason('');
    setOtherReason('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType={"fade"}
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Cancel Order</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Why are you cancelling this order?</Text>
          
          <View style={styles.reasonsContainer}>
            {cancellationReasons.map((reason) => (
              <TouchableOpacity
                key={reason}
                style={[
                  styles.reasonButton,
                  selectedReason === reason && styles.selectedReason
                ]}
                onPress={() => setSelectedReason(reason)}
              >
                <Text style={styles.reasonText}>{reason}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedReason === 'Other reason' && (
            <TextInput
              style={styles.otherReasonInput}
              placeholder="Please specify the reason"
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
              numberOfLines={3}
            />
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.submitButton,
                isLoading && styles.submitButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Cancelling...' : 'Cancel Order'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default CancelOrderModal;