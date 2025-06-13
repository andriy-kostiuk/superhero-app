import Joi from 'joi';

export const heroSchema = Joi.object({
  nickname: Joi.string().min(2).max(50).required(),
  real_name: Joi.string().allow('', null),
  origin_description: Joi.string().allow('', null),
  superpowers: Joi.string().allow('', null),
  catch_phrase: Joi.string().allow('', null),
});
