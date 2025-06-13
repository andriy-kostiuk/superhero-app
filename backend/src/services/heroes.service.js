import { ApiError } from '../exeptions/api.error.js';
import { Hero } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

export const heroesService = {
  // async register({ email, password, name }) {
  //   const isExist = !!(await this.getOne({ email }));
  //   if (isExist) {
  //     throw ApiError.badRequest('User already exist', {
  //       email: 'User already exist',
  //     });
  //   }
  //   const activationToken = uuidv4();
  //   await User.create({
  //     email,
  //     password,
  //     name,
  //     activationToken,
  //   });
  //   await emailService.sendActivationEmail(email, activationToken);
  // },
  // async getOne(params) {
  //   const user = await User.findOne({
  //     where: {
  //       ...params,
  //     },
  //   });
  //   return user;
  // },
  // async update(query, newParams) {
  //   const [affectedRows, [updatedUser]] = await User.update(
  //     { ...newParams },
  //     {
  //       where: {
  //         ...query,
  //       },
  //       returning: true,
  //     },
  //   );
  //   if (affectedRows === 0) {
  //     return null;
  //   }
  //   return updatedUser;
  // },
  // normalize({ email, id, name }) {
  //   return { email, id, name };
  // },
};
