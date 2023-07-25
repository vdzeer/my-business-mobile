import { setTokenInstance } from './../axios';
import { createSlice } from '@reduxjs/toolkit';
import {
  getMeUser,
  signIn,
  signUp,
  updateMeUser,
  appleApi,
  forgot,
  googleApi,
  resetPasswordApi,
} from '../api';

const initialState = {
  isLoading: false,
  profile: null,

  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setLoadingFalse(state) {
      state.isLoading = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.profile = null;
      state.token = null;
    },

    clearAuthStore(state, action) {
      state.isLoading = false;
      state.profile = null;
      state.token = null;
    },
    updateProfile(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },
  },
});

export default slice.reducer;

export const login =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    signIn(data)
      .then(res => {
        console.log(res);
        dispatch(
          slice.actions.loginSuccess({
            token: res.data.accessToken,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const getMe =
  (data?: any, onSuccess?: any, onError?: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    getMeUser()
      .then(res => {
        console.log(res);
        dispatch(slice.actions.updateProfile(res.data.data));
      })
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const google =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    googleApi(data)
      .then(res => {
        console.log(res);
        dispatch(
          slice.actions.loginSuccess({
            token: res.data.accessToken,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const updateUser =
  (data?: any, onSuccess?: any, onError?: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    updateMeUser(data)
      .then(async res => {
        const response = await res.json();
        dispatch(slice.actions.updateProfile(response.data));
      })
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const apple =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    appleApi(data)
      .then(res => {
        console.log(res);
        dispatch(
          slice.actions.loginSuccess({
            token: res.data.accessToken,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const forgotPassword =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    forgot(data)
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const resetPassword =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    resetPasswordApi(data)
      .then(onSuccess)
      .catch(error => console.log(error.response.data));
  };

export const register =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());
    signUp(data)
      .then(res => {
        dispatch(
          slice.actions.loginSuccess({
            token: res.data.token,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error));
  };

export const logout = () => async (dispatch: any) => {
  dispatch(slice.actions.logoutSuccess());
};
