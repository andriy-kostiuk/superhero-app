import { heroesService } from '../services/index.js';
import { ApiError } from '../exceptions/api.error.js';
import { heroSchema } from '../schemas/index.js';
import { dynamicSchema } from '../utils/dynamicSchema.js';

const getAll = async (req, res) => {
  const heroes = await heroesService.getAll();

  res.json(heroes.map(heroesService.normalize));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const hero = await heroesService.getOne({ id });

  if (!hero) {
    throw ApiError.notFound();
  }

  res.json(heroesService.normalize(hero));
};

const create = async (req, res) => {
  const heroInformation = req.body;
  const files = req.files;

  console.log(files);

  console.log('INFO', heroInformation);

  const { error, value } = heroSchema.validate(heroInformation);

  if (error) {
    throw ApiError.badRequest(error.message, { field: error.message });
  }

  await heroesService.create(value);

  res.status(201).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const heroInformation = req.body;

  const updatedSchema = dynamicSchema(Object.keys(heroInformation), heroSchema);

  const { error, value } = updatedSchema.validate(heroInformation);

  if (error) {
    throw ApiError.badRequest(error.message, {
      field: error.message,
    });
  }

  const updatedHero = await heroesService.update({ id }, { ...value });

  if (!updatedHero) {
    throw ApiError.notFound();
  }

  res.status(200).json(heroesService.normalize(updatedHero));
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await heroesService.remove({ id });

  if (!deleted) {
    throw ApiError.notFound();
  }

  res.status(204).end();
};

export const heroesController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
