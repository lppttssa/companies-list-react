import React from 'react';
import s from './Button.module.scss';
import cn from "classnames";

type ButtonProps = {
  icon?: React.ReactNode,
  text: string,
  style: 'delete' | 'add' | 'filled',
  className?: string,
  isDisabled?: boolean,
  onClick: () => void,
};

export const Button = (props: ButtonProps) => {
  const {
    icon, text, style, className, isDisabled, onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(s.btn, className, { [s.addStyle]: style === 'add',
        [s.deleteStyle]: style === 'delete', [s.disabled]: isDisabled, [s.filled]: style === 'filled' })}
    >
      {icon}
      {text}
    </button>
  );
};