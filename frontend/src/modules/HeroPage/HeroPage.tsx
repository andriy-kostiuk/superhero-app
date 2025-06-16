import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { deleteHero, getFullHero } from '@/api/hero';
import { type Hero } from '@/types';
import { ApiError } from '@/utils/apiError';
import { HeroView } from './components/HeroView';
import { HeroEdit } from './components/HeroEdit';
import { Loading } from '@/modules/shared/Loading';

import styles from './styles.module.scss';
import { MainNavigation } from '@/utils/constants';

type ViewMode = 'view' | 'edit';

export const HeroPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hero, setHero] = useState<Hero | null>(null);
  const [mode, setMode] = useState<ViewMode>('view');

  const isCancelledRef = useRef(false);

  const updateHeroData = useCallback((updatedHero: Hero) => {
    setHero(updatedHero);
  }, []);

  const toggleEditMode = useCallback(() => {
    setMode((prev) => (prev === 'view' ? 'edit' : 'view'));
  }, []);

  const fetchHero = useCallback(
    async (heroId: string) => {
      if (isCancelledRef.current) return;

      setLoading(true);
      setError('');

      try {
        const heroFromServer = await getFullHero(heroId);

        if (!isCancelledRef.current) {
          setHero(heroFromServer);
        }
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          navigate('/not-found', { replace: true });
        } else {
          setError(
            err instanceof ApiError ? err.message : 'Something went wrong'
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    isCancelledRef.current = false;

    if (!id) {
      navigate('/not-found', { replace: true });
      return;
    }

    fetchHero(id);

    return () => {
      isCancelledRef.current = true;
    };
  }, [id, fetchHero, navigate]);

  const refetchHero = useCallback(() => {
    if (id) fetchHero(id);
  }, [id, fetchHero]);

  const handlerDelete = () => {
    setLoading(true);

    if (id)
      deleteHero(id)
        .then(() => navigate(MainNavigation.HOME))
        .catch((err) => {
          setError(
            err instanceof ApiError ? err.message : 'Something went wrong'
          );
        })
        .finally(() => setLoading(false));
  };

  return (
    hero && (
      <div className={styles.hero}>
        <div className={classNames(styles.hero__container, 'container')}>
          {loading && !error && (
            <div className={styles.hero__loading}>
              <Loading />
            </div>
          )}

          {!loading && error && (
            <div className={styles.hero__error}>
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && !hero && (
            <div className={styles.hero__notFound}>
              <p>Hero not found</p>
            </div>
          )}

          {!loading && !error && hero && (
            <>
              <div className={styles.hero__controls}>
                {mode === 'edit' && (
                  <button
                    onClick={handlerDelete}
                    className={classNames(
                      styles.hero__controlButton,
                      styles['hero__controlButton--del']
                    )}
                    disabled={isSubmitting}
                  >
                    Delete Hero
                  </button>
                )}

                <button
                  onClick={toggleEditMode}
                  className={classNames(styles.hero__controlButton)}
                  disabled={isSubmitting}
                >
                  {mode === 'view' ? 'Edit Hero' : 'Cancel Edit'}
                </button>
              </div>

              {mode === 'view' ? (
                <HeroView hero={hero} />
              ) : (
                <HeroEdit
                  hero={hero}
                  onSave={updateHeroData}
                  onCancel={() => setMode('view')}
                  onRefetch={refetchHero}
                  onSubmittingChange={setIsSubmitting}
                />
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};
