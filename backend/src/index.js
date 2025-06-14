'use strict';

import 'dotenv/config';
import express from 'express';
import * as routes from './routes/index.js';
import { errorMiddleware } from './middlewares/index.js';
import { ApiError } from './exceptions/api.error.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/heroes', routes.heroesRouter);

app.use('*', (req, res, next) => {
  throw ApiError.notFound();
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is starting on port ${PORT}`);
});
