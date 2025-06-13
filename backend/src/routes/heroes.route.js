import { Router } from 'express';
import { catchError } from '../utils/catchError.js';
import { heroesController } from '../controllers/index.js';

export const heroesRouter = new Router();

heroesRouter.get('/', catchError(heroesController.get));
// heroesRouter.get('/:id', catchError(heroesController.getById)); // GET /heroes/:id
heroesRouter.post('/', catchError(heroesController.create));
// heroesRouter.put('/:id', catchError(heroesController.update)); // PUT /heroes/:id
// heroesRouter.delete('/:id', catchError(heroesController.remove)); // DELETE /heroes/:id
