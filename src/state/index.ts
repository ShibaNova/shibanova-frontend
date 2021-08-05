import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
// import poolsReducer from './pools'

import application from './application/reducer'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import multicall from './multicall/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    // pools: poolsReducer,

    // Exchange
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
  },
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
