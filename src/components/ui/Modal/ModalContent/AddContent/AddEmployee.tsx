import React, {useState} from 'react';
import s from './AddCompany.module.scss';
import {Input} from "../../../Input/Input";
import {Button} from "../../../Button/Button";
import {AddIcon} from "../../../icons/AddIcon";

const AddEmployee = ({onClick}: {onClick: ({name, surname, position}:
  {name: string, surname: string, position: string}) => void}):JSX.Element => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  return (
    <form className={s.form} onSubmit={e => { e.preventDefault(); }}>
      <Input className={s.input} onChange={(e) => setSurname(e.target.value)}
        value={surname} type='text' label='Фамилия сотрудника' />
      <Input className={s.input} onChange={(e) => setName(e.target.value)}
        value={name} type='text' label='Имя сотрудника' />
      <Input className={s.input} onChange={(e) => setPosition(e.target.value)}
             value={position} type='text' label='Должность' />
      <Button
        icon={<AddIcon className={s.btnIcon} />}
        text='Добавить' styleType='filled'
        onClick={() => onClick({name: name, surname: surname, position: position})}
      />
    </form>
  );
};

export default AddEmployee;