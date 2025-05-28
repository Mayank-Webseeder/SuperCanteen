import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomCommonHeader from '../../Components/Common/CustomCommonHeader';
import ConfirmationModal from '../../otherComponents/confirmationModal';
import Toast from 'react-native-toast-message';
import { Height } from '../../constants/constants';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
    fontFamily: 'Inter-SemiBold',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop:Height(-10)
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 12,
  },
  addressTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E6074',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addressTypeText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  defaultBadge: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 12,
  },
  deleteButton: {},
  cardBody: {},
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Inter-SemiBold',
  },
  contactText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  addressDetails: {
    flexDirection: 'row',
    marginTop: 12,
  },
  locationIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2E6074',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
});

export default AddressListScreen;