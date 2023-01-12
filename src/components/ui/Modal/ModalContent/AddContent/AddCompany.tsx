import React, {useState} from 'react';
import {Input} from "../../../Input/Input";
import s from './AddCompany.module.scss';
import {Button} from "../../../Button/Button";
import {AddIcon} from "../../../icons/AddIcon";

type AddCompanyProps = {
  onClick: (item: any) => void,
};

export const AddCompany = (props: AddCompanyProps) => {
  const {
    onClick,
  } = props;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  return (
    <form className={s.form} onSubmit={e => { e.preventDefault(); }}>
      <Input onChange={(e) => setName(e.target.value)} value={name} type='text' label='Название компании' />
      <Input onChange={(e) => setAddress(e.target.value)} value={address} type='text' label='Адрес'/>
      <Button icon={<AddIcon
                      className={s.btnIcon} />}
                      text='Добавить' style='filled'
                      onClick={() => onClick({title: name, address: address})}
                    />
    </form>
  );
};

export default AddCompany;