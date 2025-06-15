import { useState } from 'react';
import { HeroForm } from './components/HeroForm';
import { Heroes } from './components/Heroes';

export const HomePage = () => {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const handleHeroesReload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <>
      <h1 className='visually-hidden'>SuperHero application</h1>
      <Heroes key={reloadTrigger} />
      <HeroForm triggerHeroesReload={handleHeroesReload} />
    </>
  );
};
