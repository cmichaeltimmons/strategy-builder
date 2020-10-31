import { configureStore, createReducer } from '@reduxjs/toolkit'

const rangeReducer = createReducer({hero:[],villian:[]}, {
    HERO_RANGE: (state, action) => {
      // "mutate" the array by calling push()
      state.hero = action.payload
    },
    VILLIAN_RANGE: (state, action) => {
        state.villian = action.payload
    }
  })

const store = configureStore({
  reducer: rangeReducer
})

export default store