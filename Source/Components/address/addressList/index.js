import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import ConfirmationModal from '../../../otherComponents/confirmationModal';
import { styles } from './styles';
import {
  deleteAddress,
  fetchUserAddresses
} from '../../../redux/slices/addressSlice';
import {
  setSelectedAddress,
  selectSelectedAddress
} from '../../../redux/slices/selectedAddressSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressSkeletonLoader from '../../../otherComponents/checkOut/addressSkeletonLoader';

const AddressListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addresses, loading } = useSelector(state => state.address);
  const globalSelectedAddress = useSelector(selectSelectedAddress);

  const [isDataReady, setIsDataReady] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedAddressId, setSelectedAddressId] = useState(globalSelectedAddress?._id || null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setIsDataReady(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      try {
        const updatedAddresses = await dispatch(fetchUserAddresses(user.id)).unwrap();
        const stored = await AsyncStorage.getItem('selectedAddress');
        const parsed = stored ? JSON.parse(stored) : null;

        if (parsed) {
          const match = updatedAddresses.find(a => a._id === parsed._id);
          if (match) {
            setSelectedAddressId(match._id);
            dispatch(setSelectedAddress(match));
            await AsyncStorage.setItem('selectedAddress', JSON.stringify(match));
          } else if (updatedAddresses.length > 0) {
            const fallback = updatedAddresses[0];
            setSelectedAddressId(fallback._id);
            dispatch(setSelectedAddress(fallback));
            await AsyncStorage.setItem('selectedAddress', JSON.stringify(fallback));
          } else {
            setSelectedAddressId(null);
            dispatch(setSelectedAddress(null));
            await AsyncStorage.removeItem('selectedAddress');
          }
        } else if (updatedAddresses.length > 0) {
          const first = updatedAddresses[0];
          setSelectedAddressId(first._id);
          dispatch(setSelectedAddress(first));
          await AsyncStorage.setItem('selectedAddress', JSON.stringify(first));
        }
      } catch (err) {
        console.log("Error loading addresses", err);
      } finally {
        setIsDataReady(true);
      }
    });

    return unsubscribe;
  }, [navigation, user.id]);

  const handleSelectAddress = async (address) => {
    setSelectedAddressId(address._id);
    dispatch(setSelectedAddress(address));
    await AsyncStorage.setItem('selectedAddress', JSON.stringify(address));

    if (route?.params?.fromCheckout) {
      navigation.goBack();
    }
  };

  const showDeleteConfirmation = (id) => {
    setAddressToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAddress({ userId: user.id, addressId: addressToDelete })).unwrap();
      const updatedAddresses = await dispatch(fetchUserAddresses(user.id)).unwrap();

      if (addressToDelete === selectedAddressId) {
        if (updatedAddresses.length > 0) {
          const fallback = updatedAddresses[0];
          setSelectedAddressId(fallback._id);
          dispatch(setSelectedAddress(fallback));
          await AsyncStorage.setItem('selectedAddress', JSON.stringify(fallback));
        } else {
          setSelectedAddressId(null);
          dispatch(setSelectedAddress(null));
          await AsyncStorage.removeItem('selectedAddress');
        }
      }
    } catch (err) {
      console.log("Delete error:", err);
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleEditAddress = (address) => {
    navigation.navigate('CreateAddressScreen', {
      addressToEdit: address
    });
  };

  const renderAddressItem = ({ item }) => {
    const isSelected = item?._id === selectedAddressId;

    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => handleSelectAddress(item)}>
        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim },
            isSelected && styles.selectedCard
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.addressTypeBadge}>
              <Icon
                name={item?.addressType === 'Office' ? 'business' : 'home'}
                size={16}
                color="#fff"
              />
              <Text style={styles.addressTypeText}>{item?.addressType}</Text>
            </View>

            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={() => handleEditAddress(item)}
                style={styles.editButton}
              >
                <Icon name="edit" size={20} color="#2E6074" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showDeleteConfirmation(item?._id)}
                style={styles.deleteButton}
              >
                <Icon name="delete" size={20} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.nameText}>{item?.name}</Text>
            <Text style={styles.contactText}>{item?.contactNo}</Text>

            <View style={styles.addressDetails}>
              <Icon
                name="location-on"
                size={18}
                color="#2E6074"
                style={styles.locationIcon}
              />
              <Text style={styles.addressText}>
                {[item?.address, item?.city, `${item?.state} - ${item?.postalCode}`, item?.country]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="location-off" size={50} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Addresses Saved</Text>
      <Text style={styles.emptySubtitle}>
        Add your first address to get started
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="My Addresses" />
      {!isDataReady || loading ? (
        <View style={styles.listContainer}>
          <AddressSkeletonLoader />
        </View>
      ) : addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item?._id?.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAddressScreen')}
      >
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Address"
        message="Are you sure you want to delete this address?"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
        cancelText="Cancel"
        confirmText="Delete"
        confirmColor="#e74c3c"
        loading={loading}
      />
    </View>
  );
};

export default AddressListScreen;
