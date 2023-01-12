import React from 'react';
import s from './Input.module.scss';

type InputProps = {
  type: 'text' | 'number',
  label: string,
  value?: string | number,
  onChange: (e: any) => void,
}

export const Input = (props: InputProps):JSX.Element => {
  const {
    type, label, value, onChange
  } = props;

  return (
    <div className={s.inputContainer}>
      <label className={s.label}>
        {label}
        <input onChange={onChange} value={value} className={s.input} type={type} />
      </label>
    </div>
  );
};