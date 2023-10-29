'use client';

import s from './styles.module.scss';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIcon.svg';
import clsx from 'clsx';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: VoidFunction;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
}) => {
  if (!isOpen) return null;

  const portalDiv = document.querySelector('.modals') as Element;

  return createPortal(
    <div className={s.overlay}>
      <div className={clsx(s.modal, className)}>
        <button className={s.closeBtn} onClick={onClose}>
          <SVG src={CloseIcon} className={s.icon} />
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    portalDiv,
  );
};
