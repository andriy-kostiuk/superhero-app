import { type FC } from 'react';
import cn from 'classnames';

import { Logo } from '../shared/Logo';

import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { MainNavigation } from '@/utils/constants';

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <>
      <header className={cn(className, styles.header)}>
        <div className={cn(styles.header__container, 'container')}>
          <Logo />

          <Link to={MainNavigation.HOME} className={styles.header__link}>
            Home
          </Link>
        </div>
      </header>
    </>
  );
};
