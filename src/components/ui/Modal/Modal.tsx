import React from 'react';
import s from './Modal.module.scss';
import {CloseIcon} from "../icons/CloseIcon";

type ModalProps = {
  title: string,
  content: React.ReactNode,
  onClose: () => void,
};

export const Modal = (props: ModalProps):JSX.Element => {
  const {
    title, content, onClose
  } = props;

  return (
    <div className={s.modal}>
      <div className={s.dialog} onClick={e => e.stopPropagation()}>
        <div className={s.header}>
          <h3 className={s.title}>{title}</h3>
          <CloseIcon onClick={onClose} className={s.close} />
        </div>
          <div className={s.content}>
            {content}
          </div>
      </div>
    </div>
  );
};