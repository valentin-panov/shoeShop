/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { ICard, IInitialStateCatalog } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

const initialState: IInitialStateCatalog = {
  status: 'idle',
  error: '',
  catalog: [],
  haveMore: true,
  category: 0,
};

export type Params = { count?: string; category?: number; searchString?: string };

export const asyncFetchData = createAsyncThunk('catalog/FetchingData', async (params?: Params) => {
  const reqParams = new URLSearchParams(window.location.search);
  if (params && params.category) {
    reqParams.set('categoryId', `${params.category}`);
  }
  if (params && params.searchString) {
    reqParams.set('q', `${params.searchString}`);
  }
  const urlParamsAll = reqParams.toString();

  const reqURL = `${serverURL}items${urlParamsAll ? `?${urlParamsAll}` : ''}`;
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  const items = await response.json();
  return items;
});

export const asyncFetchMore = createAsyncThunk('catalog/FetchingMoreData', async (params?: Params) => {
  const reqParams = new URLSearchParams(window.location.search);
  if (params && params.category) {
    reqParams.set('categoryId', `${params.category}`);
  }
  if (params && params.count) {
    reqParams.set('offset', `${params.count}`);
  }
  if (params && params.searchString) {
    reqParams.set('q', `${params.searchString}`);
  }
  const urlParamsAll = reqParams.toString();

  const reqURL = `${serverURL}items${urlParamsAll ? `?${urlParamsAll}` : ''}`;

  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  const items = await response.json();
  return items;
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFetchMore.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncFetchMore.fulfilled, (state, action: PayloadAction<ICard[]>) => {
      state.haveMore = !(action.payload.length < 6);
      state.catalog.push(...action.payload);
      state.status = 'success';
    });
    builder.addCase(asyncFetchMore.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
    builder.addCase(asyncFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(asyncFetchData.fulfilled, (state, action: PayloadAction<ICard[]>) => {
      state.haveMore = !(action.payload.length < 6);
      state.catalog = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(asyncFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export default catalogSlice.reducer;
export const { setCategory } = catalogSlice.actions;
