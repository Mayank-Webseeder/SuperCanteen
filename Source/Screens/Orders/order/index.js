import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text, Pressable} from 'react-native';
import CustomBtn from '../../../Components/CustomFilterBtn';
import {useNavigation} from '@react-navigation/native';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import OrderListItem from '../../../otherComponents/orders/OrderListItem';
import { styles } from './styles';
import CustomSearch from '../../../Components/searchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders, updateOrderFromSocket } from '../../../redux/slices/orderSlice';
import CancelOrderModal from '../../../otherComponents/orders/cancelOrder';
import { cancelOrderById } from '../../../redux/slices/orderSlice';
import { showMessage } from 'react-native-flash-message';
import EmptyState from '@components/emptyComponent/EmptyState';
import { initializeSocket } from "../../../services/SocketService";
import FastImage from 'react-native-fast-image';

const STATUS_CONFIG = {
  'All Orders': [],
  'Awaited': ['awaited'],
  'Processing': ['processing'],
  'Shipped': ['shipped'],
  'Delivered': ['delivered', 'completed'],
  'Cancelled': ['cancelled', 'refunded'],
  // 'Return': ['return_initiated'],
  // 'Exchange': ['exchange_initiated']
};

const TIME_RANGES = {
  'All': null,
  'Last 30 Days': 30,
  'Last 6 Months': 180,
  'This Year': 365,
  'Last Year': 730
};

const Orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orders: reduxOrders, loading, pagination, cancelLoading } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);
  const { items, initialized } = useSelector((state) => state.cart);
  const itemCount = items?.length;

  useEffect(() => {
    if (reduxOrders.length > 0) {
      setLocalOrders(reduxOrders);
    }
  }, [reduxOrders]);

  useEffect(() => {
    loadOrders(1);
  }, []);

  const getApiStatusParams = () => {
    if (selectedStatuses.length === 0 || selectedStatuses.includes('All Orders')) {
      return [];
    }
    return selectedStatuses.flatMap(status => 
      STATUS_CONFIG[status] || [status.toLowerCase()]
    );
  };

  const getTimeRangeParams = () => {
    return TIME_RANGES[selectedTime] || null;
  };

  const loadOrders = useCallback(async (page = 1, refresh = false) => {
    try {
      const apiStatusParams = getApiStatusParams();
      const days = getTimeRangeParams();
      
      await dispatch(fetchUserOrders({ 
        userId: user?.id, 
        page,
        status: apiStatusParams,
        days, // Pass days parameter to API
        search: searchQuery
      }));
    } finally {
      if (refresh) setRefreshing(false);
      setIsLoadingMore(false);
      setIsSearching(false);
    }
  }, [user?.id, selectedStatuses, selectedTime, searchQuery]);

  const loadMoreOrders = () => {
    if (!isLoadingMore && pagination?.currentPage < pagination?.totalPages) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      loadOrders(nextPage).then(() => setCurrentPage(nextPage));
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(1);
    loadOrders(1, true);
  }, [loadOrders]);

  const toggleStatus = (status) => {
    setSelectedStatuses(prev => {
      if (status === 'All Orders') return ['All Orders'];
      
      const newStatuses = prev.filter(s => s !== 'All Orders');
      return prev.includes(status) 
        ? newStatuses.filter(s => s !== status)
        : [...newStatuses, status];
    });
  };

  const handleApply = async () => {
    setIsSearching(false);
    setModalVisible(false);
    setIsLoadingMore(false);
    setCurrentPage(1);
    await loadOrders(1);
  };

  const handleCancel = () => {
    setSelectedStatuses([]);
    setSelectedTime('All');
    setModalVisible(false);
    setCurrentPage(1);
    loadOrders(1);
  };

  const handleSearchSubmit = async () => {
    setIsSearching(true);
    setCurrentPage(1);
    await loadOrders(1);
    setIsSearching(false);
    setIsLoadingMore(false);
  };

  const handleCancelOrder = async ({ cancelReason }) => {
    setCancelModalVisible(false);
    try {
      if (!selectedOrderForCancel) throw new Error('Order ID missing');
      await dispatch(cancelOrderById({ 
        orderId: selectedOrderForCancel, 
        cancelReason 
      })).unwrap();
      setTimeout(() => {
        showMessage({
          message: 'Order cancelled successfully!',
          type: 'success',
          duration: 1000,
          floating: true,
        });
      }, 300);
      
      loadOrders(currentPage);
      setSelectedOrderForCancel(null);
    } catch (error) {
      setCancelModalVisible(false);
      setTimeout(() => {
        showMessage({
          message: error?.message || 'Failed to cancel order',
          type: 'danger',
          duration: 3000,
          floating: true,
        });
      }, 300);
    }
  };

  const checkTimeFilter = (orderDate) => {
    if (selectedTime === 'All') return true;
    
    const date = new Date(orderDate);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch(selectedTime) {
      case 'Last 30 Days': return diffDays <= 30;
      case 'Last 6 Months': return diffDays <= 180;
      case 'This Year': return date.getFullYear() === now.getFullYear();
      case 'Last Year': 
        const lastYear = now.getFullYear() - 1;
        return date.getFullYear() === lastYear;
      default: return true;
    }
  };

  const filteredOrders = React.useMemo(() => {
    return localOrders.filter(order => {
      const statusMatch = selectedStatuses.length === 0 || 
        selectedStatuses.some(status => {
          if (status === 'All Orders') return true;
          const statusValues = STATUS_CONFIG[status] || [status.toLowerCase()];
          return statusValues.some(val => 
            order.status.toLowerCase().includes(val.toLowerCase())
          );
        });

      const timeMatch = checkTimeFilter(order.createdAt);
      const searchMatch = searchQuery === '' || 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderItems.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return statusMatch && timeMatch && searchMatch;
    });
  }, [localOrders, selectedStatuses, selectedTime, searchQuery]);

  const renderItem = ({ item }) => (
    <OrderListItem 
      order={item}
      onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}
      onCancel={() => {
        setSelectedOrderForCancel(item?._id);
        setCancelModalVisible(true);
      }}
    />
  );

  const showLoader = (loading && currentPage === 1) || isSearching;

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={styles.header}>
          <CustomSearch
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            backgroundColor={'#fff'}
            containerStyle={styles.searchInput}
            inputStyle={{ fontSize: 14, paddingVertical: 11, marginLeft: 2 }}
          />
        </View>
        <Pressable 
          style={styles.cartPressable}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={{ position: 'relative' }}>
            <FastImage
              style={styles.cartImg}
              source={require('../../../../assets/Icons/shopping_cart.png')}
            />
            {initialized && itemCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {itemCount > 99 ? '99+' : itemCount}
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>

      <View style={styles.orderHeaderRow}>
        <Text style={styles.title}>Your Orders</Text>
        <CustomBtn
          width={90}
          height={30}
          icon={
            <View style={{transform: [{rotate: '270deg'}]}}>
              <SortIcon name="sync-alt" size={20} color="#1C1B1F7D" />
            </View>
          }
          title="Filter"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {showLoader ? (
        <ActivityIndicator size="large" color="#2E6074" style={{marginTop: 40}} />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}_${item.updatedAt || item.createdAt}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title={'Your orders is empty'}
              imageSource={require('../../../../assets/no-order.png')}
              notDisplayButton
            />
          }
          onEndReached={loadMoreOrders}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="small" color="#2E6074" style={{marginVertical: 20}} />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2E6074']}
              tintColor={'#2E6074'}
            />
          }
        />
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

      <CancelOrderModal
        visible={cancelModalVisible}
        onClose={() => {
          setCancelModalVisible(false);
          setSelectedOrderForCancel(null);
        }}
        onCancelOrder={handleCancelOrder}
        isLoading={cancelLoading}
      /> 
    </View>
  );
};

export default Orders;