import { setTokenInstance } from './../axios';
import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api';

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
            token: res.data.token,
            user: res.data.data,
          }),
        );
      })
      .then(onSuccess)
      .catch(error => console.log(error));
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
