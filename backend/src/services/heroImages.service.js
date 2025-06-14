import { HeroImage } from '../models/index.js';

export const heroImagesService = {
  async createMultiple(files, heroId, options) {
    if (!files || files.length === 0) {
      return [];
    }

    if (!heroId) {
      throw new Error('heroId is required');
    }

    const imageData = files.map((file) => ({
      heroId,
      filename: file.filename,
      path: file.path,
      url: '/upload/' + file.filename,
    }));

    const createdImages = await HeroImage.bulkCreate(imageData, {
      returning: true,
      validate: true,
      ...options,
    });

    return createdImages;
  },

  async getAll(where = {}, options = {}) {
    return HeroImage.findAll({ where, ...options });
  },

  async remove({ heroId, id }, options = {}) {
    const where = {};
    if (heroId) where.heroId = heroId;
    if (id) where.id = id;

    const images = await this.getAll(where, options);

    await HeroImage.destroy({
      where,
      ...options,
    });

    return { images };
  },

  normalize({ filename, heroId, id, url }) {
    return {
      url,
      filename,
      heroId,
      id,
    };
  },
};
