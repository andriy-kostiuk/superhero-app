import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';
import { Hero } from './hero.js';

export const HeroImage = client.define('HeroImage', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Hero.hasMany(HeroImage, { foreignKey: 'heroId', onDelete: 'CASCADE' });
HeroImage.belongsTo(Hero, { foreignKey: 'heroId' });
