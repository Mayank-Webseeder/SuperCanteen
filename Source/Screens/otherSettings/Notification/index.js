import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchNotifications, fetchUnreadCount, markNotificationAsRead, markAllNotificationsAsRead } from '../../../redux/slices/notificationSlice';
import { COLORS } from '@constants/index';
import { styles } from './styles';

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading, error } = useSelector(state => state.notification);
  const { user } = useSelector(state => state.auth);
  const [refreshing, setRefreshing] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // Sort notifications with unread first, then by date (newest first)
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read === b.read) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.read ? 1 : -1;
  });

  // Load notifications
  const loadNotifications = async () => {
    if (user?.id) {
      await dispatch(fetchNotifications(user.id));
      await dispatch(fetchUnreadCount(user.id));
    }
  };

  // Initial load
  useEffect(() => {
    loadNotifications();
  }, [user?.id]);

  // Pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkAsRead = async (notification) => {
    if (!notification.read) {
      await dispatch(markNotificationAsRead(notification._id));
      await dispatch(fetchUnreadCount(user.id));
    }
    if (notification.link) {
      navigation.navigate(notification.link.screen, notification.link.params);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount > 0) {
      await dispatch(markAllNotificationsAsRead(user.id));
      await dispatch(fetchUnreadCount(user.id));
      console.log({
        message: 'All notifications marked as read',
        type: 'success',
        duration: 2000
      });
    }
  };

  const NotificationItem = ({ item }) => {
    console.log("ITEM IS",item)
    const notificationTypes = {
      order: { icon: 'shopping-bag', color: COLORS.green },
      payment: { icon: 'credit-card', color: COLORS.success },
      offer: { icon: 'local-offer', color: COLORS.warning },
      system: { icon: 'notifications', color: COLORS.gray },
      delivery: { icon: 'local-shipping', color: COLORS.info },
      default: { icon: 'notifications', color: COLORS.green }
    };

    const type = notificationTypes[item.type] || notificationTypes.default;

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
         { backgroundColor :item.read ? COLORS.white : COLORS.lightBlue}
          
        ]}
        onPress={() => handleMarkAsRead(item)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${type.color}20` }]}>
          <MaterialIcons name={type.icon} size={20} color={type.color} />
        </View>
        
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.notificationTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.notificationMessage} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.notificationTime}>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
        
        {/* Unread indicator on the right side */}
        {!item.read && <View style={[styles.unreadBadge, { backgroundColor: type.color }]} />}
      </TouchableOpacity>
    );
  };

  if (loading && notifications.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="chevron-left" size={25} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
        </View>
        <ActivityIndicator size="large" color={COLORS.green} style={styles.loader} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={25} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={sortedNotifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.green]}
            tintColor={COLORS.green}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="notifications-off" size={50} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>We'll notify you when something arrives</Text>
          </View>
        }
      />

      {!socketConnected && (
       <></>
      )}
    </View>
  );
};



export default NotificationScreen;