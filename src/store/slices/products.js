import { createSlice } from '@reduxjs/toolkit';
import {
  createBusinessCategory,
  createBusinessProduct,
  deleteBusinessCategory,
  deleteBusinessProduct,
  getBusinessCategories,
  getBusinessProduct,
  updateBusinessCategory,
  updateBusinessProduct,
} from '../api';
import { Alert } from 'react-native';
import { refreshTokenFn, setTokenInstance } from '../axios';

const initialState = {
  isLoading: false,
  products: null,
  categories: null,
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
    setCurrentCategories(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
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
    deleteOneProduct(state, action) {
      state.isLoading = false;
      state.products = state.products.filter(
        item => item._id !== action.payload,
      );
    },
    addOneCategory(state, action) {
      state.isLoading = false;
      state.categories = [...state.categories, action.payload];
    },
    replaceOneCategory(state, action) {
      state.isLoading = false;
      state.categories = [
        ...state.categories.map(item =>
          item._id === action.payload._id ? action.payload : item,
        ),
      ];
    },
    deleteOneCategory(state, action) {
      state.isLoading = false;
      state.categories = state.categories.filter(
        item => item._id !== action.payload,
      );
    },
  },
});

export default slice.reducer;

export const getCategoriesList =
  (data, onSuccess, onError) => async dispatch => {
    dispatch(slice.actions.setLoading());

    getBusinessCategories(data)
      .then(res => {
        dispatch(slice.actions.setCurrentCategories(res.data.data));
      })
      .then(onSuccess)
      .catch(error => console.log(error.response));
  };
export const createCategory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  createBusinessCategory(data)
    .then(async res => {
      const response = await res.json();
      dispatch(slice.actions.addOneCategory(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          createBusinessCategory(data)
            .then(async res => {
              const response = await res.json();
              dispatch(slice.actions.addOneCategory(response.data));
            })
            .then(onSuccess);
        }
      }
    });
};

export const updateCategory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessCategory(data)
    .then(async res => {
      const response = await res.json();
      dispatch(slice.actions.replaceOneCategory(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          updateBusinessCategory(data)
            .then(async res => {
              const response = await res.json();
              dispatch(slice.actions.replaceOneCategory(response.data));
            })
            .then(onSuccess);
        }
      }
    });
};

export const deleteCategory = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessCategory(data)
    .then(res => {
      dispatch(slice.actions.deleteOneCategory(data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};

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
      dispatch(slice.actions.addOneProduct(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          createBusinessProduct(data)
            .then(async res => {
              const response = await res.json();
              dispatch(slice.actions.addOneProduct(response.data));
            })
            .then(onSuccess);
        }
      }
    });
};

export const updateProducts = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  updateBusinessProduct(data)
    .then(async res => {
      const response = await res.json();
      dispatch(slice.actions.replaceOneProduct(response.data));
    })
    .then(onSuccess)
    .catch(async error => {
      console.log(error);
      if (error.code === 'INVALID_TOKEN') {
        const result = await refreshTokenFn();
        if (result) {
          setTokenInstance(result);

          updateBusinessProduct(data)
            .then(async res => {
              const response = await res.json();
              dispatch(slice.actions.replaceOneProduct(response.data));
            })
            .then(onSuccess);
        }
      }
    });
};

export const deleteProduct = (data, onSuccess, onError) => async dispatch => {
  dispatch(slice.actions.setLoading());
  deleteBusinessProduct(data)
    .then(res => {
      dispatch(slice.actions.deleteOneProduct(data));
    })
    .then(onSuccess)
    .catch(error => console.log(error));
};
