import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

const InvoiceModal = ({ order, onClose, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadComplete(false);
    
    try {
      await onDownload();
      setDownloadComplete(true);
      
      // Show success feedback for 1.5 seconds before closing
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      Alert.alert(
        'Download Failed',
        'Could not download the invoice. Please try again.',
        [{ text: 'OK', onPress: () => {} }]
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Modal transparent visible={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Invoice #{order.orderId}</Text>
            <TouchableOpacity onPress={onClose} disabled={isDownloading}>
              <Icon name="close" size={24} color={isDownloading ? '#ccc' : '#000'} />
            </TouchableOpacity>
          </View>

          {/* Invoice Content */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle} style={styles.invoiceContent}>
            {/* Order Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              {order.orderItems.map((item) => (
                <View key={item._id} style={styles.itemRow}>
                  <Text style={[styles.subTitle,{width:260,lineHeight:24}]}>{item.name} × {item.qty}</Text>
                  <Text style={styles.subTitle}>₹{item.price * item.qty}</Text>
                </View>
              ))}
            </View>

            {/* Payment Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={[styles.subTitle,{marginBottom:2}]}>Subtotal</Text>
                <Text style={[styles.subTitle,{marginBottom:2}]}>₹{order.itemsPrice}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.subTitle,{marginBottom:2}]}>Shipping:</Text>
                <Text style={[styles.subTitle,{marginBottom:2}]}>₹{order.shippingPrice}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.subTitle,{marginBottom:2}]}>Tax:</Text>
                <Text style={[styles.subTitle,{marginBottom:2}]}>₹{order.taxPrice}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>₹{order.totalPrice}</Text>
              </View>
            </View>

            {/* Delivery Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Information</Text>
              <Text style={[styles.subTitle,{marginBottom:2}]}>{order.shippingAddress.name}</Text>
              <Text style={[styles.subTitle,{marginBottom:2}]}>{order.shippingAddress.address}</Text>
              <Text style={[styles.subTitle,{marginBottom:2}]}>{order.shippingAddress.city}, {order.shippingAddress.state}</Text>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.modalFooter}>
            {downloadComplete ? (
              <View style={styles.downloadButton}>
                <Icon name="check" size={20} color="#fff" />
                <Text style={styles.downloadButtonText}>Download Complete!</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.downloadButton, isDownloading && { opacity: 0.7 }]}
                onPress={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Icon name="picture-as-pdf" size={20} color="#fff" />
                )}
                <Text style={styles.downloadButtonText}>
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModal;