import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NotificationStackParamList } from '../navigation/NotificationStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Notification } from '../services/notificationService';
import NotificationItem from '../components/NotificationItem';
import { useNotifications } from '../hooks/useNotifications';

type NotificationScreenNavigationProp = NativeStackNavigationProp<NotificationStackParamList, 'Notification'>;

const NotificationScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    notifications,
    isLoading,
    refreshing,
    unreadCount,
    onRefresh,
    loadMore,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const handleNotificationPress = useCallback(async (notification: Notification) => {
    if (!notification.isRead) {
      // await markAsRead(notification._id);
    }

    if (notification.type === 'order' && notification.data.orderId) {
      navigation.navigate('OrderDetail', { orderId: notification.data.orderId });
    }
  }, [navigation, markAsRead]);

  const handleMarkAllAsRead = useCallback(async () => {
    if (unreadCount > 0) {
      await markAllAsRead();
    }
  }, [unreadCount, markAllAsRead]);

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={handleMarkAllAsRead}
            >
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="bell-off" size={64} color="#666" />
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>Your notifications will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
              onPress={() => handleNotificationPress(item)}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: '#8E6CEF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  markAllButton: {
    paddingVertical: 4,
  },
  markAllText: {
    color: '#8E6CEF',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NotificationScreen; 