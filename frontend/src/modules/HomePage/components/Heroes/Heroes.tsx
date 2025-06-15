import type { HeroPreview } from '@/types';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { getHeroPreviews } from '@/api/hero';
import { HeroCard } from '../HeroCard';
import { Pagination } from '../Pagination';
import { Loading } from '@/modules/shared/Loading';

import styles from './styles.module.scss';

export const Heroes = () => {
  const [heroes, setHeroes] = useState<HeroPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 5,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getHeroPreviews({ page: pagination.page })
      .then(({ data, pagination: serverPagination }) => {
        if (cancelled) return;

        setHeroes(data);

        const { totalItems, totalPages, perPage } = serverPagination;

        setPagination((prev) => ({
          ...prev,
          totalItems,
          totalPages,
          perPage,
        }));
      })
      .catch((err) => {
        if (cancelled) return;

        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          'Failed to load heroes';

        setError(errorMessage);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pagination.page]);

  const setPage = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  }, []);

  return (
    <section className={styles.heroes}>
      <div className={classNames(styles.container, 'container')}>
        <h2 className={styles.heroes__title}>Meet Our Heroes</h2>
        <p className={styles.heroes__subtitle}>
          Discover the stories behind the powers. Here are some of Earth's
          mightiest defenders.
        </p>
        {loading && (
          <div className={styles.heroes__loading}>
            <Loading />
          </div>
        )}

        {error && !loading && (
          <p className={classNames(styles.heroes__err, styles.error)}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <ul className={styles.heroes__list}>
              {heroes.map((hero) => (
                <HeroCard hero={hero} key={hero.id} />
              ))}
            </ul>

            <Pagination
              {...pagination}
              onPageChange={setPage}
              className={styles.heroes__pagination}
            />
          </>
        )}
      </div>
    </section>
  );
};
