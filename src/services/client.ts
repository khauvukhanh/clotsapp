import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://192.168.1.4:5000/api/';
const API_BASE_URL = 'https://backend-api-mb18.onrender.com/api/';

class ApiClient {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { status } = error.response;
          console.log('status', status, error.config.url);
          if (status === 401 && error.config.url !== 'auth/login') {
            Alert.alert('Thông báo', 'Vui lòng đăng nhập lại!', [
              { text: 'OK', onPress: () => this.navigateToLogin() },
            ]);
            return;
          } else {
            Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại!');
          }
        }
        return Promise.reject(new Error(error.response?.data?.message));
      }
    );
  }

  navigateToLogin() {
    AsyncStorage.removeItem('token');

  }

  get(url, params = {}) {
    return this.api.get(url, { params });
  }

  post(url, data) {
    return this.api.post(url, data);
  }

  put(url, data) {
    return this.api.put(url, data);
  }

  delete(url) {
    return this.api.delete(url);
  }
}

export default new ApiClient();