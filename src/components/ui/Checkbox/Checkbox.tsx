import React, {useEffect, useState} from 'react';
import s from './Checkbox.module.scss';

type CheckboxProps = {
  label?: string,
  onClick: (e: any) => void,
  isChecked?: boolean,
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const {
    label, onClick, isChecked
  } = props;

  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(isChecked || false);
  }, [isChecked]);

  const handleCheckClick = (e: any) => {
    setCheck(!check);
    onClick(e.target.checked);
  }

  return (
    <label className={s.label}>
      <input checked={check} onChange={handleCheckClick} className={s.checkbox} type='checkbox'/>
      {label}
    </label>
  );
};