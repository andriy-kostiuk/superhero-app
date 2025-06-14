import type { Hero, PaginatedHeroPreviewList } from '@/types';
import { client } from '@/api/fetchClient';

interface GetHeroesParams {
  page: number;
}

export const getHeroPreviews = ({ page }: GetHeroesParams) => {
  return client.get<PaginatedHeroPreviewList>(`/heroes?page=${page}`);
};

export const getFullHero = (id: string) => {
  return client.get<Hero>(`/heroes/${id}`);
};

export const createHero = (formData: FormData) => {
  return client.post<Hero>(`/heroes`, formData, true);
};

export const updateHero = (
  id: string,
  data: Partial<Omit<Hero, 'id' | 'images'>> | FormData,
  isFormData = false
) => {
  return client.patch<Hero>(`/heroes/${id}`, data, isFormData);
};

export const deleteHero = (id: string) => {
  return client.delete(`/heroes/${id}`);
};
