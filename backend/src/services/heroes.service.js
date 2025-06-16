import { ApiError } from '../exceptions/api.error.js';
import { Hero, HeroImage } from '../models/index.js';
import { heroImagesService } from './heroImages.service.js';

export const heroesService = {
  async create(hero, options = {}) {
    try {
      return await Hero.create(hero, options);
    } catch (error) {
      throw ApiError.fromSequelizeUnique(error);
    }
  },

  async getListPage({ page, limit }) {
    const offset = (page - 1) * limit;

    const [heroes, total] = await Promise.all([
      Hero.findAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: HeroImage,
            as: 'images',
            separate: true,
            limit: 1,
            order: [['createdAt', 'ASC']],
          },
        ],
      }),
      Hero.count(),
    ]);

    return { heroes, total };
  },

  async getOneWithImages(params) {
    const rawHero = await Hero.findOne({
      where: params,
      include: [{ model: HeroImage, as: 'images' }],
    });

    return rawHero?.toJSON() || null;
  },

  async update(query, newParams, options) {
    try {
      const [affectedRows, [updatedHero]] = await Hero.update(
        { ...newParams },
        {
          where: {
            ...query,
          },
          ...options,
          returning: true,
        },
      );

      if (affectedRows === 0) {
        return null;
      }

      return updatedHero;
    } catch (error) {
      throw ApiError.fromSequelizeUnique(error);
    }
  },

  async remove({ id }, options = {}) {
    return await Hero.destroy({
      where: {
        id,
      },
      ...options,
    });
  },

  normalize({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    id,
  }) {
    return {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      id,
    };
  },

  normalizeWithImages(hero) {
    const normalized = this.normalize(hero);

    const images = hero.images || [];
    normalized.images = images.map(heroImagesService.normalize);

    return normalized;
  },

  normalizeForList({ images, id, nickname }) {
    return {
      id,
      nickname,
      image: images?.length > 0 ? heroImagesService.normalize(images[0]) : null,
    };
  },
};
