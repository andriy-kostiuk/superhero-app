import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const Logo = () => {
  return (
    <Link to='/' className={styles.logo}>
      <img className={styles.logo__img} src='/images/logo.svg' />
      SuperHero
    </Link>
  );
};
