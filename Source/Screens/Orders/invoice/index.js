import React from 'react';
import { Text, ScrollView, View, Linking, TouchableOpacity, Share, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

const InvoiceScreen = ({ navigation }) => {
  // Static dummy data
  const order = {
    id: 'ORD12345678',
    status: 'delivered',
    date: '15 June 2023',
    subtotal: 2499,
    deliveryFee: 0,
    discount: 300,
    total: 2199,
    isExchangeReturnOpen: false,
    isRated: false,
    items: [
      {
        id: '1',
        name: 'Men\'s Slim Fit Shirt',
        price: 999,
        quantity: 1,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: '2',
        name: 'Casual Chino Pants',
        price: 1500,
        quantity: 1,
        image: 'https://via.placeholder.com/150'
      }
    ],
    deliveryAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    }
  };

  const THEME_COLOR = '#2E6074';
  const SECONDARY_COLOR = '#E8F4F8';

  const similarProducts = [
    {
      id: '1',
      name: 'Formal Shirt',
      price: 899,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Denim Jeans',
      price: 1299,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      name: 'Casual T-Shirt',
      price: 499,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '4',
      name: 'Sports Shoes',
      price: 1999,
      image: 'https://via.placeholder.com/150'
    }
  ];

  const handleDownloadInvoice = () => {
    // Mock download functionality
    alert('Invoice download functionality would go here');
  };

  const renderOrderItems = () => (
    <View style={styles.itemsContainer}>
      <Text style={styles.itemsTitle}>Order Items (2)</Text>
      {order.items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          <FastImage 
            source={{ uri: item.image }} 
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price} x {item.quantity}</Text>
          </View>
          <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
        </View>
      ))}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={[styles.card, {marginTop: 15}]}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Items ({order.items.length})</Text>
        <Text style={styles.summaryValue}>₹{order.subtotal}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Delivery</Text>
        <Text style={styles.summaryValue}>FREE</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Discount</Text>
        <Text style={[styles.summaryValue, {color: '#4CAF50'}]}>-₹{order.discount}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={[styles.summaryRow, {marginTop: 8}]}>
        <Text style={[styles.summaryLabel, {fontWeight: '600', color: THEME_COLOR}]}>Total Amount</Text>
        <Text style={[styles.summaryValue, {fontWeight: '700', color: THEME_COLOR}]}>₹{order.total}</Text>
      </View>
    </View>
  );

  const renderPaymentMethod = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.paymentMethod}>
        <Icon name="credit-card" size={20} color={THEME_COLOR} />
        <Text style={styles.paymentText}>Cash on Delivery</Text>
      </View>
    </View>
  );

  const renderSimilarProducts = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Similar Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {similarProducts.map(product => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <FastImage 
              source={{ uri: product.image }} 
              style={styles.productImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
            <Text style={styles.productPrice}>₹{product.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity 
        style={[styles.actionButton, {backgroundColor: THEME_COLOR}]}
        onPress={handleDownloadInvoice}
      >
        <Icon name="download" size={20} color="white" />
        <Text style={styles.actionButtonText}>Download Invoice</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, {backgroundColor: 'white', borderWidth: 1, borderColor: THEME_COLOR}]}
        onPress={() => navigation.navigate('HelpCenter')}
      >
        <Icon name="help" size={20} color={THEME_COLOR} />
        <Text style={[styles.actionButtonText, {color: THEME_COLOR}]}>Need Help?</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={THEME_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{width: 24}} />
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>ORDER #{order.id}</Text>
          <Text style={styles.orderDate}>Placed on {order.date}</Text>
        </View>
        
        {/* Order Status */}
        <View style={styles.card}>
          <Text style={styles.statusText}>Delivered on 18 June 2023</Text>
          <View style={styles.statusBar}>
            <View style={[styles.statusProgress, {width: '100%'}]} />
          </View>
        </View>
        
        {/* Order Items */}
        <View style={styles.card}>
          {renderOrderItems()}
        </View>
        
        {/* Order Summary */}
        {renderOrderSummary()}
        
        {/* Delivery Address */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressName}>{order.deliveryAddress.name}</Text>
            <Text style={styles.addressText}>{order.deliveryAddress.street}</Text>
            <Text style={styles.addressText}>
              {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.zip}
            </Text>
            <Text style={styles.addressText}>Phone: {order.deliveryAddress.phone}</Text>
          </View>
        </View>
        
        {/* Payment Method */}
        {renderPaymentMethod()}
        
        {/* Similar Products */}
        {renderSimilarProducts()}
        
        {/* Seller Info */}
        <View style={[styles.card, {marginBottom: 20}]}>
          <Text style={styles.sellerText}>
            Sold by: <Text style={styles.sellerLink}>EliteEdge Pvt Limited</Text>
          </Text>
        </View>
        
        {/* Action Buttons */}
        {order.status !== 'cancelled' && renderActionButtons()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E6074',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  orderHeader: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 8,
  },
  statusBar: {
    height: 4,
    backgroundColor: '#EEE',
    borderRadius: 2,
    overflow: 'hidden',
  },
  statusProgress: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  itemsContainer: {
    marginTop: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E6074',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E8F4F8',
    borderRadius: 6,
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  addressContainer: {
    marginTop: 8,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  productCard: {
    width: 120,
    marginRight: 12,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E6074',
  },
  sellerText: {
    fontSize: 14,
    color: '#555',
  },
  sellerLink: {
    color: '#2E6074',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  actionButtonText: {
    marginLeft: 8,
    fontWeight: '500',
    color: 'white',
  },
});

export default InvoiceScreen;