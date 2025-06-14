import type { HeroPreview } from './hero.types';
import type { Pagination } from './pagination.types';

export interface PaginatedHeroPreviewList {
  data: HeroPreview[];
  pagination: Pagination;
}
