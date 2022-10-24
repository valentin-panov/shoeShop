/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ICard, IInitialStateTopSales } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

const initialState: IInitialStateTopSales = {
  status: 'idle',
  error: '',
  topSales: [],
};

export const asyncFetchData = createAsyncThunk('topSales/FetchingData', async () => {
  const response = await fetch(`${serverURL}top-sales`);
  if (!response.ok) {
    throw new Error('request error');
  }
  const items = await response.json();
  return items;
});

const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncFetchData.fulfilled, (state, action: PayloadAction<ICard[]>) => {
      state.topSales = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(asyncFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export default topSalesSlice.reducer;
