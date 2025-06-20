import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import CustomCartCard from '../../../Components/cartCard/customCartCard';
import CustomBtn from '../../../Components/CustomFilterBtn';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import AddressView from '../../../otherComponents/checkOut/addressView';
import OrderFilterModal from '../../../otherComponents/orders/orderFilter';
import PriceSummaryCard from '@components/Common/PriceSummaryCard';
import CouponView from '../../../otherComponents/checkOut/couponView';
import { styles } from './styles';
import Footer from './footer';
import AgreeTerms from './agreeTerms';
import { useSelector } from 'react-redux';

export default function CartScreen({ navigation }) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const { items } = useSelector((state) => state.cart);

  const toggleStatus = (option) => {
    if (selectedStatuses.includes(option)) {
      setSelectedStatuses(selectedStatuses.filter(item => item !== option));
    } else {
      setSelectedStatuses([...selectedStatuses, option]);
    }
  };

  const handleApply = () => {
    setModalVisible(false);
    console.log('Filters applied:', { selectedStatuses, selectedTime });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedStatuses([]);
    setSelectedTime('');
  };

  return (
    <View style={styles.container}>
      <CustomCommonHeader title={'Your Cart'} navigation={navigation} />

      <ScrollView 
        contentContainerStyle={styles.contentContainerStyle} 
        showsVerticalScrollIndicator={false}
      >
        {/* Address Section */}     
        <View style={styles.addressView}>
          <AddressView navigation={navigation} />
        </View>
        
        {/* Sort & Selection */}
        {items.length > 0 && (
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
        )}
      
        {/* Cart Items */}
        <CustomCartCard navigation={navigation} />

        {/* Show price summary only if there are items */}
        {items.length > 0 && (
          <>
            {/* Price Details */}
            <View style={styles.main}>
              <PriceSummaryCard />

              {/* Coupon */}
              <View style={styles.blankView} />
              <CouponView navigation={navigation} />
            </View> 

            {/* Custom Checkbox for Terms */}
            <AgreeTerms setAgreeTerms={setAgreeTerms} agreeTerms={agreeTerms} />
          </>
        )}
      </ScrollView>

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

      {/* Footer */}
      <Footer navigation={navigation} agreeTerms={agreeTerms}  />
    </View>
  );
}