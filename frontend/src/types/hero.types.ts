import type { HeroImage } from './heroImage.types';

export interface Hero {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: HeroImage[];
}

export interface HeroPreview extends Pick<Hero, 'id' | 'nickname'> {
  image: HeroImage | null;
}
