import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './slices/navSlice.js'

export const store = configureStore({
  reducer: {
    nav: navigationReducer,
  },
})
