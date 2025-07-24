import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import HorizontalLine from '../home/horizontalLine';

const InvoiceModal = ({ order, onClose, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadComplete(false);
    
    try {
      await onDownload();
      setDownloadComplete(true);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      Alert.alert('Download Failed', 'Could not download the invoice. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const invoiceDate = new Date(order?.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal transparent visible>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Invoice #{order?.orderId}</Text>
            <TouchableOpacity onPress={onClose} disabled={isDownloading}>
              <Icon name="close" size={24} color={isDownloading ? '#ccc' : '#000'} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
            
             {/* Add Super Canteen details here */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, {fontSize: 15}]}>Super Canteen Details</Text>
              <Text style={styles.subTitle}>V3GR+MVF, Pradhuman Vihar, Naurangabad</Text>
              <Text style={styles.subTitle}>Aligarh, Uttar Pradesh 202001</Text>
            </View>
            <HorizontalLine/>

            {/* Invoice Info */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Invoice Details</Text>
              <Text style={styles.subTitle}>Date: {invoiceDate}</Text>
              <Text style={styles.subTitle}>Amount: ₹{order?.itemsPrice?.toFixed(2)}</Text>
              <Text style={[styles.subTitle, { color: '#FF6347', fontWeight: 'bold' }]}>
                Status: {order?.status?.toUpperCase()}
              </Text>
            </View>
           <HorizontalLine/>
            {/* Billed To */}
            <View style={[styles.section,{paddingTop:13}]}>
              <Text style={styles.sectionTitle}>Billed To</Text>
              <Text style={styles.subTitle}>{order?.shippingAddress?.name}</Text>
              <Text style={styles.subTitle}>{order?.shippingAddress?.address}</Text>
              <Text style={styles.subTitle}>
                {order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.postalCode}
              </Text>
              <Text style={styles.subTitle}>{order?.shippingAddress?.country}</Text>
              <Text style={styles.subTitle}><Text style>Address Type: </Text>{order?.shippingAddress?.addressType}</Text>
              <Text style={styles.subTitle}>Email: {order?.user?.email}</Text>
              <Text style={styles.subTitle}>Phone: {order?.shippingAddress?.contactNo}</Text>
              <Text style={styles.subTitle}>Alternate Phone: N/A</Text>
            </View>

            {/* Order Items */}
             <HorizontalLine/>
            <View style={[styles.section,{paddingTop:12}]}>
              <Text style={styles.sectionTitle}>Order Items</Text>
              {order?.orderItems?.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={[styles.subTitle, { width: 260, lineHeight: 22 }]}>
                    {item.name} × {item.qty}
                  </Text>
                  <Text style={styles.subTitle}>₹{(item.price * item.qty).toFixed(2)}</Text>
                </View>
              ))}
            </View>

            {/* Payment Summary */}
                <HorizontalLine/>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.subTitle}>Subtotal:</Text>
                <Text style={styles.subTitle}>₹{order.itemsPrice?.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.subTitle}>Shipping:</Text>
                <Text style={styles.subTitle}>₹{order.shippingPrice?.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.subTitle}>Tax:</Text>
                <Text style={styles.subTitle}>₹{order.taxPrice?.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>₹{order.totalPrice?.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.subTitle}>Payment Method:</Text>
                <Text style={styles.subTitle}>{order.paymentMethod}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.subTitle}>Payment Status:</Text>
                <Text style={styles.subTitle}>{order.paymentStatus}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Download Button */}
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
