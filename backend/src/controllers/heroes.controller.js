import {} from '../services/index.js';
import { ApiError } from '../exeptions/api.error.js';
import { dynamicSchema } from '../utils/dynamicSchema.js';
import { heroSchema } from '../schemas/index.js';

const getAll = () => {};
const getById = () => {};
const create = (req, res) => {
  const hero = req.body;

  const {} = heroSchema;
};
const edit = () => {};
const remove = () => {};

export const heroesController = {
  getAll,
  getById,
  create,
  edit,
  remove,
};
