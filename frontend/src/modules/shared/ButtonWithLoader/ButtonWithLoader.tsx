import React, { type FC } from 'react';

import styles from './styles.module.scss';
import { Loading } from '../Loading';

interface Props {
  isSubmitting: boolean;
  children: React.ReactNode;
}

export const ButtonWithLoader: FC<Props> = ({ isSubmitting, children }) => {
  return (
    <div className={styles.btn}>
      {isSubmitting && (
        <div className={styles.btn__loading} role='status'>
          <Loading />
        </div>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className={styles.btn__submit}
      >
        {children}
      </button>
    </div>
  );
};
