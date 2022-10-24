// Core
import { configureStore, Middleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// RootReducer
import { rootReducer } from '../reducers';

const Logger: Middleware = (store) => (next) => (action) => {
  // eslint-disable-next-line no-console
  console.log('dispatching', action);
  // eslint-disable-next-line no-console
  console.log('prev_state', store.getState());
  const result = next(action);
  // eslint-disable-next-line no-console
  console.log('next_state', store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, Logger),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
