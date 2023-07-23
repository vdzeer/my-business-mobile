import { combineReducers, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './slices/auth';
import businessReducer from './slices/business';
import inventoryReducer from './slices/inventory';
import productsReducer from './slices/products';
import suppliersReducer from './slices/suppliers';
import ordersReducer from './slices/orders';
import promocodeReducer from './slices/promocodes';

import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'com.vdzeer.mybusinessplus',
  storage: AsyncStorage,
  blacklist: ['orders'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  business: businessReducer,
  inventory: inventoryReducer,
  products: productsReducer,
  suppliers: suppliersReducer,
  orders: ordersReducer,
  promocode: promocodeReducer,
});

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk),
);
export const persistor = persistStore(store);
