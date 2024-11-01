import { createSlice } from '@reduxjs/toolkit';

interface State {
  isSideNavOpen: boolean;
}

const initialState: State = {
  isSideNavOpen: true,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleSideNav: (state: State) => ({
      ...state,
      isSideNavOpen: !state.isSideNavOpen,
    }),
    openSideNav: (state: State) => ({
      ...state,
      isSideNavOpen: true,
    }),
    closeSideNav: (state: State) => ({
      ...state,
      isSideNavOpen: false,
    }),
  },
});

export const { toggleSideNav, openSideNav, closeSideNav } = navigationSlice.actions;

export const getIsSideNavOpen = (state: { navigation: State }) => {
  return state.navigation.isSideNavOpen;
};

export default navigationSlice.reducer;
