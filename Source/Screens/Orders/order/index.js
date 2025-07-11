import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
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
import CancelOrderModal from '../../../otherComponents/orders/cancelOrder';
import { cancelOrderById } from '../../../redux/slices/orderSlice';
import { showMessage } from 'react-native-flash-message';
import EmptyState from '@components/emptyComponent/EmptyState';
import { initSocket } from "../../../services/SocketService";

const STATUS_CONFIG = {
  'All Orders': [],
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
  const [isSearching, setIsSearching] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [localOrders, setLocalOrders] = useState([]); // Added local state for socket updates

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orders: reduxOrders, loading, pagination, cancelLoading } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
  if (reduxOrders.length > 0) {
    setLocalOrders(reduxOrders);
  }
}, [reduxOrders]);

 useEffect(() => {
    loadOrders(1);
  }, []);

  useEffect(() => {
  console.log("🔍 User ID for socket:", user?.id);
  initSocket(); // Just ensure socket connects
}, []);


useEffect(() => {
  if (!user?.id) return;

  const socket = initSocket();

  const handleOrderUpdate = (updatedOrder) => {
    console.log("📦 Order Updated via Socket:", updatedOrder);
    if (!updatedOrder?._id) return;

    setLocalOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  socket.on("orderUpdated", handleOrderUpdate);

  return () => {
    console.log("🧹 Cleaning up socket");
    socket.off("orderUpdated", handleOrderUpdate);
    socket.disconnect();
  };
}, [user?.id]);




  const getApiStatusParams = () => {
    if (selectedStatuses.length === 0 || selectedStatuses.includes('All Orders')) {
      return [];
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
    setModalVisible(false);
    setCurrentPage(1);
    await loadOrders(1);
  };

  const handleCancel = () => {
    setSelectedStatuses([]);
    setSelectedTime('');
    setModalVisible(false);
    setCurrentPage(1);
    loadOrders(1);
  };

  const handleSearchSubmit = async () => {
    setIsSearching(true);
    setCurrentPage(1);
    await loadOrders(1);
  };

  const handleCancelOrder = async ({ cancelReason }) => {
    try {
      if (!selectedOrderForCancel) throw new Error('Order ID missing');
      
      await dispatch(cancelOrderById({ 
        orderId: selectedOrderForCancel, 
        cancelReason 
      })).unwrap();

      setCancelModalVisible(false);
      setTimeout(() => {
        showMessage({
          message: 'Order cancelled successfully!',
          type: 'success',
          duration: 3000,
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

      const timeMatch = !selectedTime || checkTimeFilter(order.createdAt, selectedTime);
      const searchMatch = searchQuery === '' || 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderItems.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return statusMatch && timeMatch && searchMatch;
    });
  }, [localOrders, selectedStatuses, selectedTime, searchQuery]);

  const checkTimeFilter = (orderDate, timeRange) => {
    const date = new Date(orderDate);
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    switch(timeRange) {
      case 'Last 30 Days': return date > new Date(now - 30 * oneDay);
      case 'Last 6 Months': return date > new Date(now.setMonth(now.getMonth() - 6));
      case 'This Year': return date.getFullYear() === now.getFullYear();
      case 'Last Year': return date.getFullYear() === now.getFullYear() - 1;
      default: return true;
    }
  };


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