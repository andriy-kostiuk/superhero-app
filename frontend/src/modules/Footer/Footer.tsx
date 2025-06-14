import cn from 'classnames';

import styles from './styles.module.scss';
import type { FC } from 'react';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={cn(className, styles.footer)}>
      <p className={cn(styles.footer__end, 'container')}>
        © 2025 Andrii Kostiuk. All Rights Reserved.
      </p>
    </footer>
  );
};
