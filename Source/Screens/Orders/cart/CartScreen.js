import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CustomCommonHeader from '../../../Components/Common/CustomCommonHeader';
import CustomCartCard from '../../../Components/customCartCard';
import CustomBtn from '../../../Components/customFilterBtn';
import SortIcon from 'react-native-vector-icons/MaterialIcons';
import {  Height } from '../../../constants/constants';
import AddressView from '../../../otherComponents/checkOut/addressView';
import OrderFilterModal from '../../../otherComponents/orderFilter';
import PriceSummaryCard from '../../../Components/Common/PriceSummaryCard';
import BankOfferView from '../../../otherComponents/checkOut/bankOffer';
import CouponView from '../../../otherComponents/checkOut/couponView';
import { styles } from './styles';
import Footer from './footer';
import AgreeTerms from './agreeTerms';

export default function CartScreen({navigation}) {
  const [agreeTerms, setAgreeTerms] = useState(false);
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

  return (
    <View style={styles.container}>
      <CustomCommonHeader title={'Your Cart'} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.contentContainerStyle} showsVerticalScrollIndicator={false}>
        {/* Address Section */}     
      <View style={styles.addressView}>
        <AddressView navigation={navigation}/>
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
                <View style={{transform: [{rotate: '270deg'}]}}>
                  <SortIcon name="sync-alt" size={20} color="#1C1B1F7D" />
                </View>
              }
            />
          </TouchableOpacity>
        </View>
      
        {/* Cart Items */}
         <CustomCartCard /> 

        {/* Price Details */}
        <View style={styles.main}>
             <PriceSummaryCard/>

        {/* Coupon */}
        <View style={styles.blankView}/>
       <CouponView navigation={navigation}/>

        {/* Bank Offers */}
        <BankOfferView navigation={navigation} cardStyle={{marginTop:Height(3)}}/>
        </View> 

        {/* Custom Checkbox for Terms */}
       <AgreeTerms setAgreeTerms={setAgreeTerms} agreeTerms={agreeTerms}/>
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
     <Footer navigation={navigation} agreeTerms={agreeTerms}/>
    </View>
  );
}


