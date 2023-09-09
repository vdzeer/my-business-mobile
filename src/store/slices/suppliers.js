import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessSupplier,
  deleteBusinessSupplier,
  getBusinessSuppliers,
  updateBusinessSupplier,
} from '../api';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authActions } from './auth';

const initialState = {
  isLoading: false,
  suppliers: null,
};

const slice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },

    setCurrentSuppliers(state, action) {
      state.isLoading = false;
      state.suppliers = action.payload;
    },
    addOneSupplier(state, action) {
      state.isLoading = false;
      state.suppliers = [...state.suppliers, action.payload];
    },
    replaceOneSupplier(state, action) {
      state.isLoading = false;
      state.suppliers = [
        ...state.suppliers.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      ];
    },
    deleteOneSupplier(state, action) {
      state.isLoading = false;
      state.suppliers = state.suppliers.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export default slice.reducer;

export const getSuppliersList =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(slice.actions.setLoading());

    getBusinessSuppliers(data)
      .then(res => {
        dispatch(slice.actions.setCurrentSuppliers(res.data.data));
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

export const createSupplier = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessSupplier(data)
    .then(res => {
      dispatch(slice.actions.addOneSupplier(res.data.data));
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

export const updateSupplier = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessSupplier(data)
    .then(res => {
      dispatch(slice.actions.replaceOneSupplier(res.data.data));
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

export const deleteSupplier = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessSupplier(data)
    .then(res => {
      dispatch(slice.actions.deleteOneSupplier(data));
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
