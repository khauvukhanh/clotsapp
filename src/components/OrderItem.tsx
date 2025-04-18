import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import { Order } from '../services/orderService';

interface OrderItemProps {
  item: Order;
  onPress: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#FFA500';
    case 'processing':
      return '#8E6CEF';
    case 'shipped':
      return '#2196F3';
    case 'delivered':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    default:
      return '#666';
  }
};

const OrderItem: React.FC<OrderItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={onPress}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Icon name="receipt" size={20} color="#8E6CEF" />
          <Text style={styles.orderId}>Order #{item._id.slice(-6)}</Text>
        </View>
        <Text style={styles.orderDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.orderStatusContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.orderItemsContainer}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <View key={index} style={styles.orderItemPreview}>
            <View style={styles.itemImagePlaceholder}>
              <FastImage
                source={{ uri: orderItem.product.thumbnail }}
                style={styles.itemImagePlaceholder}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>
                {orderItem.product.name}
              </Text>
              <Text style={styles.itemQuantity}>x{orderItem.quantity}</Text>
            </View>
          </View>
        ))}
        {item.items.length > 2 && (
          <View style={styles.moreItemsContainer}>
            <Text style={styles.moreItemsText}>
              +{item.items.length - 2} more items
            </Text>
          </View>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderItemsContainer: {
    marginBottom: 16,
  },
  orderItemPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  moreItemsContainer: {
    marginTop: 8,
  },
  moreItemsText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OrderItem; 