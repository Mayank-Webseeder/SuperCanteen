// Orders.js
import React, {useState} from 'react';
import {
  Text,
  View,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomSearchInput from '../../../Components/searchInput';
import CustomBtn from '../../../Components/CustomFilterBtn';
import {useNavigation} from '@react-navigation/native';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import OrderListItem from '../../../otherComponents/orders/OrderListItem';
import { dummyOrders } from '../../../Mock/Data/OrdersData';
import { styles } from './styles';

const Orders = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const navigation = useNavigation();

  const toggleStatus = option => {
    if (selectedStatuses.includes(option)) {
      setSelectedStatuses(selectedStatuses.filter(item => item !== option));
    } else {
      setSelectedStatuses([...selectedStatuses, option]);
    }
  };

  const handleApply = () => {
    setModalVisible(false);
    // Apply your filter logic here
    console.log('Filters applied:', {selectedStatuses, selectedTime});
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedStatuses([]);
    setSelectedTime('');
  };

  

    const renderItem = ({ item }) => (
    <OrderListItem 
      order={item}
      onPress={() => navigation.navigate('OrderDetailScreen', { order: item })}
    />
  );



  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
            <CustomCommonHeader notShowingBackIcon navigation={navigation} title={'Your Orders'} />
      </View>
     
      <View style={{marginHorizontal: 16}}>
             

        <CustomSearchInput showCrossIcon={true} />
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

  <FlatList
        data={dummyOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found</Text>
        }
      />
      


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