import Joi from 'joi';

export const heroSchema = Joi.object({
  nickname: Joi.string().min(2).max(50).required(),
  real_name: Joi.string().allow('', null),
  origin_description: Joi.string().allow('', null),
  superpowers: Joi.string().allow('', null),
  catch_phrase: Joi.string().allow('', null),
});

export const heroUpdateSchema = heroSchema.keys({
  deletedImageIds: Joi.alternatives()
    .try(
      Joi.array().items(Joi.number().integer()),
      Joi.number().integer(),
      Joi.string(),
    )
    .custom((value, helpers) => {
      if (Array.isArray(value)) {
        return value.map(Number).filter((v) => !isNaN(v));
      }

      if (value === undefined || value === null || value === '') {
        return [];
      }

      const num = Number(value);
      return isNaN(num) ? [] : [num];
    }, 'Normalize to array of numbers')
    .default([]),
});
