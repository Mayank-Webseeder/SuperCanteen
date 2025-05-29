import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import CustomHeader from '../../../components/customHeader';
import { COLORS, Width } from '../../../constants';
import CustomBtn from '../../../components/customFilterBtn';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import { dummyOrders } from '../../../mock/Data/OrdersData';
import OrderListItem from '../../../otherComponents/orders/OrderListItem';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';

export default function HelpScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
   const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

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
      {/* Header */}
      <View style={{padding:10}}>
         <CustomHeader navigation={navigation} label={'Help'}/>
      </View>
    <View style={{paddingHorizontal:14}}>
       

      {/* Section 1 */}
      <View style={styles.card}>
      <View style={styles.leftView}>
          <Text style={styles.title}>Need Help with Your Order? Let’s Sort It Out</Text>
        <Text style={styles.subtitle}>
          Your order's on its way — and we’re already excited for your next visit!
        </Text>
      </View>
         <Image
          source={require('../../../../assets/Background/help-order.png')} 
          style={styles.image}
          resizeMode={'contain'}
        />
      </View>

      {/* Section 2 */}
      <View style={styles.card}>
        <Image
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
      <Text style={styles.textStyle}>Order issues? Let’s sort them out together.</Text>

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

      {/* { ordersSection} */}

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
}


