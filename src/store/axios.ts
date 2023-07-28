import axios from 'axios';
import { BASE_API_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 20000,
});

export const setTokenInstance = (token: string) => {
  if (token) {
    const Token = `Bearer ${token}`;
    axiosInstance.defaults.headers.common.Authorization = Token;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const refreshTokenFn = async () => {
  const token = await AsyncStorage.getItem('refresh');

  try {
    const response = await axios.post(
      'http://185.36.188.161:3000/user-api/auth/refresh',
      {
        token: token,
      },
    );

    const { accessToken } = response.data;

    await AsyncStorage.setItem('token', accessToken);

    setTokenInstance(accessToken);

    return accessToken;
  } catch (error) {
    await AsyncStorage.setItem('refresh', '');
    await AsyncStorage.setItem('token', '');
    setTokenInstance('');
  }
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await refreshTokenFn();

      if (result) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axiosInstance(config);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
