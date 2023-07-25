import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessProduct,
  deleteBusinessProduct,
  getBusinessProduct,
  updateBusinessProduct,
} from '../api';
import { Alert } from 'react-native';

const initialState = {
  isLoading: false,
  products: null,
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },

    setCurrentProducts(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    addOneProduct(state, action) {
      state.isLoading = false;
      state.products = [...state.products, action.payload];
    },
    replaceOneProduct(state, action) {
      state.isLoading = false;
      state.products = [
        ...state.products.map(item =>
          item._id === action.payload._id ? action.payload : item,
        ),
      ];
    },
  },
});

export default slice.reducer;

export const getProductsList = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());

  getBusinessProduct(data)
    .then(res => {
      console.log(res.data.data);
      dispatch(slice.actions.setCurrentProducts(res.data.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error.response));
};

export const createProduct = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessProduct(data)
    .then(async res => {
      const response = await res.json();
      console.log(response);
      // dispatch(slice.actions.addOneProduct(response.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

export const updateProducts = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessProduct(data)
    .then(async res => {
      const response = await res.json();
      console.log(response);
      // dispatch(slice.actions.replaceOneInventory(response.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

export const deleteProduct = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessProduct(data)
    .then(res => {
      console.log(res);
      // dispatch(slice.actions.addBusiness(res.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
