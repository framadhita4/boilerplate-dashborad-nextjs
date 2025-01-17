'use client';

import type React from 'react';
import { useRef } from 'react';

import { Provider } from 'react-redux';

import { type AppStore, makeStore } from './store';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
