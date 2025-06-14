import { HeroForm } from './components/HeroForm';
import { Heroes } from './components/Heroes';

export const HomePage = () => {
  return (
    <>
      <h1 className='visually-hidden'>SuperHero application</h1>
      <Heroes />
      <HeroForm />
    </>
  );
};
