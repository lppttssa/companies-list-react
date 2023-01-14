import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from './Table.module.scss';
import {Checkbox} from "../ui/Checkbox/Checkbox";
import {Button} from "../ui/Button/Button";
import {AddIcon} from "../ui/icons/AddIcon";
import {DeleteIcon} from "../ui/icons/DeleteIcon";
import {Modal} from "../ui/Modal/Modal";
import {EditIcon} from "../ui/icons/EditIcon";
import { Input } from '../ui/Input/Input';
import cn from "classnames";
import {Loader} from "../ui/Loader/Loader";

type TableProps = {
  tableTitle: string,
  tableVariant: 'companies' | 'employees',
  tableColumnTitles: {id: number, title: string}[],
  /*tableData: CompanyType[],*/
  tableData: any,
  removeItem: (id: string[]) => void,
  isModalShown: boolean,
  setModalShown: Dispatch<SetStateAction<boolean>>,
  modalInner: React.ReactNode,
  setChosenCompany?: Dispatch<SetStateAction<string>>,
  editItem: (item: any) => void,
  className?: string,
  isCompanyChosen?: boolean,
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

  const handleAllItemsCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems(tableData.map((item: any) => item.id))
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

  const handleInputChange = (e: any, id: string, field: string) => {
    const index = tableData.findIndex((item: any) => item.id === id);
    const newObj = {};
    // @ts-ignore
    newObj[field] = e.target.value;
    editItem({...tableData[index], ...newObj});
  }

  const table= (
    <table className={s.table}>
      <caption className={s.caption}>{tableTitle}</caption>
      <tr className={s.titleRow}>
        <th className={s.cell}>
          <Checkbox onClick={handleAllItemsCheck} label='Выделить все' isChecked={isAllItemsChecked}/>
        </th>
        {tableColumnTitles.map(item => (
          <th key={item.id} className={s.cell}>{item.title}</th>
        ))}
      </tr>
      {tableData.map((item: any) => (
        <tr key={item.id} className={cn(s.tableRow, { [s.activeRow]: checkedItems.includes(item.id) })}>
          <td className={s.cell}>
            <Checkbox isChecked={isAllItemsChecked}
              onClick={(isChecked: boolean) => handleCheckboxClick(isChecked, item.id)}
            />
          </td>
          <td className={s.cell}>
            {isEditMode ?
              <Input
                type={'text'}
                label={''}
                onChange={(e) => handleInputChange(e, item.id, tableVariant==='companies' ? 'title' : 'surname')}
                value={item.title || item.surname}
              /> :
              (item.title || item.surname)}
          </td>
          <td className={s.cell}>
            {tableVariant === 'employees' ?
              isEditMode ?
                <Input
                  type={'text'}
                  label={''}
                  onChange={(e) => handleInputChange(e, item.id, 'name')}
                  value={item.name}
                />   :
                item.name : item.numberOfPeople?.toString()}
          </td>
          <td className={s.cell}>
            {isEditMode ?
              <Input
                type={'text'}
                label={''}
                onChange={(e) => handleInputChange(e, item.id, tableVariant==='companies' ? 'address' : 'position')}
                value={item.address || item.position}
              /> :
              (item.address || item.position)}
          </td>
        </tr>
      ))}
    </table>
  );


  return (
    <div className={className}>
      {(tableVariant === 'companies' || isCompanyChosen) &&
        <h2 className={s.title}>
          {tableData.length ? tableTitle : `К сожалению, данных '${tableTitle}' нет`}
        </h2>
      }
      <div className={s.btnContainer}>
        {(tableVariant === 'companies' || isCompanyChosen) &&
          <Button
            className={s.addBtn}
            icon={<AddIcon />}
            text='Добавить'
            style='add'
            onClick={() => setModalShown(true)}
          />
        }
        {!!tableData.length &&
          <>
            <Button
              className={s.addBtn}
              icon={<EditIcon className={s.editIcon} />}
              text={isEditMode ? 'Отключить редактирование' :'Редактировать'}
              style='filled'
              onClick={() => setEditMode(!isEditMode)}
            />
            <Button
              onClick={handleItemsRemove}
              icon={<DeleteIcon />} text='Удалить'
              style='delete'
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