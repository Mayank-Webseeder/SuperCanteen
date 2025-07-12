import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl
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

const STATUS_CONFIG = {
  'All Items': [],
  'Makeup': ['makeup', 'cosmetics', 'beauty'],
  'Clothing': ['shirt', 'jeans', 't-shirt', 'clothing', 'wear'],
  'Accessories': ['accessories', 'jewelry']
};

const TIME_OPTIONS = [
  'All',
  'Last 7 Days',
  'This Month',
  'Older'
];

export default function CartScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState(['All Items']);
  const [selectedTime, setSelectedTime] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [skeletonAnimation] = useState(new Animated.Value(0));
  
  const { items, loading: cartLoading } = useSelector((state) => ({
    items: state.cart.items,
    loading: state.cart.loading
  }));

  const checkTimeFilter = useCallback((itemDate, timeRange) => {
    if (timeRange === 'All') return true;
    
    const date = new Date(itemDate);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch(timeRange) {
      case 'Last 7 Days': return diffDays <= 7;
      case 'This Month': return diffDays <= 30;
      case 'Older': return diffDays > 30;
      default: return true;
    }
  }, []);

  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    return items.filter(item => {
      // Status filter
      const statusMatch = selectedStatuses.includes('All Items') || 
        selectedStatuses.some(status => {
          const statusValues = STATUS_CONFIG[status] || [status.toLowerCase()];
          const itemTags = item.product?.tags?.map(tag => tag.toLowerCase()) || [];
          const itemName = item.product?.name?.toLowerCase() || '';
          
          return statusValues.some(val => 
            itemTags.includes(val) || itemName.includes(val))
        });
      
      // Time filter
      const timeMatch = checkTimeFilter(item.createdAt, selectedTime);
      
      return statusMatch && timeMatch;
    });
  }, [items, selectedStatuses, selectedTime, checkTimeFilter]);

  const toggleStatus = (status) => {
    setSelectedStatuses(prev => {
      if (status === 'All Items') return ['All Items'];
      
      const newStatuses = prev.filter(s => s !== 'All Items');
      return prev.includes(status) 
        ? newStatuses.filter(s => s !== status)
        : [...newStatuses, status];
    });
  };

  const handleApply = async () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedStatuses(['All Items']);
    setSelectedTime('All');
    setModalVisible(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - replace with actual data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
            setIsLoading(false);
          }
        }
      };

      loadCartData();

      return () => {
        isActive = false;
      };
    }, [])
  );

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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2E6074']}
          tintColor={'#2E6074'}
        />
      }
    >
      {/* Address Section */}     
      <View style={styles.addressView}>
        <AddressView navigation={navigation} />
      </View>
      
      {/* Sort & Selection */}
      <View style={styles.sortRow}>
        <TouchableOpacity style={styles.sortButton}>
          <CustomBtn
            title="Filter"
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
      <CustomCartCard navigation={navigation} items={filteredItems} />

      {/* Price Details */}
      <View style={styles.main}>
        <PriceSummaryCard items={filteredItems} />
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
        statusOptions={Object.keys(STATUS_CONFIG)}
        timeOptions={TIME_OPTIONS}
        onApply={handleApply}
        onCancel={handleCancel}
      />

      {/* Footer - Only show when not loading and cart has items */}
      {!isLoading && filteredItems.length > 0 && (
        <Footer cartItems={filteredItems} navigation={navigation} />
      )}
    </View>
  );
}