import React, {useEffect, useState} from 'react';
import s from './HomePage.module.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCompany, removeCompany, editCompany,
  removeEmployee, addEmployee, editEmployee} from '../store/features/company/companySlice'
import {Table} from "../components/Table/Table";
import {companiesTableTitles, employeesTableTitles} from "../data";
import cn from 'classnames'
import {CompanyType, EmployeeType, NewCompanyType, NewEmployeeType} from "../types";
import AddCompany from "../components/ui/Modal/ModalContent/AddContent/AddCompany";
import AddEmployee from "../components/ui/Modal/ModalContent/AddContent/AddEmployee";
import {Loader} from "../components/ui/Loader/Loader";
import {useInfiniteScroll} from "../hooks";

const ITEMS_PER_PAGE = 10;

export const HomePage = ():JSX.Element => {
  const companies = useAppSelector((state) => state.companies.companies);
  const dispatch = useAppDispatch();
  const [isCompanyModalShown, setCompanyModalShown] = useState(false);
  const [isEmployeeModalShown, setEmployeeModalShown] = useState(false);
  const [chosenCompany, setChosenCompany] = useState('');
  const [isDataLoading, setDataLoading] = useState(false);

  const {loadMoreRef, page} = useInfiniteScroll();

  const [dataPage, setDataPage] = useState(page);

  useEffect(() => {
    setDataLoading(true);
    const timer = setTimeout(() => {
      setDataLoading(false);
      setDataPage(page);
    }, 1000);
    return () => clearTimeout(timer);
  }, [page])


  const handleCompanyAdd = (item: NewCompanyType) => {
    setCompanyModalShown(false);
    dispatch(addCompany(item));
  }

  const handleEmployeeAdd = (item: NewEmployeeType) => {
    setEmployeeModalShown(false);
    dispatch(addEmployee({companyId: chosenCompany, employee: item}))
  }

  return (
    <div className={cn('container', s.homePage)}>
      <div className={s.tablesContainer}>
        <Table
          tableTitle='Компании'
          tableVariant='companies'
          tableColumnTitles={companiesTableTitles}
          tableData={companies.slice(0, dataPage * ITEMS_PER_PAGE)}
          removeItem={(id: string[]) => dispatch(removeCompany(id))}
          modalInner={<AddCompany onClick={handleCompanyAdd}/>}
          isModalShown={isCompanyModalShown}
          setModalShown={setCompanyModalShown}
          setChosenCompany={setChosenCompany}
          editItem={(item) => dispatch(editCompany(item as unknown as CompanyType))}
          className={s.firstTable}
        />
        <Table
          tableTitle='Сотрудники'
          tableVariant='employees'
          tableColumnTitles={employeesTableTitles}
          tableData={companies.find(item => item.id === chosenCompany)?.employees.slice(0, dataPage * ITEMS_PER_PAGE) || []}
          removeItem={(id: string[]) => dispatch(removeEmployee({companyId: chosenCompany, employees: id}))}
          modalInner={<AddEmployee onClick={handleEmployeeAdd} />}
          isModalShown={isEmployeeModalShown}
          setModalShown={setEmployeeModalShown}
          editItem={(item) =>
            dispatch(editEmployee({companyId: chosenCompany, employee: item as unknown as EmployeeType}))}
          className={s.secondTable}
          isCompanyChosen={!!chosenCompany?.length}
        />
      </div>
      <div ref={loadMoreRef} className={s.scrollRef}>
        {isDataLoading && page !== 1 && companies.length > page * ITEMS_PER_PAGE - ITEMS_PER_PAGE  && <Loader />}
      </div>
    </div>
  );
};