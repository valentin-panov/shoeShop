/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Interfaces
import { SearchState } from '../../interfaces/Interfaces';

// Server
import { serverURL } from '../../App';

const initialState: SearchState = {
  searchString: '',
};

export const searchItems = createAsyncThunk('search/FetchingData', async (query: string) => {
  const request = await fetch(`${serverURL}items?q=<${query}>`);
  if (!request.ok) {
    throw new Error('Something went wrong');
  }
  const response = await request.json();
  return response;
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.searchString = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearch } = searchSlice.actions;
