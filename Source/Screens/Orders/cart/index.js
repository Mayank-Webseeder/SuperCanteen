import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomCartCard from '../../../Components/cartCard/customCartCard';
import CustomBtn from '../../../Components/CustomFilterBtn';
import AddressView from '../../../otherComponents/checkOut/addressView';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import Footer from './footer';
import EmptyState from '@components/emptyComponent/EmptyState';
import ContentSkeletonLoader from '@components/Common/contentSkeletonLoader';
import { styles } from './styles';

export default function CartScreen({ navigation }) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonAnimation] = useState(new Animated.Value(0));
  
  const { items, loading: cartLoading } = useSelector((state) => ({
    items: state.cart.items,
    loading: state.cart.loading
  }));

  // Skeleton animation
  useEffect(() => {
    const animateSkeleton = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(skeletonAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(skeletonAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (isLoading) {
      animateSkeleton();
    }

    return () => {
      skeletonAnimation.stopAnimation();
    };
  }, [isLoading]);

  // Data loading with focus effect
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadCartData = async () => {
        try {
          setIsLoading(true);
          // Simulate data loading - replace with actual data fetching
          await new Promise(resolve => setTimeout(resolve, 800));
          
          if (isActive) {
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Cart loading error:', error);
          if (isActive) {
            setIsLoading(false); // Still show UI
          }
        }
      };

      loadCartData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const toggleStatus = (option) => {
    setSelectedStatuses(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option) 
        : [...prev, option]
    );
  };

  const handleApply = () => {
    setModalVisible(false);
    // Apply filters here
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedStatuses([]);
    setSelectedTime('');
  };

  const renderSkeleton = () => (
    <View style={styles.loaderContainer}>
      <ContentSkeletonLoader shimmerAnimation={skeletonAnimation} />
      <ContentSkeletonLoader shimmerAnimation={skeletonAnimation} />
      <ContentSkeletonLoader shimmerAnimation={skeletonAnimation} />
    </View>
  );

  const renderEmptyCart = () => (
    <EmptyState
      title={'Your cart is empty'}
      imageSource={require('../../../../assets/Icons/emptyCart.jpg')}
      onPress={() => navigation.navigate('Main')}
    />
  );

  const renderCartContent = () => (
    <ScrollView 
      contentContainerStyle={styles.contentContainerStyle} 
      showsVerticalScrollIndicator={false}
    >
      {/* Address Section */}     
      <View style={styles.addressView}>
        <AddressView navigation={navigation} />
      </View>
      
      {/* Sort & Selection */}
      <View style={styles.sortRow}>
        <TouchableOpacity style={styles.sortButton}>
          <CustomBtn
            title="Sort"
            onPress={() => setModalVisible(true)}
            width={80}
            height={30}
            icon={
              <View style={{ transform: [{ rotate: '270deg' }] }}>
                <SortIcon name="sync-alt" size={20} color="#1C1B1F7D" />
              </View>
            }
          />
        </TouchableOpacity>
      </View>
    
      {/* Cart Items */}
      <CustomCartCard navigation={navigation} />

      {/* Price Details */}
      <View style={styles.main}>
        <PriceSummaryCard />
      </View> 
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <CustomCommonHeader title={'Your Cart'} navigation={navigation} />
      
      {isLoading ? (
        renderSkeleton()
      ) : items.length > 0 ? (
        renderCartContent()
      ) : (
        renderEmptyCart()
      )}

      <OrderFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedStatuses={selectedStatuses}
        selectedTime={selectedTime}
        toggleStatus={toggleStatus}
        setSelectedTime={setSelectedTime}
        onApply={handleApply}
        onCancel={handleCancel}
      />

      {/* Footer - Only show when not loading and cart has items */}
      {!isLoading && items.length > 0 && (
        <Footer cartItems={items} navigation={navigation} />
      )}
    </View>
  );
}
