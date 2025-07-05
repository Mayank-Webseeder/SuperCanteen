import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomBtn from '../../../Components/CustomFilterBtn';
import {useNavigation} from '@react-navigation/native';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import OrderListItem from '../../../otherComponents/orders/OrderListItem';
import { styles } from './styles';
import CustomSearch from '../../../Components/searchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../../../redux/slices/orderSlice';

// Status mapping configuration
const STATUS_CONFIG = {
  'All Orders': [], // Special case - shows all orders
  'Awaited': ['awaited'],
  'Processing': ['processing'],
  'Shipped': ['shipped'],
  'Delivered': ['delivered', 'completed'],
  'Cancelled': ['cancelled', 'refunded'],
  'Return': ['return_initiated'],
  'Exchange': ['exchange_initiated']
};

const Orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // New state for search loading
  const navigation = useNavigation();
  
  const dispatch = useDispatch();
  const { orders, loading, pagination } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);

  // Convert selected status filters to API-compatible status values
  const getApiStatusParams = () => {
    if (selectedStatuses.length === 0 || selectedStatuses.includes('All Orders')) {
      return []; // Return empty array for all orders
    }
    
    return selectedStatuses.flatMap(status => 
      STATUS_CONFIG[status] || [status.toLowerCase()]
    );
  };

  const loadOrders = useCallback(async (page = 1, refresh = false) => {
    try {
      const apiStatusParams = getApiStatusParams();
      
      await dispatch(fetchUserOrders({ 
        userId: user?.id, 
        page,
        status: apiStatusParams,
        timeRange: selectedTime,
        search: searchQuery
      }));
    } finally {
      if (refresh) setRefreshing(false);
      setIsLoadingMore(false);
      setIsSearching(false); // Reset search loading state
    }
  }, [user?.id, selectedStatuses, selectedTime, searchQuery]);

  // Load more orders
  const loadMoreOrders = () => {
    if (!isLoadingMore && pagination?.currentPage < pagination?.totalPages) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      loadOrders(nextPage)
        .then(() => setCurrentPage(nextPage))
        .catch(() => setIsLoadingMore(false));
    }
  };

  // Initial load
  useEffect(() => {
    loadOrders(1);
  }, [loadOrders]);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(1);
    loadOrders(1, true);
  }, [loadOrders]);

  // Toggle status filter
  const toggleStatus = (status) => {
    if (status === 'All Orders') {
      setSelectedStatuses(['All Orders']); // Select only 'All Orders'
    } else {
      setSelectedStatuses(prev => {
        // Remove 'All Orders' if other filters are selected
        const newStatuses = prev.filter(s => s !== 'All Orders');
        
        if (prev.includes(status)) {
          // Remove the status if already selected
          return newStatuses.filter(s => s !== status);
        } else {
          // Add the status
          return [...newStatuses, status];
        }
      });
    }
  };

  // Apply filters
  const handleApply = async () => {
    setModalVisible(false);
    setCurrentPage(1);
    await loadOrders(1); // Wait for the load to complete
  };

  // Reset filters
  const handleCancel = () => {
    setSelectedStatuses([]);
    setSelectedTime('');
    setModalVisible(false);
    setCurrentPage(1);
    loadOrders(1);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    setIsSearching(true); // Activate search loading state
    setCurrentPage(1);
    await loadOrders(1);
  };

  // Client-side filtering for immediate UI updates
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      // Status filter
      const statusFilterPassed = selectedStatuses.length === 0 || 
        selectedStatuses.some(status => {
          if (status === 'All Orders') return true;
          const statusValues = STATUS_CONFIG[status] || [status.toLowerCase()];
          return statusValues.some(val => 
            order.status.toLowerCase().includes(val.toLowerCase())
          );
        });

      // Time filter
      const timeFilterPassed = !selectedTime || checkTimeFilter(order.createdAt, selectedTime);

      // Search filter
      const searchFilterPassed = searchQuery === '' || 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderItems.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return statusFilterPassed && timeFilterPassed && searchFilterPassed;
    });
  }, [orders, selectedStatuses, selectedTime, searchQuery]);

  // Time filter helper
  const checkTimeFilter = (orderDate, timeRange) => {
    const date = new Date(orderDate);
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    switch(timeRange) {
      case 'Last 30 Days':
        return date > new Date(now - 30 * oneDay);
      case 'Last 6 Months':
        return date > new Date(now.setMonth(now.getMonth() - 6));
      case 'This Year':
        return date.getFullYear() === now.getFullYear();
      case 'Last Year':
        return date.getFullYear() === now.getFullYear() - 1;
      default:
        return true;
    }
  };

  const renderItem = ({ item }) => (
    <OrderListItem 
      order={item}
      onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}
    />
  );

  // Combined loading state
  const showLoader = (loading && currentPage === 1) || isSearching;
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <CustomCommonHeader notShowingBackIcon navigation={navigation} title={'Your Orders'} />
      </View>
     
      <View style={{marginHorizontal: 16}}>
        <CustomSearch
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          backgroundColor={'#fff'}
          containerStyle={styles.searchInput}
          inputStyle={{ fontSize: 14, paddingVertical: 11, marginLeft: 2}}
        />
      </View>

      <View style={styles.orderHeaderRow}>
        <Text style={styles.orderTitle}>Your Orders</Text>
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
          keyExtractor={item => `${item._id}_${item.status}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No orders found</Text>
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
    </View>
  );
};

export default Orders;