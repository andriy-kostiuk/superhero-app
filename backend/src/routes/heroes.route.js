import { Router } from 'express';
import { catchError } from '../utils/catchError.js';
import { heroesController } from '../controllers/index.js';
import { heroUploadMiddleware } from '../middlewares/index.js';

export const heroesRouter = new Router();

heroesRouter.get('/', catchError(heroesController.getAll));
heroesRouter.post(
  '/',
  heroUploadMiddleware(),
  catchError(heroesController.create),
);
heroesRouter.get('/:id', catchError(heroesController.getOne));
heroesRouter.put('/:id', catchError(heroesController.update));
heroesRouter.delete('/:id', catchError(heroesController.remove));
