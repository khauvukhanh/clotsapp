import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackHeader from '../components/Headers/BackHeader';
import useCart from '../hooks/useCart';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createOrder, CreateOrderRequest, ShippingAddress } from '../services/orderService';

type PaymentMethod = 'credit_card' | 'paypal' | 'cash_on_delivery';

const CheckoutScreen = () => {
  const { cartItems, totalAmount, isLoading: isCartLoading, fetchCartItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States', // Default country
  });
  const [phoneError, setPhoneError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('credit_card');

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as XXX XXX XXXX
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formatted = match[1] + (match[2] ? ` ${match[2]}` : '') + (match[3] ? ` ${match[3]}` : '');
      return formatted;
    }
    return value;
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digit characters for validation
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length < 10) {
      setPhoneError('Phone number must be 10 digits');
      return false;
    }
    
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData(prev => ({
      ...prev,
      phone: formatted,
    }));
    validatePhoneNumber(formatted);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!validatePhoneNumber(formData.phone)) {
      return;
    }

    try {
      setIsSubmitting(true);

      const shippingAddress: ShippingAddress = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      };

      const orderData: CreateOrderRequest = {
        shippingAddress,
        paymentMethod: selectedPaymentMethod,
      };

      const response = await createOrder(orderData);
      
      Alert.alert(
        'Success',
        'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // TODO: Navigate to order confirmation screen or home screen
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderPaymentMethod = (method: PaymentMethod, label: string, icon: string) => (
    <TouchableOpacity
      style={[
        styles.paymentMethod,
        selectedPaymentMethod === method && styles.selectedPaymentMethod,
      ]}
      onPress={() => setSelectedPaymentMethod(method)}
    >
      <View style={styles.paymentMethodContent}>
        <Icon
          name={icon}
          size={24}
          color={selectedPaymentMethod === method ? '#8E6CEF' : '#666'}
        />
        <Text
          style={[
            styles.paymentMethodText,
            selectedPaymentMethod === method && styles.selectedPaymentMethodText,
          ]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.radioButton,
          selectedPaymentMethod === method && styles.selectedRadioButton,
        ]}
      >
        {selectedPaymentMethod === method && (
          <View style={styles.radioButtonInner} />
        )}
      </View>
    </TouchableOpacity>
  );

  if (isCartLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Checkout" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8E6CEF" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Checkout" />
      <KeyboardAwareScrollView extraScrollHeight={100} style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View>
            <TextInput
              style={[styles.input, phoneError ? styles.inputError : null]}
              placeholder="Phone Number * (XXX XXX XXXX)"
              value={formData.phone}
              onChangeText={handlePhoneChange}
              keyboardType="phone-pad"
              maxLength={12}
            />
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Street Address *"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="City *"
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="State *"
            value={formData.state}
            onChangeText={(value) => handleInputChange('state', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="ZIP Code *"
            value={formData.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {renderPaymentMethod('credit_card', 'Credit Card', 'credit-card')}
          {renderPaymentMethod('paypal', 'PayPal', 'paypal')}
          {renderPaymentMethod('cash_on_delivery', 'Cash on Delivery', 'cash')}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Icon name="check-circle" size={24} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Place Order</Text>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E6CEF',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 16,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#8E6CEF',
    borderRadius: 8,
    padding: 16,
    margin: 16,
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
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    borderColor: '#8E6CEF',
    backgroundColor: '#F8F5FF',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  selectedPaymentMethodText: {
    color: '#8E6CEF',
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#8E6CEF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8E6CEF',
  },
});

export default CheckoutScreen; 