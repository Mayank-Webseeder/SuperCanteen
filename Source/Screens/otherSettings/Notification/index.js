import React from 'react';
import { View, Text, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import CustomHeader from '../../../Components/customHeader';

const notifications = [
  {
    id: '1',
    icon: 'notifications',
    title: 'Payment Successful',
    message: 'Your transaction of ₹1200 was successful.',
    time: '2h ago',
    type: 'success',
  },
  {
    id: '2',
    icon: 'local-offer',
    title: 'New Offer',
    message: 'Get 20% off on your next ride.',
    time: '5h ago',
    type: 'offer',
  },
  {
    id: '3',
    icon: 'error-outline',
    title: 'Payment Failed',
    message: 'Your transaction of ₹300 failed. Try again.',
    time: '1d ago',
    type: 'error',
  },
];

const NotificationItem = ({ item }) => {
  const iconColors = {
    success: '#10B981',
    offer: '#3B82F6',
    error: '#EF4444',
  };

  return (
    <View style={styles.notificationCard}>
      <View style={[styles.iconCircle, { backgroundColor: iconColors[item.type] }]}>
        <MaterialIcons name={item.icon} size={22} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );
};

const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <CustomHeader label="Notifications" navigation={navigation} />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default NotificationScreen;
