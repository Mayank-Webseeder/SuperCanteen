import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import CustomHeader from '../../../Components/CustomHeader';
import { COLORS, Width } from '../../../constants';
import CustomBtn from '../../../Components/CustomFilterBtn';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import OrderListItem from '../../../otherComponents/orders/OrderListItem';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../../../redux/slices/orderSlice';
import EmptyState from '@components/emptyComponent/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

// Status mapping configuration
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

export default function HelpSupport({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  
  const dispatch = useDispatch();
  const { orders, loading, pagination } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);

  // Convert selected status filters to API-compatible status values
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
        timeRange: selectedTime
      }));
    } finally {
      if (refresh) setRefreshing(false);
      setIsLoadingMore(false);
    }
  }, [user?.id, selectedStatuses, selectedTime]);

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
      setSelectedStatuses(['All Orders']);
    } else {
      setSelectedStatuses(prev => {
        const newStatuses = prev.filter(s => s !== 'All Orders');
        if (prev.includes(status)) {
          return newStatuses.filter(s => s !== status);
        } else {
          return [...newStatuses, status];
        }
      });
    }
  };

  // Apply filters
  const handleApply = async () => {
    setModalVisible(false);
    setCurrentPage(1);
    await loadOrders(1);
  };

  // Reset filters
  const handleCancel = () => {
    setSelectedStatuses([]);
    setSelectedTime('');
    setModalVisible(false);
    setCurrentPage(1);
    loadOrders(1);
  };

  // Client-side filtering for immediate UI updates
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      const statusFilterPassed = selectedStatuses.length === 0 || 
        selectedStatuses.some(status => {
          if (status === 'All Orders') return true;
          const statusValues = STATUS_CONFIG[status] || [status.toLowerCase()];
          return statusValues.some(val => 
            order.status.toLowerCase().includes(val.toLowerCase())
          );
        });

      const timeFilterPassed = !selectedTime || checkTimeFilter(order.createdAt, selectedTime);

      return statusFilterPassed && timeFilterPassed;
    });
  }, [orders, selectedStatuses, selectedTime]);

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{padding:10}}>
        <CustomHeader navigation={navigation} label={'Help'}/>
      </View>
      
      <View style={{paddingHorizontal:14}}>
        {/* Section 1 */}
        <View style={styles.card}>
          <View style={styles.leftView}>
            <Text style={styles.title}>Need Help with Your Order? Let's Sort It Out</Text>
            <Text style={styles.subtitle}>
              Your order's on its way — and we're already excited for your next visit!
            </Text>
          </View>
          <FastImage
            source={require('../../../../assets/Background/help-order.png')} 
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <FastImage
            source={require('../../../../assets/Background/help-chat.png')} 
            style={[styles.image,{right:Width(20)}]}
            resizeMode="contain"
          />
          <View style={styles.rightView}>
            <Text style={styles.title}>Chat with us?</Text>
            <Text style={[styles.subtitle,{width:'80%'}]}>
              Got a question? Our team is just a message away.
            </Text>
            <TouchableOpacity style={styles.chatButton}>
              <Icon name="message-square" size={16} color={COLORS.green}/>
              <Text style={styles.chatText}>Chat Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3 */}
        <Text style={styles.textStyle}>Order issues? Let's sort them out together.</Text>

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
      </View>

      {/* Orders Section */}
      {loading && currentPage === 1 ? (
        <ActivityIndicator size="large" color="#2E6074" style={{marginTop: 40}} />
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={item => `${item._id}_${item.updatedAt || item.createdAt}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title={'No orders found'}
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
    </View>
  );
}