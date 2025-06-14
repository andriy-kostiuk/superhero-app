import { Outlet } from 'react-router-dom';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
