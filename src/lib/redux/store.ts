/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import navigation from './slice/navigation';

const rootReducer = combineReducers({
  navigation,
});

export const makeStore = () => configureStore({ reducer: rootReducer });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
