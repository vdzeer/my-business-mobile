import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessInventory,
  deleteBusinessInventory,
  getBusinessInventory,
  updateBusinessInventory,
} from '../api';
import { Alert } from 'react-native';
import { refreshTokenFn, setTokenInstance } from '../axios';
import { authActions } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoading: false,
  inventory: null,
};

const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },

    setCurrentInventory(state, action) {
      state.isLoading = false;
      state.inventory = action.payload;
    },
    addOneInventory(state, action) {
      state.isLoading = false;
      state.inventory = [...state.inventory, action.payload];
    },
    replaceOneInventory(state, action) {
      state.isLoading = false;
      state.inventory = [
        ...state.inventory.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      ];
    },
    deleteOneInventory(state, action) {
      state.isLoading = false;
      state.inventory = state.inventory.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export default slice.reducer;

export const getInventoryList =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(slice.actions.setLoading());

    getBusinessInventory(data)
      .then(res => {
        dispatch(slice.actions.setCurrentInventory(res.data.data));
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

export const createInventory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessInventory(data)
    .then(async res => {
      const response = await res.json();
      dispatch(slice.actions.addOneInventory(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        try {
          const result = await refreshTokenFn();
          if (result) {
            setTokenInstance(result);

            createBusinessInventory(data)
              .then(async res => {
                const response = await res.json();
                dispatch(slice.actions.addOneInventory(response.data));
              })
              .then(onSuccess);
          }
        } catch (error) {
          onError(error?.response?.data?.code);
          console.log(error.response.data);
          if (error?.response?.status === 401) {
            AsyncStorage.setItem('refresh', '');
            AsyncStorage.setItem('token', '');
            dispatch(authActions.logoutSuccess());
          }
        }
      }
    });
};

export const updateInventory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessInventory(data)
    .then(async res => {
      const response = await res.json();
      dispatch(slice.actions.replaceOneInventory(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        try {
          const result = await refreshTokenFn();
          if (result) {
            setTokenInstance(result);

            updateBusinessInventory(data)
              .then(async res => {
                const response = await res.json();
                dispatch(slice.actions.replaceOneInventory(response.data));
              })
              .then(onSuccess);
          }
        } catch (error) {
          onError(error?.response?.data?.code);
          console.log(error.response.data);
          if (error?.response?.status === 401) {
            AsyncStorage.setItem('refresh', '');
            AsyncStorage.setItem('token', '');
            dispatch(authActions.logoutSuccess());
          }
        }
      }
    });
};

export const deleteInventory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessInventory(data)
    .then(res => {
      dispatch(slice.actions.deleteOneInventory(data));
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
