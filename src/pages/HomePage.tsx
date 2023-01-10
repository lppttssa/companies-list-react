import React, {useEffect} from 'react';
import s from './HomePage.module.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCompany} from '../store/features/company/companySlice'

export const HomePage = ():JSX.Element => {
  const companies = useAppSelector((state) => state.companies.companies)
  const dispatch = useAppDispatch()
  
  return (
    <div className={s.homePage}>

    </div>
  );
};