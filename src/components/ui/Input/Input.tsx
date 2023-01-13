import React from 'react';
import s from './Input.module.scss';
import cn from "classnames";

type InputProps = {
  type: 'text' | 'number',
  label: string,
  value?: string | number,
  onChange: (e: any) => void,
  className?: string,
}

export const Input = (props: InputProps):JSX.Element => {
  const {
    type, label, value, onChange, className
  } = props;

  return (
    <div className={cn(s.inputContainer, className)}>
      <label className={s.label}>
        {label}
        <input onChange={onChange} value={value} className={s.input} type={type} />
      </label>
    </div>
  );
};