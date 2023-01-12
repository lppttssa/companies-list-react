import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import s from './Table.module.scss';
import {CompanyType} from "../../types";
import {Checkbox} from "../ui/Checkbox/Checkbox";
import {Button} from "../ui/Button/Button";
import {AddIcon} from "../ui/icons/AddIcon";
import {DeleteIcon} from "../ui/icons/DeleteIcon";
import {Modal} from "../ui/Modal/Modal";
import {EditIcon} from "../ui/icons/EditIcon";
import { Input } from '../ui/Input/Input';
import cn from "classnames";

type TableProps = {
  tableTitle: string,
  tableColumnTitles: {id: number, title: string}[],
  tableData: CompanyType[],
  removeItem: (id: string[]) => void,
  addItem: (item: any) => void,
  isModalShown: boolean,
  setModalShown: Dispatch<SetStateAction<boolean>>,
  modalInner: React.ReactNode,
  setChosenCompany?: Dispatch<SetStateAction<string>>,
  editItem: (item: any) => void,
};

export const Table = (props: TableProps):JSX.Element => {
  const {
    tableTitle, tableColumnTitles, tableData, removeItem, addItem, modalInner, isModalShown,
    setModalShown, setChosenCompany, editItem
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
      setCheckedItems(tableData.map(item => item.id))
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

  console.log(tableData)
  const handleInputChange = (e: any, id: string, field: string) => {
    const index = tableData.findIndex(item => item.id === id);
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
      {tableData.map(item => (
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
                onChange={(e) => handleInputChange(e, item.id, 'title')}
                value={item.title}
              /> :
              item.title}
          </td>
          <td className={s.cell}>
            {item.numberOfPeople}
          </td>
          <td className={s.cell}>
            {isEditMode ?
              <Input
                type={'text'}
                label={''}
                onChange={(e) => handleInputChange(e, item.id, 'address')}
                value={item.address}
              /> :
              item.address}
          </td>
        </tr>
      ))}
    </table>
  );

  return (
    <>
      <h2 className={s.title}>{tableData.length ? tableTitle : `К сожалению, данных '${tableTitle}' нет`}</h2>
      <div className={s.btnContainer}>
        <Button
          className={s.addBtn}
          icon={<AddIcon />}
          text='Добавить'
          style='add'
          onClick={() => setModalShown(true)}
        />
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
      {isModalShown && <Modal title={'Добавить компанию'}
                          content={modalInner}
                          onClose={() => setModalShown(false)} />}
    </>
  );
};