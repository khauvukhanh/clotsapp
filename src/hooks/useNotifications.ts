import { useState, useCallback, useEffect } from 'react';
import { getNotifications, markNotificationAsRead, Notification, GetNotificationsResponse, markAllNotificationsAsRead } from '../services/notificationService';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async (pageNum: number = 1, shouldRefresh: boolean = false) => {
    try {
      if (shouldRefresh) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await getNotifications(pageNum);
      setNotifications(prev => {
        if (shouldRefresh) {
          return response.notifications;
        }
        return [...prev, ...response.notifications];
      });
      setUnreadCount(response.unreadCount);
      setHasMore(pageNum < response.pages);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchNotifications(1, true);
  }, [fetchNotifications]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  }, [isLoading, hasMore, page, fetchNotifications]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => prev.map(item => 
        item._id === notificationId ? { ...item, isRead: true } : item
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, []);

  return {
    notifications,
    isLoading,
    refreshing,
    unreadCount,
    fetchNotifications,
    onRefresh,
    loadMore,
    markAsRead,
    markAllAsRead,
  };
}; 