import { Route, Routes } from 'react-router-dom';

import { App } from './modules/App/App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { MainNavigation } from './utils/constants';
import { HeroPage } from './modules/HeroPage';

export const Root = () => {
  return (
    <Routes>
      <Route path={MainNavigation.HOME} element={<App />}>
        <Route index element={<HomePage />} />

        <Route path={MainNavigation.HERO_PAGE} element={<HeroPage />} />
        <Route path={MainNavigation.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
