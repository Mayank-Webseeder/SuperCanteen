import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import ConfirmationModal from '../../../otherComponents/confirmationModal';
import Toast from 'react-native-toast-message';
import { styles } from './styles';

const STORAGE_KEY = '@address_data';

const AddressListScreen = ({navigation}) => {
  const [addresses, setAddresses] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAddresses();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    return unsubscribe;
  }, [navigation]);

  const loadAddresses = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      const loadedAddresses = savedData ? JSON.parse(savedData) : [];
      setAddresses(loadedAddresses);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load addresses.',
      });
      console.error('Address load error:', error);
    }
  };

  const showDeleteConfirmation = (id) => {
    setAddressToDelete(id);
    setDeleteModalVisible(true);
  };

  const deleteAddress = async () => {
    try {
      const updatedAddresses = addresses.filter(addr => addr.id !== addressToDelete);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedAddresses),
      );
      setAddresses(updatedAddresses);
      setDeleteModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Address deleted successfully.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete address.',
      });
      console.error('Delete error:', error);
    }
  };

  const renderAddressItem = ({item}) => (
    <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
      <View style={styles.cardHeader}>
        <View style={styles.addressTypeBadge}>
          <Icon 
            name={item.addressType === 'Office' ? 'business' : 'home'} 
            size={16} 
            color="#fff" 
          />
          <Text style={styles.addressTypeText}>{item.addressType}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAddressScreen', {addressToEdit: item})}
            style={styles.editButton}>
            <Icon name="edit" size={20} color="#2E6074" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showDeleteConfirmation(item.id)}
            style={styles.deleteButton}>
            <Icon name="delete" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.contactText}>{item.contact}</Text>
        
        <View style={styles.addressDetails}>
          <Icon name="location-on" size={18} color="#2E6074" style={styles.locationIcon} />
          <Text style={styles.addressText}>
            {[item.flatDetails, item.landmark, item.city, `${item.state} - ${item.pincode}`, item.country]
              .filter(Boolean)
              .join(', ')}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="location-off" size={50} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Addresses Saved</Text>
      <Text style={styles.emptySubtitle}>Add your first address to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="My Addresses" />
      
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAddressScreen')}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Address"
        message="Are you sure you want to delete this address?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={deleteAddress}
        cancelText="Cancel"
        confirmText="Delete"
        confirmColor="#e74c3c"
      />
    </View>
  );
};



export default AddressListScreen;