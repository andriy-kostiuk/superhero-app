import { useCallback, useState } from 'react';
import { type HeroImage } from '@/types';
import styles from './styles.module.scss';
import { createUrl } from '@/utils/utility';
import classNames from 'classnames';

interface HeroViewProps {
  hero: {
    nickname: string;
    images: HeroImage[];
    real_name?: string;
    origin_description?: string;
    superpowers?: string;
    catch_phrase?: string;
  };
}

export const HeroView: React.FC<HeroViewProps> = ({ hero }) => {
  const [activeImage, setActiveImage] = useState(() => {
    if (hero.images && hero.images.length > 0) {
      return createUrl(hero.images[0].url);
    }
    return '/images/hero.png';
  });

  const handleImageError = useCallback(() => {
    setActiveImage('/images/hero.png');
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.hero__info}>
        <div className={styles.hero__header}>
          <h1 className={styles.hero__nickname}>{hero.nickname}</h1>
          {hero.real_name && (
            <h2 className={styles.hero__realname}>{hero.real_name}</h2>
          )}
        </div>

        <div className={styles.hero__section}>
          <h3 className={styles.hero__sectionTitle}>Origin</h3>
          <p className={styles.hero__sectionText}>
            {hero.origin_description || 'No origin description provided.'}
          </p>
        </div>

        <div className={styles.hero__section}>
          <h3 className={styles.hero__sectionTitle}>Superpowers</h3>
          <p className={styles.hero__sectionText}>
            {hero.superpowers || 'Unknown powers.'}
          </p>
        </div>

        <div className={styles.hero__section}>
          <h3 className={styles.hero__sectionTitle}>Catch Phrase</h3>
          <blockquote className={styles.hero__quote}>
            {hero.catch_phrase || '—'}
          </blockquote>
        </div>
      </div>

      <div className={styles.hero__gallery}>
        <div className={styles.hero__mainImageWrapper}>
          <img
            src={activeImage}
            alt={`${hero.nickname} main`}
            className={styles.hero__mainImage}
            onError={handleImageError}
          />
        </div>

        {hero.images && hero.images.length > 0 && (
          <ul className={styles.hero__thumbnailGrid}>
            {hero.images.map((img) => {
              const imageUrl = createUrl(img.url);
              return (
                <li key={img.id}>
                  <img
                    src={imageUrl}
                    alt={`${hero.nickname} preview`}
                    className={classNames(styles.hero__thumbnail, {
                      [styles['hero__thumbnail--active']]:
                        activeImage === imageUrl,
                    })}
                    onClick={() => setActiveImage(imageUrl)}
                    onError={handleImageError}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
