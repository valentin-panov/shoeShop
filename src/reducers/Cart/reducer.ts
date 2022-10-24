/* eslint-disable no-param-reassign */

// Core
import { createSlice } from '@reduxjs/toolkit';

// Interfaces
import { Cart } from '../../interfaces/Interfaces';

const temp = localStorage.getItem('cartState');
const initialState: Cart = temp
  ? JSON.parse(temp)
  : {
      items: [],
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const haveEntry = state.items.findIndex(
        (item) => item.item.id === action.payload.item.id && item.size === action.payload.size
      );
      if (haveEntry === -1) {
        state.items.push({ ...action.payload });
      } else {
        state.items[haveEntry].quantity += action.payload.quantity;
      }
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    removeItem(state, action) {
      state.items.splice(action.payload, 1);
      localStorage.setItem('cartState', JSON.stringify(state));
    },
    clearCart(state) {
      state.items = [];
      localStorage.clear();
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
