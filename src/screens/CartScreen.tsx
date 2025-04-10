import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BackHeader from "../components/Headers/BackHeader";
import useCart from "../hooks/useCart";
import { RootStackParamList } from "../types/navigation";
import { Product } from "../types/product";

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
    category: {
      _id: string;
      name: string;
    };
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
}: {
  item: CartItem;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <FastImage
      source={{ uri: item.product.thumbnail }}
      style={styles.productImage}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={styles.itemInfo}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

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
  } = useCart();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleItemPress = (product: Product) => {
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
  quantity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
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
  disabledButton: {
    opacity: 0.5,
  },
});

export default CartScreen;
