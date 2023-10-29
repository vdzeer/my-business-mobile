import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessOrder,
  deleteBusinessOrder,
  getBusinessOrders,
} from '../api';
import { Alert } from 'react-native';
import { authActions } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoading: false,
  orders: null,
  currentBasket: [],
};

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },
    clearBasket(state) {
      state.currentBasket = [];
    },
    setCurrentOrders(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },

    addOneProduct(state, action) {
      state.isLoading = false;
      state.orders = [...state.orders, action.payload];
    },
    replaceOneProduct(state, action) {
      state.isLoading = false;
      state.orders = [
        ...state.orders.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      ];
    },
    addItemToBasket: (state, action) => {
      const newItem = action.payload;
      const updatedBasket = state.currentBasket.map(item =>
        item.id === newItem.id
          ? { ...item, total: Number(item.total) + 1 }
          : item,
      );

      state.isLoading = false;
      state.currentBasket = updatedBasket.some(item => item.id === newItem.id)
        ? updatedBasket
        : [...state.currentBasket, newItem];
    },
    removeItemFromBasket: (state, action) => {
      const itemToRemove = action.payload;
      const existingItem = state.currentBasket.find(
        item => item.id === itemToRemove.id,
      );

      if (existingItem) {
        if (existingItem.total > 1) {
          const updatedBasket = state.currentBasket.map(item =>
            item.id === itemToRemove.id
              ? { ...item, total: item.total - 1 }
              : item,
          );
          state.currentBasket = updatedBasket;
        } else {
          state.currentBasket = state.currentBasket.filter(
            item => item.id !== itemToRemove.id,
          );
        }
      }
    },
  },
});

export default slice.reducer;

export const addToBasket = data => async dispatch => {
  dispatch(slice.actions.addItemToBasket(data));
};

export const removeFromBasket = data => async dispatch => {
  dispatch(slice.actions.removeItemFromBasket(data));
};

export const getOrdersList = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());

  getBusinessOrders(data)
    .then(res => {
      dispatch(slice.actions.setCurrentOrders(res.data.data));
    })
    .then(onSuccess)
    .catch(error => {
      onError(error?.response?.data?.code);
      console.log(error.response.data);
      if (error?.response?.status === 401) {
        AsyncStorage.setItem('refresh', '');
        AsyncStorage.setItem('token', '');
        dispatch(authActions.logoutSuccess());
      }
    });
};

export const createOrder = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessOrder(data)
    .then(res => {
      dispatch(slice.actions.clearBasket());
    })
    .then(onSuccess)
    .catch(error => {
      onError(error?.response?.data?.code);
      console.log(error.response.data);
      if (error?.response?.status === 401) {
        AsyncStorage.setItem('refresh', '');
        AsyncStorage.setItem('token', '');
        dispatch(authActions.logoutSuccess());
      }
    });
};

export const deleteOrder =
  (data, onSuccess, onError, businessId) => async dispatch => {
    dispatch(slice.actions.setLoading());
    deleteBusinessOrder(data, businessId)
      .then(res => {
        console.log(res);
        // dispatch(slice.actions.addBusiness(res.data));
      })
      .then(onSuccess)
      .catch(error => {
        onError(error?.response?.data?.code);
        console.log(error.response.data);
        if (error?.response?.status === 401) {
          AsyncStorage.setItem('refresh', '');
          AsyncStorage.setItem('token', '');
          dispatch(authActions.logoutSuccess());
        }
      });
  };
