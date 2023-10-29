import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessPromocode,
  deleteBusinessPromocode,
  getBusinessPromocodes,
  updateBusinessPromocode,
} from '../api';
import { Alert } from 'react-native';
import { authActions } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoading: false,
  promocodes: null,
};

const slice = createSlice({
  name: 'promocodes',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },

    setCurrentPromocode(state, action) {
      state.isLoading = false;
      state.promocodes = action.payload;
    },
    addOnePromocode(state, action) {
      state.isLoading = false;
      state.promocodes = [...state.promocodes, action.payload];
    },
    replaceOnePromocode(state, action) {
      state.isLoading = false;
      state.promocodes = [
        ...state.promocodes.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      ];
    },
    deleteOnePromocode(state, action) {
      state.isLoading = false;
      state.promocodes = state.promocodes.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export default slice.reducer;

export const getPromocodesList =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(slice.actions.setLoading());

    getBusinessPromocodes(data)
      .then(res => {
        dispatch(slice.actions.setCurrentPromocode(res.data.data));
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

export const createPromocode = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessPromocode(data)
    .then(res => {
      dispatch(slice.actions.addOnePromocode(res.data.data));
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

export const updatePromocode = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessPromocode(data)
    .then(res => {
      dispatch(slice.actions.replaceOnePromocode(res.data.data));
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

export const deletePromocode =
  (data, onSuccess, onError, businessId) => async dispatch => {
    dispatch(slice.actions.setLoading());
    deleteBusinessPromocode(data, businessId)
      .then(res => {
        dispatch(slice.actions.deleteOnePromocode(data));
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
