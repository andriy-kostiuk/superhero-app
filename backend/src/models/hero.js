import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';

export const Hero = client.define('Hero', {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  real_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  origin_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  superpowers: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  catch_phrase: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
