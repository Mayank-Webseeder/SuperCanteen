import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './styles';
import { COLORS } from '@constants/index';

const DeleteConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  selectedCount,
  slideAnim,
}) => {
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Remove Items</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalMessage}>
            Are you sure you want to remove{' '}
            <Text style={{ fontWeight: '600', color: '#FF3B30' }}>{selectedCount}</Text>{' '}
            item{selectedCount > 1 ? 's' : ''} from your cart?
          </Text>

          <View style={styles.divider} />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>CANCEL</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity
              style={[styles.actionButton, styles.removeButton]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.removeText]}>REMOVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};



export default DeleteConfirmationModal;
