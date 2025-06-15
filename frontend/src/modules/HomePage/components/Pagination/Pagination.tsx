import React from 'react';
import { PaginationItem } from '../PaginationItem';
import type { Pagination as PaginationType } from '@/types';
import cn from 'classnames';
import styles from './styles.module.scss';
import { SharedSvg } from '@/modules/shared/SharedSvg';

interface Props extends PaginationType {
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  page,
  totalItems,
  totalPages,
  onPageChange,
  className,
}) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  const getMiddlePages = (): number[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages - 2 }, (_, i) => i + 2);
    }

    if (page <= 3) return [2, 3, 4];
    if (page >= totalPages - 2)
      return [totalPages - 3, totalPages - 2, totalPages - 1];

    return [page - 1, page, page + 1];
  };

  if (totalItems <= perPage) return null;

  if (totalPages < 1 || page < 1 || page > totalPages) {
    return null;
  }

  const middlePages = getMiddlePages();

  console.log('middlePages', middlePages);

  return (
    <div className={cn(styles.pagination, className)}>
      <button
        className={cn(
          styles.pagination__item,
          styles['pagination__item--btn'],
          styles['pagination__item--prev']
        )}
        onClick={() => onPageChange(page - 1)}
        disabled={isFirstPage}
        aria-label='Previous page'
      >
        <SharedSvg type='arrow-fill' />
      </button>

      <PaginationItem
        className={styles.pagination__item}
        page={1}
        onPageChange={onPageChange}
        isActive={page === 1}
      />

      {page > 3 && <span className={styles.pagination__dots}>...</span>}

      {middlePages.map((p) => (
        <PaginationItem
          className={styles.pagination__item}
          key={p}
          page={p}
          onPageChange={onPageChange}
          isActive={p === page}
        />
      ))}

      {page < totalPages - 2 && (
        <span className={styles.pagination__dots}>...</span>
      )}

      {totalPages > 1 && (
        <PaginationItem
          className={styles.pagination__item}
          page={totalPages}
          onPageChange={onPageChange}
          isActive={page === totalPages}
        />
      )}

      <button
        className={cn(
          styles.pagination__item,
          styles['pagination__item--btn'],
          styles['pagination__item--next']
        )}
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        aria-label='Next page'
      >
        <SharedSvg type='arrow-fill' />
      </button>
    </div>
  );
};
