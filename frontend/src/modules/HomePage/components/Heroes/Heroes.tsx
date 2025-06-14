import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import type { HeroPreview } from '@/types';
import { getHeroPreviews } from '@/api/hero';
import { HeroCard } from '../HeroCard';
import { Pagination } from '../Pagination';

export const Heroes = () => {
  const [heroes, setHeroes] = useState<HeroPreview[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 5,
  });

  useEffect(() => {
    getHeroPreviews({ page: pagination.page }).then(
      ({ data, pagination: serverPagination }) => {
        setHeroes(data);

        const { totalItems, totalPages, perPage } = serverPagination;

        setPagination((prev) => ({
          ...prev,
          totalItems,
          totalPages,
          perPage,
        }));
      }
    );
  }, [pagination.page]);

  const setPage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <section className={styles.heroes}>
      <div className={classNames(styles.container, 'container')}>
        <h2 className={styles.heroes__title}>Meet Our Heroes</h2>
        <p className={styles.heroes__subtitle}>
          Discover the stories behind the powers. Here are some of Earth's
          mightiest defenders.
        </p>

        <ul className={styles.heroes__list}>
          {heroes.map((hero) => (
            <HeroCard hero={hero} key={hero.id} />
          ))}
        </ul>

        <Pagination
          // {...pagination}
          page={5}
          perPage={5}
          totalItems={100}
          totalPages={20}
          onPageChange={setPage}
          className={styles.heroes__pagination}
        />
      </div>
    </section>
  );
};
