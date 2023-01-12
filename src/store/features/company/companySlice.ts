import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import {CompanyStateType, CompanyType, NewCompanyType} from "../../../types";
import {data} from "../../../data";

const initialState: CompanyStateType = {companies: data};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<NewCompanyType>) => {
      state.companies.push({...action.payload,
        id: `${state.companies.length.toString()}-${action.payload.title}-${action.payload.address}`,
        employees: [], numberOfPeople: 0})
    },
    removeCompany: (state, action: PayloadAction<String[]>) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.companies = [...state.companies.filter(item => item.id !== action.payload[i])];
      }
    },
    editCompany: (state, action:PayloadAction<CompanyType>) => {
      console.log(action.payload)
      console.log('here')
      state.companies = [...state.companies.map(item =>  item.id === action.payload.id ? {...action.payload} : item)];
    }
  },
})

export const { addCompany, removeCompany, editCompany } = companiesSlice.actions

export const selectCount = (state: RootState) => state.companies

export default companiesSlice.reducer