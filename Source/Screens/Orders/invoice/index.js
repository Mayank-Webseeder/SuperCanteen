import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const InvoiceScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [pdfPath, setPdfPath] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  // Sample order data - in a real app this would come from your API
  const order = {
    id: 'ORD-20230625-12345',
    date: 'June 20, 2023',
    status: 'Delivered on June 25, 2023',
    paymentMethod: 'Credit Card (VISA **** 4242)',
    items: [
      {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        image: 'https://via.placeholder.com/150',
        color: 'Navy Blue',
        size: 'M',
        quantity: 1,
        price: 29.99,
      },
      {
        id: 2,
        name: 'Casual Sneakers',
        image: 'https://via.placeholder.com/150',
        color: 'White',
        size: '9',
        quantity: 1,
        price: 59.99,
      },
    ],
    subtotal: 89.98,
    shipping: 4.99,
    tax: 8.50,
    total: 103.47,
  };

  const generatePdf = async () => {
    setLoading(true);
    try {
      // In a real app, you would call your backend API to generate the PDF
      // For this example, we'll simulate the API call with a timeout
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate getting a PDF URL from the server
      const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      
      // Download the PDF file
      const downloadDir = RNBlobUtil.fs.dirs.DownloadDir;
      const fileName = `Invoice_${order.id}.pdf`;
      const path = `${downloadDir}/${fileName}`;
      
      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Invoice Download',
        },
      };
      
      const response = await RNBlobUtil.config(options).fetch('GET', pdfUrl);
      
      setPdfPath(response.path());
      setLoading(false);
      
      Alert.alert(
        'Success',
        'Invoice downloaded successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'View', onPress: () => setShowPdf(true) },
        ],
        { cancelable: false }
      );
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to download invoice. Please try again.');
      console.error('Error downloading invoice:', error);
    }
  };

  const renderItem = (item) => (
    <View key={item.id} style={styles.itemContainer}>
      <View style={styles.itemImageContainer}>
        {/* In a real app, you would use an Image component */}
        <View style={styles.itemImagePlaceholder} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAttribute}>Color: {item.color}</Text>
        <Text style={styles.itemAttribute}>Size: {item.size}</Text>
        <Text style={styles.itemAttribute}>Qty: {item.quantity}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  if (showPdf && pdfPath) {
    return (
      <View style={styles.pdfContainer}>
        <TouchableOpacity 
          style={styles.closePdfButton}
          onPress={() => setShowPdf(false)}
        >
          <Icon name="times" size={24} color="#fff" />
        </TouchableOpacity>
        <Pdf
          source={{ uri: pdfPath }}
          style={styles.pdf}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Invoice</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Number</Text>
          <Text style={styles.detailValue}>{order.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Date</Text>
          <Text style={styles.detailValue}>{order.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <Text style={styles.detailValue}>{order.paymentMethod}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {order.items.map(renderItem)}
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${order.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>${order.shipping.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax</Text>
          <Text style={styles.summaryValue}>${order.tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
          <Text style={[styles.summaryValue, styles.totalValue]}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={generatePdf}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Icon name="file-pdf-o" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.downloadButtonText}>Download Invoice (PDF)</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        Thank you for shopping with us! Your invoice has been emailed to your registered email address.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  statusText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#666',
    fontSize: 16,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImageContainer: {
    marginRight: 15,
  },
  itemImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  itemAttribute: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  itemPrice: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
  summaryContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  downloadButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
    padding: 15,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  footerNote: {
    textAlign: 'center',
    padding: 15,
    fontSize: 13,
    color: '#999',
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  pdf: {
    flex: 1,
  },
  closePdfButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
  },
});

export default InvoiceScreen;