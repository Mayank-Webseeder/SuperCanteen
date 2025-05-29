import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCommonHeader from '../../../../components/common/customCommonHeader';
import { Width } from '../../../../constants';
import { styles } from './styles';

const OrderConfirmPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <CustomCommonHeader navigation={navigation} title={'Order Confirm Page'}/>

      {/* Order Placed */}
      <Text style={styles.title}>Order Placed!</Text>

      {/* Delivery Address */}
      <View style={{marginHorizontal:Width(20)}}>
               <Text style={styles.sectionTitle}>Delivering to..</Text>
      <View style={styles.addressCard}>
        <View style={styles.addressRow}>
          <Icon name="location-outline" size={20} color="#2E6074" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.addressName}>Apoorva Gaur</Text>
            <Text style={styles.addressDetails}>
              23B, Maple Residency, Sector 45, Near Green Park Metro Station,
              Gurgaon, Haryana-122003
            </Text>
          </View>
        </View>
      </View>

      {/* Your Items */}
      <Text style={styles.sectionTitle}>YOUR ITEMS</Text>
      <View style={styles.itemCard}>
        <Image
          source={require('../../../../../assets/Icons/Op.png')}
          style={styles.productImage}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemBrand}>Timex</Text>
          <Text style={styles.itemDesc}>Bella Analog Watch for Womens</Text>
          <Text style={styles.itemDelivery}>Free delivery by 24th May</Text>
          <Text style={styles.itemPrice}>₹4,889</Text>
          <Text style={styles.viewDetails}>View Order Details</Text>
        </View>
      </View>

      {/* Notification Prompt */}
      <View style={[styles.notificationContainer, { flexDirection: 'row', alignItems: 'center' }]}>
  <Text style={styles.notificationText}>
    Turn ON notifications to receive your order updates!
  </Text>
  <Image
    source={require('../../../../../assets/Icons/Notification.png')}
    style={styles.notificationImage}
  />
</View>


      {/* Thank You Section */}
      <View style={styles.thankYouContainer}>
        <Text style={styles.thankYouText}>
          Thank you for your purchase — we look forward to seeing you again soon.
        </Text>
        <Image
  source={require('../../../../../assets/Icons/Bag.png')}
  style={[styles.thankYouImage, { transform: [{ rotate: '45deg' }] }]}
/>

        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.button}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
      </View>

    </ScrollView>
  );
};

export default OrderConfirmPage;


