/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { Categories, Category } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

const initialState: Categories = {
  status: 'idle',
  error: '',
  categories: [],
};

export const asyncFetchData = createAsyncThunk('categories/FetchingData', async () => {
  const response = await fetch(`${serverURL}categories `);
  if (!response.ok) {
    throw new Error('request error');
  }
  const items = await response.json();
  return items;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncFetchData.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.categories = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(asyncFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export default categoriesSlice.reducer;
