import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Notification } from '../services/notificationService';

interface NotificationItemProps {
  item: Notification;
  onPress: () => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order':
      return 'package-variant';
    case 'system':
      return 'information';
    case 'promotion':
      return 'tag';
    default:
      return 'bell';
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'order':
      return '#8E6CEF';
    case 'system':
      return '#2196F3';
    case 'promotion':
      return '#4CAF50';
    default:
      return '#666';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ item, onPress }) => {
  const iconColor = getNotificationColor(item.type);
  const formattedTime = formatDate(item.createdAt);

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotification,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
        <Icon
          name={getNotificationIcon(item.type)}
          size={24}
          color={iconColor}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            !item.isRead && styles.unreadText,
          ]}>
            {item.title}
          </Text>
          {!item.isRead && (
            <View style={styles.unreadDot} />
          )}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.time}>{formattedTime}</Text>
          {item.type === 'order' && (
            <View style={[styles.orderBadge, { backgroundColor: `${iconColor}15` }]}>
              <Text style={[styles.orderBadgeText, { color: iconColor }]}>
                Order Update
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadNotification: {
    backgroundColor: '#F8F5FF',
    borderLeftWidth: 4,
    borderLeftColor: '#8E6CEF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  unreadText: {
    color: '#333',
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8E6CEF',
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  orderBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default NotificationItem; 