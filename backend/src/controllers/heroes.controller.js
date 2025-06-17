import { heroesService, heroImagesService } from '../services/index.js';
import { ApiError } from '../exceptions/api.error.js';
import { heroSchema, heroUpdateSchema } from '../schemas/index.js';
import { dynamicSchema } from '../utils/dynamicSchema.js';
import { removeUploadedFiles } from '../utils/removeUploadedFiles.js';
import { client } from '../utils/db.js';

const getAll = async (req, res) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;

  const { heroes, total } = await heroesService.getListPage({ limit, page });

  res.json({
    data: heroes.map((hero) => heroesService.normalizeForList(hero)),
    pagination: {
      page: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      perPage: limit,
    },
  });
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const hero = await heroesService.getOneWithImages({ id });

  if (!hero) {
    throw ApiError.notFound();
  }

  res.json(heroesService.normalizeWithImages(hero));
};

const create = async (req, res, next) => {
  const heroInformation = req.body;
  const files = req.files;

  const { error, value } = heroSchema.validate(heroInformation);

  if (error) {
    await removeUploadedFiles(files);
    throw ApiError.badRequest(error.message, { field: error.message });
  }

  try {
    const result = await client.transaction(async (transaction) => {
      const heroData = await heroesService.create(value, { transaction });

      const images = await heroImagesService.createMultiple(
        files,
        heroData.id,
        {
          transaction,
        },
      );

      const newHero = {
        ...heroesService.normalize(heroData),
        images: images.map(heroImagesService.normalize),
      };

      return newHero;
    });

    res.status(201).json(result);
  } catch (error) {
    await removeUploadedFiles(files);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const heroInformation = req.body;
  const files = req.files;

  const updatedSchema = dynamicSchema(
    Object.keys(heroInformation),
    heroUpdateSchema,
  );

  const { error, value } = updatedSchema.validate(heroInformation);

  if (error) {
    await removeUploadedFiles(files);
    throw ApiError.badRequest(error.message, {
      field: error.message,
    });
  }

  let imagesToRemove = [];

  try {
    const result = await client.transaction(async (transaction) => {
      const existingHero = await heroesService.getOneWithImages(
        { id },
        { transaction },
      );
      if (!existingHero) {
        throw ApiError.notFound();
      }

      if (value.deletedImageIds && value.deletedImageIds.length > 0) {
        const { images } = await heroImagesService.remove(
          { id: value.deletedImageIds },
          { transaction },
        );
        imagesToRemove = images;
      }

      const updatedHero = await heroesService.update({ id }, value, {
        transaction,
      });

      const newImages = await heroImagesService.createMultiple(files, id, {
        transaction,
      });

      return {
        ...heroesService.normalize(updatedHero),
        images: [
          ...existingHero.images
            .filter((img) => !value.deletedImageIds?.includes(img.id))
            .map(heroImagesService.normalize),
          ...newImages.map(heroImagesService.normalize),
        ],
      };
    });

    await removeUploadedFiles(imagesToRemove);

    res.status(200).json(result);
  } catch (error) {
    await removeUploadedFiles(files);
    next(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  let imagesToRemove = [];

  await client.transaction(async (transaction) => {
    const existingHero = await heroesService.getOneWithImages(
      { id },
      { transaction },
    );
    if (!existingHero) {
      throw ApiError.notFound();
    }

    imagesToRemove = existingHero.images;

    await heroImagesService.remove({ heroId: id }, { transaction });
    await heroesService.remove({ id }, { transaction });
  });

  await removeUploadedFiles(imagesToRemove);
  res.status(204).end();
};

export const heroesController = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
