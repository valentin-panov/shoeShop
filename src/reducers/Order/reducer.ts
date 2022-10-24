/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Interfaces
import { IOrder, Order } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

// Initial state
const initialState: IOrder = {
  status: 'idle',
  error: '',
  order: {
    owner: { phone: '', address: '' },
    items: [],
  },
};

export const asyncPostOrder = createAsyncThunk('cart/PostOrder', async (order: Order) => {
  const response = await fetch(`${serverURL}order`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('request error');
  }
});

const postOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setIdle(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncPostOrder.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncPostOrder.fulfilled, (state) => {
      state.status = 'success';
    });
    builder.addCase(asyncPostOrder.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export default postOrderSlice.reducer;
export const { setIdle } = postOrderSlice.actions;
