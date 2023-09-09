import { refreshTokenFn, setTokenInstance } from './../axios';
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getMeUser,
  signIn,
  signUp,
  updateMeUser,
  appleApi,
  forgot,
  googleApi,
  resetPasswordApi,
  subscriptionApi,
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
    },
    updateProfile(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },
  },
});

export const authActions = slice.actions;

export default slice.reducer;

export const login =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    signIn(data)
      .then(res => {
        AsyncStorage.setItem('refresh', res.data.refreshToken);
        AsyncStorage.setItem('token', res.data.accessToken);

        dispatch(
          slice.actions.loginSuccess({
            user: res.data.data,
            token: res.data.accessToken,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error.response));
  };

export const getMe =
  (data?: any, onSuccess?: any, onError?: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    getMeUser()
      .then(res => {
        dispatch(slice.actions.updateProfile(res.data.data));
      })
      .then(onSuccess)
      .catch(error => {
        if (error?.response?.status === 401) {
          AsyncStorage.setItem('refresh', '');
          AsyncStorage.setItem('token', '');
          dispatch(slice.actions.logoutSuccess());
        }
      });
  };

export const google =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    googleApi(data)
      .then(res => {
        AsyncStorage.setItem('refresh', res.data.refreshToken);
        AsyncStorage.setItem('token', res.data.accessToken);

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
      .catch(async error => {
        if (error.code === 'INVALID_TOKEN') {
          try {
            const result = await refreshTokenFn();
            if (result) {
              setTokenInstance(result);

              updateMeUser(data).then(async res => {
                const response = await res.json();
                dispatch(slice.actions.updateProfile(response.data));
              });
            }
          } catch (error: any) {
            if (error?.response?.status === 401) {
              AsyncStorage.setItem('refresh', '');
              AsyncStorage.setItem('token', '');
              dispatch(slice.actions.logoutSuccess());
            }
          }
        }
      });
  };

export const apple =
  (data: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    appleApi(data)
      .then(res => {
        AsyncStorage.setItem('refresh', res.data.refreshToken);
        AsyncStorage.setItem('token', res.data.accessToken);

        dispatch(
          slice.actions.loginSuccess({
            token: res.data.accessToken,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error));
  };

export const updateSubscription =
  (id: string, onSuccess: any, onError: any) => async (dispatch: any) => {
    dispatch(slice.actions.setLoading());

    subscriptionApi(id)
      .then(res => {
        if (res) {
          getMeUser()
            .then(res => {
              dispatch(slice.actions.updateProfile(res.data.data));
            })
            .then(onSuccess)
            .catch(error => console.log(error.response.data));
        }
      })
      .then(onSuccess)
      .catch(error => {
        if (error?.response?.status === 401) {
          AsyncStorage.setItem('refresh', '');
          AsyncStorage.setItem('token', '');
          dispatch(slice.actions.logoutSuccess());
        }
      });
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
  AsyncStorage.setItem('refresh', '');
  AsyncStorage.setItem('token', '');

  dispatch(slice.actions.logoutSuccess());
};
