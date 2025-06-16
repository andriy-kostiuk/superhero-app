import type { Path } from 'react-hook-form';

export type Field<T> = {
  name: Path<T>;
  label: string;
  type: 'text' | 'textarea';
};
