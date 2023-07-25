import { createSlice } from '@reduxjs/toolkit';
import {
  createOwnBusiness,
  deleteOwnBusiness,
  loginOwnBusiness,
  signIn,
  signUp,
  updateOwnBusiness,
} from '../api';

const initialState = {
  isLoading: false,
  business: null,
  currentBusiness: null,
};

const slice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },
    setBusinessListSuccess(state, action) {
      state.isLoading = false;
      state.business = action.payload;
    },
    setCurrentBusiness(state, action) {
      state.isLoading = false;
      state.currentBusiness = action.payload;
    },
    addBusiness(state, action) {
      state.isLoading = false;
      state.business = action.payload;
    },
  },
});

export default slice.reducer;

export const createBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createOwnBusiness(data)
    .then(res => {
      console.log(res);
      // dispatch(slice.actions.addBusiness(res.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

export const updateBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateOwnBusiness(data)
    .then(res => {
      console.log(res);
      // dispatch(slice.actions.addBusiness(res.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
export const loginBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  loginOwnBusiness(data)
    .then(res => {
      dispatch(slice.actions.setCurrentBusiness(res.data.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error.response.data));
};
export const deleteBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteOwnBusiness(data)
    .then(res => {
      console.log(res);
      // dispatch(slice.actions.addBusiness(res.data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
