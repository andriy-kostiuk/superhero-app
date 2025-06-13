import 'dotenv/config';
import { Hero, HeroImage } from './src/models/index.js';
import { client } from './src/utils/db.js';

client.sync({ force: true });
