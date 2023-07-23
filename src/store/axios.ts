import axios from 'axios';
import { BASE_API_URL } from './config';

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

axiosInstance.interceptors.response.use(response => response);

export default axiosInstance;
