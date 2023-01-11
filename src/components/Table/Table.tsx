import React, {useState} from 'react';
import s from './Table.module.scss';
import {CompanyType} from "../../types";
import {Checkbox} from "../ui/Checkbox/Checkbox";
import {Button} from "../ui/Button/Button";
import {AddIcon} from "../ui/icons/AddIcon";
import {DeleteIcon} from "../ui/icons/DeleteIcon";

type TableProps = {
  tableTitle: string,
  tableColumnTitles: {id: number, title: string}[],
  tableData: CompanyType[],
  removeItem: (id: string[]) => void,
};

export const Table = (props: TableProps):JSX.Element => {
  const {
    tableTitle, tableColumnTitles, tableData, removeItem
  } = props;

  const [checkedCompanies, setCheckedCompanies] = useState<string[]>([]);
  const [isAllItemsChecked, setAllItemsChecked] = useState(false);

  const handleAllItemsCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedCompanies(tableData.map(item => item.id))
    } else {
      setCheckedCompanies([]);
    }
    setAllItemsChecked(!isAllItemsChecked);
  }

  return (
    <>
      <h2 className={s.title}>{tableTitle}</h2>
      <div className={s.btnContainer}>
        <Button
          className={s.addBtn}
          icon={<AddIcon />}
          text='Добавить'
          style='add'
          onClick={() => console.log()}
        />
        <Button
          onClick={() => removeItem(checkedCompanies)}
          icon={<DeleteIcon />} text='Удалить'
          style='delete'
          isDisabled={!checkedCompanies.length}
        />
      </div>
      <table className={s.table}>
        <caption className={s.caption}>{tableTitle}</caption>
        <tr className={s.titleRow}>
          <th className={s.cell}>
            <Checkbox onClick={handleAllItemsCheck} label='Выделить все'/>
          </th>
          {tableColumnTitles.map(item => (
              <th key={item.id} className={s.cell}>{item.title}</th>
          ))}
        </tr>
        {tableData.map(item => (
          <tr key={item.id} className={s.tableRow}>
            <td className={s.cell}>
              <Checkbox isChecked={isAllItemsChecked}
                onClick={(isChecked: boolean) =>
                  isChecked ?
                  setCheckedCompanies([...checkedCompanies, item.id]) :
                  setCheckedCompanies(checkedCompanies.filter(check => check !== item.id))}
              />
            </td>
            <td className={s.cell}>{item.title}</td>
            <td className={s.cell}>{item.numberOfPeople}</td>
            <td className={s.cell}>{item.address}</td>
          </tr>
        ))}
      </table>
    </>
  );
};