import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from './Table.module.scss';
import {Checkbox} from "../ui/Checkbox/Checkbox";
import {Button} from "../ui/Button/Button";
import {AddIcon} from "../ui/icons/AddIcon";
import {DeleteIcon} from "../ui/icons/DeleteIcon";
import {Modal} from "../ui/Modal/Modal";
import {EditIcon} from "../ui/icons/EditIcon";
import { Input } from '../ui/Input/Input';
import cn from "classnames";
import {CompanyType, EmployeeType} from "../../types";

type TableDataType = {
  id: string,
  title?: string,
  numberOfPeople?: number,
  address?: string,
  surname?: string,
  name?: string,
  position?: string,
}

type TableProps = {
  tableTitle: string,
  tableVariant: 'companies' | 'employees',
  tableColumnTitles: {id: number, title: string}[],
  tableData: TableDataType[] & (CompanyType[] | EmployeeType[]) ,
  removeItem: (id: string[]) => void,
  isModalShown: boolean,
  setModalShown: Dispatch<SetStateAction<boolean>>,
  modalInner: React.ReactNode,
  setChosenCompany?: Dispatch<SetStateAction<string>>,
  editItem: (item: CompanyType | EmployeeType) => void,
  className?: string,
  isCompanyChosen?: boolean,
};

type TableCellContentProps = {
  isEditMode: boolean,
  item: string,
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

export const TableCellContent = (props: TableCellContentProps):JSX.Element => {
  const {
    isEditMode, item, handleInputChange,
  } = props;
  return (
    <td className={s.cell}>
      {isEditMode ?
        <Input
          type={'text'}
          label={''}
          onChange={handleInputChange}
          value={item}
        /> :
        item
      }
    </td>
  );
};

export const Table = (props: TableProps):JSX.Element => {
  const {
    tableTitle, tableColumnTitles, tableData, removeItem, modalInner, isModalShown,
    setModalShown, setChosenCompany, editItem, className, isCompanyChosen, tableVariant
  } = props;

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isAllItemsChecked, setAllItemsChecked] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (setChosenCompany) {
      checkedItems.length > 1 ? setChosenCompany('') : setChosenCompany(checkedItems[0]);
    }
  }, [checkedItems])

  useEffect(() => {
    if (!isCompanyChosen) {
      setCheckedItems([]);
      setAllItemsChecked(false);
    }
  }, [isCompanyChosen])

  const handleAllItemsCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems(tableData.map((item) => item.id))
    } else {
      setCheckedItems([]);
    }
    setAllItemsChecked(!isAllItemsChecked);
  }

  const handleItemsRemove = () => {
    removeItem(checkedItems);
    setCheckedItems([]);
    setAllItemsChecked(false);
  }

  const handleCheckboxClick = (isChecked: boolean, id: string) => {
    isChecked ?
      setCheckedItems([...checkedItems, id]) :
      setCheckedItems(checkedItems.filter(check => check !== id));
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const index = tableData.findIndex((item) => item.id === id);
    const newObj: any = {};
    newObj[field] = e.target.value;
    editItem({...tableData[index], ...newObj});
  }

  const table= (
    <table className={s.table}>
      <caption className={s.caption}>{tableTitle}</caption>
      <thead>
      <tr className={s.titleRow}>
        <th className={s.cell}>
          <Checkbox onClick={handleAllItemsCheck} label='Выделить все' isChecked={isAllItemsChecked}/>
        </th>
        {tableColumnTitles.map(item => (
          <th key={item.id} className={s.cell}>{item.title}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {tableData.map((item) => (
        <tr key={item.id} className={cn(s.tableRow, { [s.activeRow]: checkedItems.includes(item.id) })}>
          <td className={s.cell}>
            <Checkbox isChecked={isAllItemsChecked}
              onClick={(isChecked: boolean) => handleCheckboxClick(isChecked, item.id)}
            />
          </td>
          <TableCellContent
            isEditMode={isEditMode}
            item={item.title || item.surname || ''}
            handleInputChange={(e) => handleInputChange(e, item.id, tableVariant==='companies' ? 'title' : 'surname')}
          />
          <td className={s.cell}>
            {tableVariant === 'employees' ?
              isEditMode ?
                <Input
                  type={'text'}
                  label={''}
                  onChange={(e) => handleInputChange(e, item.id, 'name')}
                  value={item.name}
                /> :
                item.name : item.numberOfPeople?.toString()
            }
          </td>
          <TableCellContent
            isEditMode={isEditMode}
            item={item.address || item.position || ''}
            handleInputChange={(e) => handleInputChange(e, item.id, tableVariant==='companies' ? 'address' : 'position')}
          />
        </tr>
      ))}
      </tbody>
    </table>
  );

  return (
    <div className={cn(s.tableContainer, className)}>
      {(tableVariant === 'companies' || isCompanyChosen) &&
        <h2 className={s.title}>
          {tableData.length ? tableTitle : `К сожалению, данных '${tableTitle}' нет`}
        </h2>
      }
      <div className={s.btnContainer}>
        {(tableVariant === 'companies' || isCompanyChosen) &&
          <Button
            className={cn(s.btn, s.addBtn)}
            icon={<AddIcon />}
            text='Добавить'
            styleType='add'
            onClick={() => setModalShown(true)}
            isDisabled={isAllItemsChecked}
          />
        }
        {!!tableData.length &&
          <>
            <Button
              className={cn(s.btn, s.addBtn)}
              icon={<EditIcon className={s.editIcon} />}
              text={isEditMode ? 'Отключить редактирование' :'Редактировать'}
              styleType='filled'
              onClick={() => setEditMode(!isEditMode)}
            />
            <Button
              className={s.btn}
              onClick={handleItemsRemove}
              icon={<DeleteIcon />} text='Удалить'
              styleType='delete'
              isDisabled={!checkedItems.length}
            />
          </>
        }
      </div>
      {!!tableData.length && table}
      {isModalShown &&
        <Modal
          title={'Добавить'}
          content={modalInner}
          onClose={() => setModalShown(false)}
        />
      }
    </div>
  );
};