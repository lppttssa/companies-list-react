import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import {CompanyStateType, CompanyType, EmployeeType, NewCompanyType, NewEmployeeType} from "../../../types";
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
      state.companies = [...state.companies.map(item =>  item.id === action.payload.id ? {...action.payload} : item)];
    },
    addEmployee: (state, action:PayloadAction<{companyId: string, employee: NewEmployeeType}>) => {
      const employee = {...action.payload.employee};
      state.companies = state.companies.map(item => {
        if (item.id === action.payload.companyId) {
          return {...item, numberOfPeople: item.numberOfPeople + 1, employees: [...item.employees,
            {...employee, id: `${employee.surname}-${employee.position}`}]};
        }
        return item
      })
    },
    removeEmployee: (state, action: PayloadAction<{companyId: string, employees: String[]}>) => {
      const newState = [...state.companies];
      const companyIndex = newState.findIndex(item => item.id === action.payload.companyId);
      for (let i = 0; i < action.payload.employees.length; i++) {
        const newEmployees =
          [...newState[companyIndex].employees.filter((item) => item.id !== action.payload.employees[i])]
          newState[companyIndex] = {...newState[companyIndex], employees: [...newEmployees],
          numberOfPeople: newEmployees.length};
      }
      state.companies = [...newState];
    },
    editEmployee: (state, action: PayloadAction<{companyId: string, employee: EmployeeType}>) => {
      const newState = [...state.companies];
      const companyIndex = newState.findIndex(item => item.id === action.payload.companyId);
      newState[companyIndex].employees = [...newState[companyIndex].employees
        .map(item => item.id === action.payload.employee.id ? action.payload.employee : item)];
      console.log('newState', newState)
      state.companies = [...newState];
    },
  },
})

export const { addCompany, removeCompany, editCompany, removeEmployee, addEmployee, editEmployee } = companiesSlice.actions

export const selectCount = (state: RootState) => state.companies

export default companiesSlice.reducer