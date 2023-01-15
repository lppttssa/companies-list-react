import React from 'react';
import s from './Button.module.scss';
import cn from "classnames";

type ButtonProps = {
  icon?: React.ReactNode,
  text: string,
  styleType: 'delete' | 'add' | 'filled',
  className?: string,
  isDisabled?: boolean,
  onClick: () => void,
};

export const Button = (props: ButtonProps) => {
  const {
    icon, text, styleType, className, isDisabled, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(s.btn, className, { [s.addStyle]: styleType === 'add',
        [s.deleteStyle]: styleType === 'delete', [s.disabled]: isDisabled, [s.filled]: styleType === 'filled' })}
    >
      {icon}
      {text}
    </button>
  );
};