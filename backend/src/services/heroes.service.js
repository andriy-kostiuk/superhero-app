import { ApiError } from '../exceptions/api.error.js';
import { Hero } from '../models/index.js';

export const heroesService = {
  async create(hero) {
    try {
      return await Hero.create(hero);
    } catch (error) {
      throw ApiError.fromSequelizeUnique(error);
    }
  },

  async getAll() {
    return Hero.findAll();
  },

  async getOne(params) {
    const hero = await Hero.findOne({
      where: {
        ...params,
      },
    });

    return hero;
  },

  async update(query, newParams) {
    try {
      const [affectedRows, [updatedHero]] = await Hero.update(
        { ...newParams },
        {
          where: {
            ...query,
          },
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

  async remove({ id }) {
    return await Hero.destroy({
      where: {
        id,
      },
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
};
