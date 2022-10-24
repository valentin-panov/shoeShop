/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ICard, ProductCard } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

const initialState: ProductCard = {
  status: 'idle',
  error: '',
  item: {
    id: 0,
    category: 0,
    title: '',
    images: [''],
    sku: '',
    manufacturer: '',
    color: '',
    material: '',
    reason: '',
    season: '',
    heelSize: '',
    price: 0,
    sizes: [{ size: '', avalible: false }],
  },
};

export const asyncFetchProductCard = createAsyncThunk('productCard/FetchingData', async (id: number) => {
  const response = await fetch(`${serverURL}items/${id}`);
  if (!response.ok) {
    throw new Error('request error');
  }
  const items = await response.json();
  return items;
});

const productCardSlice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncFetchProductCard.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncFetchProductCard.fulfilled, (state, action: PayloadAction<ICard>) => {
      state.item = action.payload;
      state.status = 'success';
    });
    builder.addCase(asyncFetchProductCard.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export default productCardSlice.reducer;
