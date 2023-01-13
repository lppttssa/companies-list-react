import React, {useEffect, useState} from 'react';
import s from './HomePage.module.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCompany, removeCompany, editCompany,
  removeEmployee, addEmployee, editEmployee} from '../store/features/company/companySlice'
import {Table} from "../components/Table/Table";
import {companiesTableTitles, employeesTableTitles} from "../data";
import cn from 'classnames'
import {CompanyType, EmployeeType, NewEmployeeType} from "../types";
import AddCompany from "../components/ui/Modal/ModalContent/AddContent/AddCompany";
import AddEmployee from "../components/ui/Modal/ModalContent/AddContent/AddEmployee";


export const HomePage = ():JSX.Element => {
  const companies = useAppSelector((state) => state.companies.companies);
  const dispatch = useAppDispatch();
  const [isCompanyModalShown, setCompanyModalShown] = useState(false);
  const [isEmployeeModalShown, setEmployeeModalShown] = useState(false);
  const [chosenCompany, setChosenCompany] = useState('');

  const handleCompanyAdd = (item: any) => {
    setCompanyModalShown(false);
    dispatch(addCompany(item));
  }

  const handleEmployeeAdd = (item: NewEmployeeType) => {
    setEmployeeModalShown(false);
    dispatch(addEmployee({companyId: chosenCompany, employee: item}))
  }

  return (
    <div className={cn('container', s.homePage)}>
      <Table
        tableTitle='Компании'
        tableVariant='companies'
        tableColumnTitles={companiesTableTitles}
        tableData={companies}
        removeItem={(id: string[]) => dispatch(removeCompany(id))}
        modalInner={<AddCompany onClick={handleCompanyAdd}/>}
        isModalShown={isCompanyModalShown}
        setModalShown={setCompanyModalShown}
        setChosenCompany={setChosenCompany}
        editItem={(item: CompanyType) => dispatch(editCompany(item))}
        className={s.firstTable}
      />
      <Table
        tableTitle='Сотрудники'
        tableVariant='employees'
        tableColumnTitles={employeesTableTitles}
        tableData={companies.find(item => item.id === chosenCompany)?.employees || []}
        removeItem={(id: string[]) => dispatch(removeEmployee({companyId: chosenCompany, employees: id}))}
        modalInner={<AddEmployee onClick={handleEmployeeAdd} />}
        isModalShown={isEmployeeModalShown}
        setModalShown={setEmployeeModalShown}
        editItem={(item: EmployeeType) => dispatch(editEmployee({companyId: chosenCompany, employee: item}))}
        className={s.secondTable}
        isCompanyChosen={!!chosenCompany?.length}
      />
    </div>
  );
};