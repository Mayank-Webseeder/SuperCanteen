import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { applyCoupon, removeCoupon } from '../../../redux/slices/couponSlice';

const CouponSection = ({ data = [],  productId , onCouponApplied , localAppliedCoupon ,priceDetails}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const dispatch = useDispatch();
  const { appliedCoupons } = useSelector((state) => state.coupon);
  
  // Handle both single product and cart-wide coupons
  const appliedCoupon = productId 
    ? appliedCoupons[productId] 
    : appliedCoupons.cartWide;

  // Sync local applied coupon with redux state
  useEffect(() => {
    onCouponApplied(appliedCoupon);
  }, [appliedCoupon]);

  const calculateDiscount = (coupon) => {
    if (!coupon) return { discountAmount: 0, totalAfter: priceDetails?.variantPrice };
    const discountAmount = (priceDetails?.variantPrice * coupon.percentage) / 100;
    const totalAfter = priceDetails?.variantPrice - discountAmount;
    return { discountAmount, totalAfter };
  };

  const formatDate = (dateStr) => moment(dateStr).format('DD MMM YYYY');

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      dispatch(applyCoupon({
        productId, // null for cart-wide
        coupon: selectedCoupon
      }));
      onCouponApplied(selectedCoupon);
      setModalVisible(false);
    }
  };

  const handleRemove = () => {
    dispatch(removeCoupon({ productId }));
    onCouponApplied(null);
  };

  // Filter out already applied coupons
  const availableCoupons = data.filter(coupon => 
    !localAppliedCoupon || localAppliedCoupon._id !== coupon._id
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Coupons</Text>

      {/* Applied Coupon Banner */}
      {localAppliedCoupon && (
        <View style={styles.appliedContainer}>
          <View style={styles.appliedHeader}>
            <View style={styles.appliedBadge}>
              <AntDesign name="checkcircle" size={16} color="#4CAF50" />
              <Text style={styles.appliedText}>APPLIED</Text>
            </View>
            <TouchableOpacity onPress={handleRemove}>
              <MaterialIcons name="cancel" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.couponName}>{localAppliedCoupon.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>₹{priceDetails?.variantPrice.toFixed(2)}</Text>
            <Text style={styles.discountedPrice}>
              ₹{calculateDiscount(localAppliedCoupon).totalAfter.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsText}>
              YOU SAVE ₹{calculateDiscount(localAppliedCoupon).discountAmount.toFixed(2)}!
            </Text>
          </View>
        </View>
      )}

      {/* Available Coupons */}
      {availableCoupons.map((coupon) => (
        <TouchableOpacity 
          key={coupon._id} 
          style={styles.couponCard}
          onPress={() => {
            setSelectedCoupon(coupon);
            setModalVisible(true);
          }}
        >
          <View style={styles.couponHeader}>
            <Text style={styles.couponName}>{coupon.name}</Text>
            <Text style={styles.couponPercentage}>{coupon.percentage}% OFF</Text>
          </View>
          <View style={styles.couponFooter}>
          {coupon?.expire &&   <Text style={styles.couponExpiry}>Expires: {formatDate(coupon.expire)}</Text>}
            <Text style={styles.viewDetailsText}>View Details →</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Coupon Details Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedCoupon?.name}</Text>
            
            <View style={styles.modalContent}>
              <View style={styles.discountRow}>
                <MaterialIcons name="discount" size={22} color="#FF5722" />
                <View>
                  <Text style={styles.discountPercentage}>
                    {selectedCoupon?.percentage}% OFF
                  </Text>
                  <Text style={styles.discountDescription}>
                    <Text style={styles.saveText}>Save </Text> 
                    ₹{selectedCoupon ? calculateDiscount(selectedCoupon).discountAmount.toFixed(2) : '0.00'}
                  </Text>
                </View>
              </View>
              {selectedCoupon?.expire &&   <View style={styles.expiryRow}>
                <MaterialIcons name="event" size={22} color="#4CAF50" />
                <Text style={styles.expiryText}>
                  Expires on {selectedCoupon ? formatDate(selectedCoupon.expire) : ''}
                </Text>
              </View> }
             
              
              <Text style={styles.termsText}>* Terms and conditions apply</Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleApplyCoupon}
              >
                <Text style={styles.primaryButtonText}>Apply Coupon</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CouponSection;