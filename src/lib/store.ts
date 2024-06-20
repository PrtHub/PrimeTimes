import { configureStore } from '@reduxjs/toolkit'
import favReducer from './fav-slice'

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
