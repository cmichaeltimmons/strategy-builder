import { configureStore, createReducer } from "@reduxjs/toolkit";

//action types
export const HERO_RANGE = "HERO_RANGE";
export const VILLIAN_RANGE = "VILLIAN_RANGE";
export const EQUITIES_RETURNED = "EQUITIES_RETURNED";

const rangeReducer = createReducer(
  { hero: [], villian: [], equities: { hero: null, villian: null } },
  {
    HERO_RANGE: (state, action) => {
      state.hero = action.payload;
    },
    VILLIAN_RANGE: (state, action) => {
      state.villian = action.payload;
    },
    EQUITIES_RETURNED: (state, action) => {
      state.equities.hero = action.payload.hero;
      state.equities.villian = action.payload.villian;
    },
  }
);

const store = configureStore({
  reducer: rangeReducer,
});

export default store;
