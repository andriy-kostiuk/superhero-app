import { BASE_URL } from './constants';

export const firstLetterCap = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const disableScroll = () => {
  document.body.classList.add('bodyOverflow');
};

export const enableScroll = () => {
  document.body.classList.remove('bodyOverflow');
};

export const createUrl = (path: string) => {
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
};
