import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import ConfirmationModal from '../../../otherComponents/confirmationModal';
import { styles } from './styles';

import { deleteAddress } from '../../../redux/slices/addressSlice';

const AddressListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
 const { addresses, loading } = useSelector(state => state.address);
 
 
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    return unsubscribe;
  }, [navigation]);

  const showDeleteConfirmation = (id) => {
    setAddressToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    console.log("USER ID IS",user.id)
    try {
      await dispatch(
        deleteAddress({
          userId: user.id, // ✅ make sure to use _id from auth
          addressId: addressToDelete,
        })
      ).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Deleted!',
        text2: 'Address deleted successfully.',
      });

      // Optionally: Trigger a refetch or reload user profile here if needed
    } catch (err) {
      console.log("ERROR IS",err)
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2: err?.message || 'Something went wrong.',
      });
      console.log('Delete address error:', err);
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const renderAddressItem = ({ item }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.cardHeader}>
        <View style={styles.addressTypeBadge}>
          <Icon
            name={item.addressType === 'Office' ? 'business' : 'home'}
            size={16}
            color="#fff"
          />
          <Text style={styles.addressTypeText}>{item.addressType}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreateAddressScreen', {
                addressToEdit: item,
              })
            }
            style={styles.editButton}
          >
            <Icon name="edit" size={20} color="#2E6074" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showDeleteConfirmation(item._id)}
            style={styles.deleteButton}
          >
            <Icon name="delete" size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.contactText}>{item.contactNo}</Text>

        <View style={styles.addressDetails}>
          <Icon
            name="location-on"
            size={18}
            color="#2E6074"
            style={styles.locationIcon}
          />
          <Text style={styles.addressText}>
            {[item.address, item.city, `${item.state} - ${item.postalCode}`, item.country]
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
      <Text style={styles.emptySubtitle}>
        Add your first address to get started
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomCommonHeader navigation={navigation} title="My Addresses" />
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={(item) => item._id}
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
