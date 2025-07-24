import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { selectSelectedAddress } from '../../../redux/slices/selectedAddressSlice';
import { setDefaultAddress } from '../../../redux/slices/addressSlice';

const AddressView = ({ navigation }) => {
  const selectedAddress = useSelector(selectSelectedAddress);
  const defaultAddress = useSelector(setDefaultAddress);
  
  const handleChangeAddress = () => {
    navigation.navigate('AddressListScreen', { fromCheckout: true });
  };

  // Check if selected address is default
  const isDefault = selectedAddress?._id === defaultAddress?._id;

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Ionicons name="location-outline" size={20} color="#2E6074" />
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        {/* Only added this line - shows (Default) text next to title when applicable */}
        {isDefault && <Text style={styles.sectionTitle}> (Default)</Text>}
      </View>

      {selectedAddress ? (
        <View style={styles.addressContainer}>
          <View style={styles.row}>
            <Ionicons name="person-outline" size={14} color="#2E6074" />
            <Text style={styles.addressLine}>{selectedAddress.name}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="call-outline" size={14} color="#2E6074" />
            <Text style={styles.addressLine}>{selectedAddress.contactNo}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="home-outline" size={14} color="#2E6074" />
            <Text style={styles.addressLine}>
              {[
                selectedAddress.address,
                selectedAddress.city,
                `${selectedAddress.state} - ${selectedAddress.postalCode}`,
                selectedAddress.country,
              ]
                .filter(Boolean)
                .join(', ')}
            </Text>
          </View>

          <TouchableOpacity onPress={handleChangeAddress} style={styles.changeButton}>
            <Text style={styles.changeText}>Change Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyAddressContainer}>
          <Text style={styles.emptyAddressText}>No delivery address selected</Text>
          <TouchableOpacity onPress={handleChangeAddress} style={styles.addAddressButton}>
            <FastImage
              style={styles.addIcon}
              source={require('../../../../assets/Icons/add_home.png')}
            />
            <Text style={styles.addAddressText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddressView;