import { configureStore } from '@reduxjs/toolkit';

import { combineReducers, createStore } from 'redux';
import productModalReducer from './product-modal/productModalSlice';

import cartItemsReducer from './shopping-cart/cartItemsSlide';
import snackbarReducer from './ducks/snackbar';
import authenticateReducer from './ducks/auth';

// export const store = configureStore({
//   reducer: {
//     productModal: productModalReducer,
//     cartItems: cartItemsReducer,
//   },
// });

const reducer = combineReducers({
  snackbar: snackbarReducer,
  authenticate: authenticateReducer,
  productModal: productModalReducer,
  cartItems: cartItemsReducer,
});

const store = createStore(reducer, {});

export default store;
