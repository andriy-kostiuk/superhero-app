import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { MainNavigation } from '../../utils/constants';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(MainNavigation.HOME);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404 - Page Not Found</h1>
      <p className={styles.notFound__text}>
        Oops! The page you’re looking for doesn’t exist. You will be redirected
        to the homepage shortly.
      </p>
      <Link className={styles.notFound__button} to={MainNavigation.HOME}>
        Return to Home
      </Link>
    </div>
  );
};
