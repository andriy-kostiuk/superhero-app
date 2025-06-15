import { getFullHero } from '@/api/hero';
import type { Hero } from '@/types';
import { ApiError } from '@/utils/apiError';
import { createUrl } from '@/utils/utility';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const HeroPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const heroFromServer = await getFullHero(id as string);
        setHero(heroFromServer);
      } catch (error) {
        if (error instanceof ApiError) {
          setErr(error.message);
        } else {
          setErr('Something went wrong');
        }
      }
      setLoading(false);
    };

    fetch();
  }, [id]);

  if (loading) return <p>Loading hero...</p>;
  if (err) return <p>Error: {err}</p>;
  if (!hero) return <p>No hero data found.</p>;

  return (
    <main>
      <header>
        <h1>{hero.nickname}</h1>
        {hero.real_name && <h2>{hero.real_name}</h2>}
      </header>

      <section>
        <h3>Origin</h3>
        <p>{hero.origin_description || 'No origin description provided.'}</p>
      </section>

      <section>
        <h3>Superpowers</h3>
        <p>{hero.superpowers || 'Unknown powers.'}</p>
      </section>

      <section>
        <h3>Catch Phrase</h3>
        <blockquote>{hero.catch_phrase || '—'}</blockquote>
      </section>

      <section>
        <h3>Images</h3>
        {hero.images?.length > 0 ? (
          <ul>
            {hero.images.map((img) => (
              <li key={img.id}>
                <img src={createUrl(img.url)} alt={hero.nickname} width={300} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No images available.</p>
        )}
      </section>
    </main>
  );
};
