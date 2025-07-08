import React , {useState} from 'react';
import { 
  Text, 
  ScrollView, 
  View, 
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS } from '@constants/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IMGURL } from '../../../utils/dataFormatters';
import LinearGradient from 'react-native-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';
import { styles } from './styles';
import InvoiceModal from '../../../otherComponents/invoiceModal';
import { generateAndSaveInvoice  } from '../../../otherComponents/invoiceModal/generatePdf';
import RNFetchBlob from 'react-native-blob-util';



const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params;
  const scrollY = new Animated.Value(0);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  // console.log("ORDER IS ******************",order)
  
  // Header animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


const handleDownloadInvoice = async () => {
  try {
    const pdfPath = await generateAndSaveInvoice(order);
    console.log('PDF saved at:', pdfPath);
    if (Platform.OS === 'android') {
      RNFetchBlob.android.actionViewIntent(pdfPath, 'application/pdf');
    }
  } catch (error) {
    console.error('Error downloading invoice:', error);
  }
};


  // Modern date formatting (like Amazon)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Enhanced status details with Myntra-style visuals
  const getStatusDetails = () => {
    const base = {
      'awaited': { color: '#FFA500', icon: 'hourglass-empty', progress: 25 },
      'processing': { color: '#FFA500', icon: 'settings', progress: 50 },
      'shipped': { color: '#1E90FF', icon: 'local-shipping', progress: 75 },
      'delivered': { color: '#32CD32', icon: 'check-circle', progress: 100 },
      'cancelled': { color: '#FF4500', icon: 'cancel', progress: 0 }
    };

    const status = order.status.toLowerCase();
    const details = base[status] || { color: COLORS.primary, icon: 'info', progress: 0 };

    return {
      ...details,
      message: status === 'delivered' ? `Delivered on ${formatDate(order.updatedAt)}` :
               status === 'shipped' ? `Shipped on ${formatDate(order.updatedAt)}` :
               status === 'cancelled' ? `Cancelled on ${formatDate(order.updatedAt)}` :
               'Your order is being processed'
    };
  };

  const statusDetails = getStatusDetails();

  const getVariantImage = (item) => {
  const baseUrl = IMGURL;

  if (item.variantId && item.product?.variants?.length > 0) {
    const matchedVariant = item.product.variants.find(
      variant => variant._id === item.variantId
    );

    if (matchedVariant?.images?.length > 0) {
      return `${baseUrl}${matchedVariant.images[0]}`;
    }
  }

  // fallback to main product image or item image
  const image = item.product?.images?.[0] || item.image;
  return image.startsWith('http') ? image : `${baseUrl}${image}`;
};


  // Amazon-style product card with swipeable actions
  const renderOrderItem = ({ item }) => (
    // console.log("ITEM IS",item)
    <Swipeable
      friction={2}
      leftThreshold={30}
      renderRightActions={() => (
        <TouchableOpacity 
          style={styles.swipeAction}
          onPress={() => navigation.navigate('ProductDetails', { productId: item.product._id })}
        >
          <Icon name="info" size={20} color="#fff" />
          <Text style={styles.swipeActionText}>Details</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.productCard}>
       <FastImage
  source={{
    uri: getVariantImage(item)
  }}
  style={styles.productImage}
/>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          
          {item.variantDetails && (
            <View style={styles.variantChips}>
              {Object.entries(item.variantDetails).map(([key, value]) => (
                <View key={key} style={styles.chip}>
                  <Text style={styles.chipText}>
                    {key}: {typeof value === 'object' ? value.name || value.value : value}
                  </Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.quantity}>Qty: {item.qty}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.buyAgainBtn}
            onPress={() => navigation.navigate('ProductDetails', { productId: item.product._id })}
          >
            <Text style={styles.buyAgainText}>BUY AGAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  // Myntra-style delivery timeline
  const DeliveryTimeline = () => {
    const steps = [
      { id: 1, title: 'Ordered', date: order.createdAt, active: true },
      { id: 2, title: 'Processed', date: ['processing','shipped','delivered'].includes(order.status.toLowerCase()) ? order.updatedAt : null, 
        active: ['processing','shipped','delivered'].includes(order.status.toLowerCase()) },
      { id: 3, title: 'Shipped', date: ['shipped','delivered'].includes(order.status.toLowerCase()) ? order.updatedAt : null, 
        active: ['shipped','delivered'].includes(order.status.toLowerCase()) },
      { id: 4, title: 'Delivered', date: order.status.toLowerCase() === 'delivered' ? order.updatedAt : null, 
        active: order.status.toLowerCase() === 'delivered' }
    ];

    return (
      <View style={styles.timelineContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.timelineStep}>
            <View style={[styles.timelineDot, step.active && styles.activeDot]}>
              {step.active && <View style={styles.innerDot} />}
            </View>
            
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineTitle, step.active && styles.activeTitle]}>
                {step.title}
              </Text>
              {step.date && (
                <Text style={styles.timelineDate}>
                  {formatDate(step.date)}
                </Text>
              )}
            </View>
            
            {index < steps.length - 1 && (
              <View style={[styles.timelineLine, step.active && styles.activeLine]} />
            )}
          </View>
        ))}
      </View>
    );
  };

  // Amazon-style action buttons
  const ActionButtons = () => {
    const actions = [];
  
    if (['shipped'].includes(order.status.toLowerCase())) {
      actions.push(
        <TouchableOpacity 
          key="track"
          style={[styles.actionBtn, styles.primaryBtn]}
          onPress={() => navigation.navigate('TrackOrder', { orderId: order._id })}
        >
          <Icon name="local-shipping" size={16} color="#fff" />
          <Text style={styles.primaryBtnText}>Track Package</Text>
        </TouchableOpacity>
      );
    }

    if (order.status.toLowerCase() === 'delivered') {
      actions.push(
        <TouchableOpacity 
          key="rate"
          style={[styles.actionBtn, styles.secondaryBtn]}
          onPress={() => navigation.navigate('RateOrder', { orderId: order._id })}
        >
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.secondaryBtnText}>Rate Product</Text>
        </TouchableOpacity>
      );

      if (order.isReturnable) {
        actions.push(
          <TouchableOpacity 
            key="return"
            style={[styles.actionBtn, styles.secondaryBtn]}
            onPress={() => navigation.navigate('StartReturn', { orderId: order._id })}
          >
            <Icon name="assignment-return" size={16} color="#FF4500" />
            <Text style={styles.secondaryBtnText}>Return</Text>
          </TouchableOpacity>
        );
      }
    }

   if (actions.length === 0) return null; 

    return (
      <View style={styles.actionContainer}>
        {actions}
      </View>
    );
  };

  const hasActionButtons = (() => {
    const status = order.status?.toLowerCase();
    if (['shipped'].includes(status)) return true;
    if (status === 'delivered') return true;
    return false;
  })();

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['rgba(50,50,50,0.8)', 'rgba(20,20,20,0.8)']}
          style={styles.headerBackground}
        >  
        {/* Animated Header */}
<Animated.View style={[styles.header, { height: headerHeight }]}>
  <LinearGradient
    colors={['rgba(50,50,50,0.8)', 'rgba(20,20,20,0.8)']}
    style={styles.headerBackground}
  >  
    <Animated.View style={{ opacity: headerOpacity }}>
      <View style={[styles.rowContainer, { paddingRight: 15 }]}>
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        {/* Order Info - Truncated for Space */}
        <View style={{ flex: 1, marginLeft: 12, minWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text 
              style={styles.headerOrderId}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              #{order.orderId.slice(0, 10)}{order.orderId.length > 10 ? '...' : ''}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Icon 
              name={statusDetails.icon} 
              size={14} 
              color={statusDetails.color} 
              style={{ marginRight: 4 }} 
            />
            <Text style={styles.headerStatus}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
    
    {/* Sticky Invoice Button (Top-Right) */}
    <TouchableOpacity
      onPress={() => setShowInvoiceModal(true)}
      style={[
        styles.stickyInvoiceButton,
        {
          opacity: headerOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8] // Slightly fade on scroll
          })
        }
      ]}
    >
      <Icon name="receipt" size={18} color="#FFF" />
      <Text style={styles.invoiceButtonText}>INVOICE</Text>
    </TouchableOpacity>
  </LinearGradient>
</Animated.View>
        </LinearGradient>
      </Animated.View>


      <ScrollView
        contentContainerStyle={[styles.content,{paddingBottom: hasActionButtons ? 80 : 20}]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Icon name={statusDetails.icon} size={28} color={statusDetails.color} />
            <View>
              <Text style={styles.statusTitle}>{statusDetails.message}</Text>
              <Text style={styles.statusSubtitle}>
                {order.orderItems.length} items • {formatDate(order.createdAt)}
              </Text>
            </View>
          </View>
          
          <DeliveryTimeline />
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          {order.orderItems.map((item, index) => (
            <View key={index}>
              {renderOrderItem({ item })}
              {index < order.orderItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{order.shippingAddress.name}</Text>
            <Text style={styles.addressText}>{order.shippingAddress.address}</Text>
            <Text style={styles.addressText}>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
            </Text>
            <Text style={styles.addressContact}>Phone: {order.shippingAddress.contactNo}</Text>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            {[
              { label: `Subtotal (${order.orderItems.length} items)`, value: order.itemsPrice },
              { label: 'Delivery', value: order.shippingPrice },
              ...(order.discount > 0 ? [{ label: 'Discount', value: -order.discount, isDiscount: true }] : []),
              { label: 'Taxes', value: order.taxPrice }
            ].map((item, index) => (
              <View key={index} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{item.label}</Text>
                <Text style={[styles.summaryValue, item.isDiscount && styles.discountValue]}>
                  ₹{Math.abs(item.value).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{order.totalPrice.toLocaleString('en-IN')}</Text>
            </View>
            
            <View style={styles.paymentMethod}>
              <Icon 
                name={order.paymentMethod === 'cod' ? 'money' : 'credit-card'} 
                size={18} 
                color="#666" 
              />
              <Text style={styles.paymentText}>
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                {order.isPaid ? ' (Paid)' : ' (Pending)'}
              </Text>
            </View>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Need help with this order?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ContactSupport')} style={styles.helpButton}>
            <Icon name="headset-mic" size={20} color={COLORS.green} />
            <Text style={styles.helpButtonText}>Contact Customer Care</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
    {showInvoiceModal && (
 <InvoiceModal
  order={order}
  onClose={() => setShowInvoiceModal(false)}
  onDownload={handleDownloadInvoice}
/>
)}

      {/* Fixed Action Buttons */}
      <ActionButtons />
  
    </View>
  );
};


export default OrderDetailScreen;