import { createSlice } from '@reduxjs/toolkit';
import {
  addUserForBusiness,
  checkPromo,
  createOwnBusiness,
  deleteOwnBusiness,
  deleteUserForBusiness,
  inviteUserForBusiness,
  loginOwnBusiness,
  signIn,
  signUp,
  updateOwnBusiness,
} from '../api';
import { authActions, getMe } from './auth';
import { refreshTokenFn, setTokenInstance } from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    addWorker(state, action) {
      const newWorker = action.payload;
      state.isLoading = false;
      state.currentBusiness.workers.push(action.payload);
    },
    removeWorkerById(state, action) {
      const workerIdToRemove = action.payload;
      state.isLoading = false;
      state.currentBusiness.workers = state.currentBusiness.workers.filter(
        worker => worker.email !== workerIdToRemove,
      );
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
        try {
          const result = await refreshTokenFn();
          if (result) {
            setTokenInstance(result);

            createOwnBusiness(data).then(async res => {
              dispatch(getMe('', onSuccess));
            });
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

export const addUser = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  addUserForBusiness(data)
    .then(res => {
      dispatch(slice.actions.addWorker(res.data.data));

      // dispatch(getMe('', onSuccess));
    })
    .catch(async error => {
      onError(error?.response?.data?.code);
      console.log(error.response.data);

      if (error.response.data.code === 'USER_ALREADY_EXIST') {
        delete data.name;
        inviteUserForBusiness(data).then(response => {
          dispatch(slice.actions.addWorker(response.data.data));
        });
      }

      if (error?.response?.status === 401) {
        AsyncStorage.setItem('refresh', '');
        AsyncStorage.setItem('token', '');
        dispatch(authActions.logoutSuccess());
      }
    });
};

export const deleteUser = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());

  deleteUserForBusiness(data)
    .then(res => {
      // console.log(res.data);
      dispatch(slice.actions.removeWorkerById(data?.email));
    })
    .catch(async error => {
      onError(error?.response?.data?.code);
      console.log(error.response.data);

      if (error?.response?.status === 401) {
        AsyncStorage.setItem('refresh', '');
        AsyncStorage.setItem('token', '');
        dispatch(authActions.logoutSuccess());
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
        try {
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
export const loginBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  loginOwnBusiness(data)
    .then(res => {
      dispatch(slice.actions.setCurrentBusiness(res.data.data));
    })
    .then(onSuccess)
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      onError(error?.response?.data?.code);
      console.log(error.response.data);

      if (error?.response?.status === 401) {
        AsyncStorage.setItem('refresh', '');
        AsyncStorage.setItem('token', '');
        dispatch(authActions.logoutSuccess());
      }
    });
};

export const checkValidPromocode =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(slice.actions.setLoading());
    checkPromo(data)
      .then(res => {
        // console.log(res.data.data);
        res.data.data === null ? onError() : onSuccess(res.data.data);
      })
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
export const deleteBusiness = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteOwnBusiness(data)
    .then(res => {
      console.log('resss', res);
      dispatch(getMe());
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
