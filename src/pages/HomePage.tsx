import React, {useState} from 'react';
import s from './HomePage.module.scss';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {addCompany, removeCompany, editCompany} from '../store/features/company/companySlice'
import {Table} from "../components/Table/Table";
import {companiesTableTitles, employeesTableTitles} from "../data";
import cn from 'classnames'
import {CompanyType} from "../types";
import AddCompany from "../components/ui/Modal/ModalContent/AddContent/AddCompany";


export const HomePage = ():JSX.Element => {
  const companies = useAppSelector((state) => state.companies.companies);
  const dispatch = useAppDispatch();
  const [isModalShown, setModalShown] = useState(false);
  const [chosenCompany, setChosenCompany] = useState('');

  const handleCompanyAdd = (item: any) => {
    setModalShown(false);
    dispatch(addCompany(item));
  }

  console.log(companies)

  return (
    <div className={cn('container', s.homePage)}>
      <Table
        tableTitle='Компании'
        tableColumnTitles={companiesTableTitles}
        tableData={companies}
        removeItem={(id: string[]) => dispatch(removeCompany(id))}
        addItem={(item: CompanyType) => dispatch(addCompany(item))}
        modalInner={<AddCompany onClick={handleCompanyAdd}/>}
        isModalShown={isModalShown}
        setModalShown={setModalShown}
        setChosenCompany={setChosenCompany}
        editItem={(item: CompanyType) => dispatch(editCompany(item))}
      />
    </div>
  );
};