'use client';

import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Popup.module.scss';
import { SharedSvg } from '../SharedSvg';
import classNames from 'classnames';
import { useClickOutside } from '@/hooks';

interface Props {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
  autoClose?: number;
}

export const Popup: FC<Props> = ({
  message,
  type = 'success',
  onClose,
  autoClose = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      document.body.style.overflow = '';

      onClose?.();
    }, 300);
  }, [onClose]);

  useClickOutside(containerRef, handleClose);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (message) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
      setIsClosing(false);

      if (autoClose) {
        timer = setTimeout(() => {
          handleClose();
        }, autoClose);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [autoClose, handleClose, message]);

  if (!visible) return null;

  return (
    <div className={styles.popup}>
      <div
        ref={containerRef}
        className={classNames(styles.popup__container, {
          [styles['popup__container--success']]: type === 'success',
          [styles['popup__container--error']]: type === 'error',
          [styles['popup__container--closing']]: isClosing,
        })}
      >
        <span
          className={classNames(styles.popup__icon, {
            [styles['popup__icon--success']]: type === 'success',
            [styles['popup__icon--error']]: type === 'error',
          })}
        ></span>

        <p className={styles.popup__message}>{message}</p>

        <button
          className={styles.popup__close}
          onClick={handleClose}
          aria-label='Close popup'
        >
          <SharedSvg type='close' />
        </button>
      </div>
    </div>
  );
};
