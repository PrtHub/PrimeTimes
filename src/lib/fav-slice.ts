import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface Favorite {
  title: string
  description: string
  author: string
  url: string
  urlToImage: string
  publishedAt: string
}

interface FavState {
 favorites: Favorite[]
}

const initialState: FavState = {
 favorites: []
}

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      if (!state.favorites.some(fav => fav.url === action.payload.url)) {
        state.favorites.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
        state.favorites = state.favorites.filter(fav => fav.url !== action.payload)
    }
  },
})

export const { addFavorite, removeFavorite } = favSlice.actions

export const selectFavorites = (state: RootState) => state.fav.favorites

export default favSlice.reducer