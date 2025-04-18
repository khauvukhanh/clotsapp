import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BackHeader from "../components/Headers/BackHeader";
import useCart from "../hooks/useCart";
import { RootStackParamList } from "../types/navigation";

// Types
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    thumbnail: string;
    images: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
  price: number;
}

// Components
const CartItem = ({
  item,
  onPress,
  onDelete,
  onUpdateQuantity,
  isUpdating,
}: {
  item: CartItem;
  onPress: () => void;
  onDelete: () => void;
  onUpdateQuantity: (quantity: number) => void;
  isUpdating: boolean;
}) => {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.deleteContainer}>
        <Animated.View style={[styles.deleteButton, { transform: [{ scale }] }]}>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButtonContent}>
            <Icon name="trash-can-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
      overshootRight={false}
    >
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <FastImage
          source={{ uri: item.product.thumbnail }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, isUpdating && styles.disabledButton]} 
              onPress={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              disabled={isUpdating}
            >
              <Icon name="minus" size={20} color="#333" />
            </TouchableOpacity>
            {isUpdating ? (
              <ActivityIndicator size="small" color="#8E6CEF" style={styles.quantityLoader} />
            ) : (
              <Text style={styles.quantityText}>{item.quantity}</Text>
            )}
            <TouchableOpacity 
              style={[styles.quantityButton, isUpdating && styles.disabledButton]} 
              onPress={() => onUpdateQuantity(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Icon name="plus" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const LoadingState = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#8E6CEF" />
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Icon name="cart-off" size={64} color="#CCCCCC" />
    <Text style={styles.emptyText}>Your cart is empty</Text>
  </View>
);

const CartFooter = ({
  totalAmount,
  onCheckout,
}: {
  totalAmount: number;
  onCheckout: () => void;
}) => (
  <View style={styles.footer}>
    <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
    <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
      <Text style={styles.checkoutText}>Checkout</Text>
    </TouchableOpacity>
  </View>
);

// Main Component
const CartScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    cartItems,
    totalAmount,
    isLoading,
    fetchCartItems,
    error,
    removeAllItems,
    removeItem,
    updateQuantity,
    updatingItems,
  } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleItemPress = (product: CartItem['product']) => {
    navigation.navigate("ProductDetail", { product });
  };

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };

  const handleRemoveAll = async () => {
    Alert.alert(
      "Remove All Items",
      "Are you sure you want to remove all items from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove All",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);
              await removeAllItems();
            } catch (error) {
              Alert.alert("Error", "Failed to remove items from cart");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const handleDeleteItem = async (productId: string) => {
    try {
      setIsDeleting(true);
      await removeItem(productId);
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item from cart');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      // Find the cart item to check stock
      const cartItem = cartItems.find(item => item.product._id === productId);
      if (!cartItem) {
        Alert.alert('Error', 'Item not found in cart');
        return;
      }

      // Check if requested quantity exceeds available stock
      if (quantity > cartItem.product.stock) {
        Alert.alert(
          'Stock Limit',
          `Only ${cartItem.product.stock} items available in stock`,
          [{ text: 'OK' }]
        );
        return;
      }

      await updateQuantity(productId, quantity);
    } catch (error) {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Shopping Cart" />
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Shopping Cart" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load cart items</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        title="Shopping Cart"
        rightIcon={
          cartItems.length > 0
            ? {
                name: isDeleting ? "delete-clock" : "delete",
                onPress: handleRemoveAll,
                color: "#F44336",
              }
            : undefined
        }
      />
      {cartItems.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onPress={() => handleItemPress(item.product)}
              onDelete={() => handleDeleteItem(item.product._id)}
              onUpdateQuantity={(quantity) => handleUpdateQuantity(item.product._id, quantity)}
              isUpdating={updatingItems.includes(item.product._id)}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {cartItems.length > 0 && (
        <CartFooter totalAmount={totalAmount} onCheckout={handleCheckout} />
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666666",
    marginTop: 16,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E6CEF",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: "#8E6CEF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  quantityLoader: {
    marginHorizontal: 12,
    minWidth: 24,
  },
  disabledButton: {
    opacity: 0.5,
  },
  deleteContainer: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
