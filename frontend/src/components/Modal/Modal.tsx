'use client';

import s from './styles.module.scss';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIcon.svg';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: VoidFunction;
}

const portalDiv = document.querySelector('.modals') as Element;

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={s.overlay}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>
          <SVG src={CloseIcon} className={s.icon} />
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    portalDiv,
  );
};
