import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { caterogyApi } from './caterogy/caterogyApi'
import { moviesApi } from './movie/moviesApi'


export const store = configureStore({
  reducer: {
    [caterogyApi.reducerPath]: caterogyApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(caterogyApi.middleware,moviesApi.middleware),
})

setupListeners(store.dispatch)