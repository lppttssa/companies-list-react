import React, {useEffect} from 'react';
import s from './HomePage.module.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCompany, removeCompany} from '../store/features/company/companySlice'
import {Table} from "../components/Table/Table";
import {companiesTableTitles} from "../data";
import cn from 'classnames'


export const HomePage = ():JSX.Element => {
  const companies = useAppSelector((state) => state.companies.companies)
  const dispatch = useAppDispatch()

  return (
    <div className={cn('container', s.homePage)}>
      <Table
        tableTitle='Сотрудники'
        tableColumnTitles={companiesTableTitles}
        tableData={companies}
        removeItem={(id: string[]) => dispatch(removeCompany(id))}
      />
    </div>
  );
};