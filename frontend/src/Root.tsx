import { Route, Routes } from 'react-router-dom';

import { App } from './modules/App/App';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
