import { createSlice } from '@reduxjs/toolkit';
import {
  createOwnBusiness,
  deleteOwnBusiness,
  loginOwnBusiness,
  signIn,
  signUp,
  updateOwnBusiness,
} from '../api';
import { getMe } from './auth';
import { refreshTokenFn, setTokenInstance } from '../axios';

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
      state.business = [...state.business, action.payload];
    },
    updateCurrentBusiness(state, action) {
      state.isLoading = false;
      state.currentBusiness = action.payload;
    },
  },
});

export default slice.reducer;

export const createBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createOwnBusiness(data)
    .then(res => {
      dispatch(getMe('', onSuccess));
    })
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          createOwnBusiness(data).then(async res => {
            dispatch(getMe('', onSuccess));
          });
        }
      }
    });
};

export const updateBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateOwnBusiness(data)
    .then(async res => {
      const response = await res.json();

      dispatch(slice.actions.updateCurrentBusiness(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          updateOwnBusiness(data)
            .then(async res => {
              const response = await res.json();

              dispatch(slice.actions.updateCurrentBusiness(response.data));
            })
            .then(onSuccess);
        }
      }
    });
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
      console.log('resss', res);
      dispatch(getMe());
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
