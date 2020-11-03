import { configureStore, createReducer } from "@reduxjs/toolkit";

//action types
export const HERO_RANGE = "HERO_RANGE";
export const VILLIAN_RANGE = "VILLIAN_RANGE";

const rangeReducer = createReducer(
  { hero: [], villian: [] },
  {
    HERO_RANGE: (state, action) => {
      state.hero = action.payload;
    },
    VILLIAN_RANGE: (state, action) => {
      state.villian = action.payload;
    },
  }
);

const store = configureStore({
  reducer: rangeReducer,
});

export default store;
