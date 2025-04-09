import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ApiClient from '../services/client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = async () => {
    // handle account creation logic here
    console.log({ firstname, lastname, email, password });
    if (!firstname || !lastname || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await ApiClient.post('auth/register', {
        name: `${firstname} ${lastname}`,
        email,
        password,
      });
      if (response.data.token) {
        Alert.alert('Success', 'Account created successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          }
        ]);
      }
    } catch (error: any) {
      console.info(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      <KeyboardAwareScrollView style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your first name" 
            value={firstname}
            onChangeText={setFirstname}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your last name" 
            value={lastname}
            onChangeText={setLastname}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your email" 
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your password" 
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.linkText}>Sign In</Text>
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  formContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 56,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#8E6CEF',
    height: 56,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666666',
  },
  linkText: {
    color: '#8E6CEF',
    fontWeight: '600',
  },
});

export default SignUpScreen;