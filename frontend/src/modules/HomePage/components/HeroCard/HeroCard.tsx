import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { createUrl } from '@/utils/utility';
import type { HeroPreview } from '@/types';
import type { FC } from 'react';

interface Props {
  hero: HeroPreview;
}

export const HeroCard: FC<Props> = ({ hero }) => {
  const { id, image, nickname } = hero;
  const imageUrl = image ? createUrl(image.url) : '/images/hero.png';

  return (
    <li className={styles.card}>
      <img
        loading='lazy'
        src={imageUrl}
        alt={nickname}
        className={styles.card__image}
      />
      <div className={styles.card__content}>
        <h3 className={styles.card__name}>{nickname}</h3>

        <Link to={`/heroes/${id}`} className={styles.card__link}>
          View Profile
        </Link>
      </div>
    </li>
  );
};
