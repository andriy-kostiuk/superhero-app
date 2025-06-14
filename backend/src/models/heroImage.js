import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';
import { Hero } from './hero.js';

export const HeroImage = client.define('HeroImage', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Hero.hasMany(HeroImage, {
  foreignKey: 'heroId',
  onDelete: 'CASCADE',
  as: 'images',
});

HeroImage.belongsTo(Hero, {
  foreignKey: 'heroId',
  as: 'hero',
});
