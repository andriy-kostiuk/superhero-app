import { type FC } from 'react';

interface Props {
  type: IconType;
}

const icons = {
  arrow: (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 12H19'
        stroke='#25282B'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 5L19 12L12 19'
        stroke='#25282B'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  'arrow-fill': (
    <svg
      enableBackground='new 0 0 512 512'
      height='512'
      viewBox='0 0 512 512'
      width='512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        clipRule='evenodd'
        d='m256 0c141.385 0 256 114.615 256 256s-114.615 256-256 256-256-114.615-256-256 114.615-256 256-256zm134.999 136.608h-81.313l-87.399 119.392 87.4 119.392h81.313l-87.4-119.392zm-121.286 0h-81.313l-87.4 119.392 87.399 119.392h81.313l-87.4-119.392z'
        fillRule='evenodd'
      />
    </svg>
  ),
  loading: (
    <svg
      enableBackground='new 0 0 511.494 511.494'
      height='512'
      viewBox='0 0 511.494 511.494'
      width='512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path d='m478.291 255.492c-16.133.143-29.689 12.161-31.765 28.16-15.37 105.014-112.961 177.685-217.975 162.315s-177.685-112.961-162.315-217.975 112.961-177.685 217.975-162.315c35.796 5.239 69.386 20.476 96.907 43.959l-24.107 24.107c-8.33 8.332-8.328 21.84.004 30.17 4.015 4.014 9.465 6.262 15.142 6.246h97.835c11.782 0 21.333-9.551 21.333-21.333v-97.835c-.003-11.782-9.556-21.331-21.338-21.329-5.655.001-11.079 2.248-15.078 6.246l-28.416 28.416c-105.719-93.664-267.352-83.892-361.017 21.828s-83.891 267.353 21.828 361.018 267.353 83.892 361.017-21.828c32.972-37.216 54.381-83.237 61.607-132.431 2.828-17.612-9.157-34.183-26.769-37.011-1.61-.259-3.237-.395-4.868-.408z' />
      </g>
    </svg>
  ),
  close: (
    <svg
      height='512'
      viewBox='0 0 32 32'
      width='512'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m24.5 7.5a1.5 1.5 0 0 0 -2.121 0l-6.379 6.379-6.377-6.379a1.5 1.5 0 0 0 -2.123 2.123l6.379 6.377-6.379 6.377a1.5 1.5 0 1 0 2.123 2.123l6.377-6.379 6.377 6.379a1.5 1.5 0 0 0 2.123-2.123l-6.379-6.377 6.379-6.377a1.5 1.5 0 0 0 0-2.123z' />
    </svg>
  ),
} as const;

export type IconType = keyof typeof icons;

export const SharedSvg: FC<Props> = ({ type }) => {
  return icons[type] || null;
};
