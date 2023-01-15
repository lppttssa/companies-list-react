import React, {useState} from 'react';
import {Input} from "../../../Input/Input";
import s from './AddCompany.module.scss';
import {Button} from "../../../Button/Button";
import {AddIcon} from "../../../icons/AddIcon";
import {NewCompanyType} from "../../../../../types";

type AddCompanyProps = {
  onClick: (item: NewCompanyType) => void,
};

export const AddCompany = (props: AddCompanyProps) => {
  const {
    onClick,
  } = props;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <form className={s.form} onSubmit={e => { e.preventDefault(); }}>
      <Input className={s.input} onChange={(e) => setName(e.target.value)}
        value={name} type='text' label='Название компании' />
      <Input className={s.input} onChange={(e) => setAddress(e.target.value)}
        value={address} type='text' label='Адрес' />
      <Button
        icon={<AddIcon
        className={s.btnIcon} />}
        text='Добавить' styleType='filled'
        onClick={() => onClick({title: name, address: address})}
      />
    </form>
  );
};

export default AddCompany;