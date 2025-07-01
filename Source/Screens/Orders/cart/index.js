import React, { useState, useEffect } from 'react';
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
import { styles } from './styles';
import Footer from './footer';
import AgreeTerms from './agreeTerms';
import { useSelector } from 'react-redux';
import EmptyState from '@components/emptyComponent/EmptyState';
import ContentSkeletonLoader from '@components/Common/contentSkeletonLoader';

export default function CartScreen({ navigation }) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { items } = useSelector((state) => ({
    items: state.cart.items,
    loading: state.cart.loading
  }));

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this timeout as needed

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomCommonHeader title={'Your Cart'} navigation={navigation} />
        <View style={styles.loaderContainer}>
         <ContentSkeletonLoader/>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomCommonHeader title={'Your Cart'} navigation={navigation} />
      
      {items.length > 0 ? (
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

          {/* Custom Checkbox for Terms */}
          <View style={styles.blankView} />
          <AgreeTerms setAgreeTerms={setAgreeTerms} agreeTerms={agreeTerms} />
        </ScrollView>
      ) : (
        <EmptyState
          title={'Your cart is empty'}
          imageSource={require('../../../../assets/Icons/emptyCart.jpg')}
          onPress={() => navigation.navigate('Main')}
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

      {/* Footer */}
      {items.length > 0 && <Footer navigation={navigation} agreeTerms={agreeTerms} />}
    </View>
  );
}