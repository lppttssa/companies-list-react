import { configureStore } from '@reduxjs/toolkit'
import {companiesSlice} from "./features/company/companySlice";


export const store = configureStore({
  reducer: {
    companies: companiesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
