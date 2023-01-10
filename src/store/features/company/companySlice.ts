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
  },
})

export const { addCompany } = companiesSlice.actions

export const selectCount = (state: RootState) => state.companies

export default companiesSlice.reducer