import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import {CompanyStateType, CompanyType} from "../../../types";
import {data} from "../../../data";

const initialState: CompanyStateType = {companies: data};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<CompanyType>) => {
      state.companies.push(action.payload)

    },
    removeCompany: (state, action: PayloadAction<String[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.companies = [...state.companies.filter(item => item.id !== action.payload[i])];
      }
    }
  },
})

export const { addCompany, removeCompany } = companiesSlice.actions

export const selectCount = (state: RootState) => state.companies

export default companiesSlice.reducer