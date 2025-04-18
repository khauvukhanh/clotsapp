import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { OrderStackParamList } from '../navigation/OrderStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getOrders, Order, GetOrdersResponse } from '../services/orderService';
import OrderItem from '../components/OrderItem';

type OrderListScreenNavigationProp = NativeStackNavigationProp<OrderStackParamList, 'OrderList'>;

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

const OrderListScreen = () => {
  const navigation = useNavigation<OrderListScreenNavigationProp>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState<GetOrdersResponse['statusCounts']>({
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  });

  const fetchOrders = async (status?: string) => {
    try {
      const response = await getOrders(status);
      setOrders(response.orders);
      setStatusCounts(response.statusCounts);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders(selectedStatus || undefined);
  }, [selectedStatus]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchOrders(selectedStatus || undefined);
  }, [selectedStatus]);

  const renderStatusFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.statusFilterContainer}
    >
      <TouchableOpacity
        style={[
          styles.statusFilterItem,
          !selectedStatus && styles.selectedStatusFilterItem,
        ]}
        onPress={() => setSelectedStatus(null)}
      >
        <Text style={[
          styles.statusFilterText,
          !selectedStatus && styles.selectedStatusFilterText,
        ]}>
          All ({Object.values(statusCounts).reduce((a, b) => a + b, 0)})
        </Text>
      </TouchableOpacity>
      {Object.entries(statusCounts).map(([status, count]) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.statusFilterItem,
            selectedStatus === status && styles.selectedStatusFilterItem,
          ]}
          onPress={() => setSelectedStatus(status)}
        >
          <Text style={[
            styles.statusFilterText,
            selectedStatus === status && styles.selectedStatusFilterText,
          ]}>
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const filteredOrders = React.useMemo(() => {
    if (!selectedStatus) return orders;
    return orders.filter(order => order.status.toLowerCase() === selectedStatus.toLowerCase());
  }, [orders, selectedStatus]);

  if (isLoading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      </SafeAreaView>
    );
  }

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      {renderStatusFilter()}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="package-variant" size={64} color="#666" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Your orders will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          renderItem={({ item }) => (
            <OrderItem
              item={item}
              onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statusFilterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    minHeight: 66,
    maxHeight: 66,
  },
  statusFilterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F8F5FF',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedStatusFilterItem: {
    backgroundColor: '#8E6CEF',
    borderColor: '#8E6CEF',
    shadowColor: '#8E6CEF',
    shadowOpacity: 0.3,
    transform: [{ scale: 1.02 }],
  },
  statusFilterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  selectedStatusFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  listContainer: {
    padding: 16,
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

export default OrderListScreen; 