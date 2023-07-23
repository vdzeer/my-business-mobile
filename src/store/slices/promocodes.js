import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessPromocode,
  deleteBusinessPromocode,
  getBusinessPromocodes,
  updateBusinessPromocode,
} from '../api';
import { Alert } from 'react-native';

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
          item._id === action.payload._id ? action.payload : item,
        ),
      ];
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
      .catch(error => console.log(error.response));
  };

export const createPromocode = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessPromocode(data)
    .then(res => {
      dispatch(slice.actions.addOnePromocode(res.data.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

export const updatePromocode = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessPromocode(data)
    .then(res => {
      // dispatch(slice.actions.replaceOneSupplier(response.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

export const deletePromocode = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessPromocode(data)
    .then(res => {
      console.log(res);
      // dispatch(slice.actions.addSupplier(res.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
