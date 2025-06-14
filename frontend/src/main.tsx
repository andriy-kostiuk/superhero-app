import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './Root';

import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Root />
    </Router>
  </StrictMode>
);
