import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { MainNavigation } from '@/utils/constants';

export const Logo = () => {
  return (
    <Link to={MainNavigation.HOME} className={styles.logo}>
      <img className={styles.logo__img} src='/images/logo.svg' />
      HeroApp
    </Link>
  );
};
