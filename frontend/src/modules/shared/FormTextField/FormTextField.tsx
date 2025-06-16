import { useFormContext, type FieldError } from 'react-hook-form';
import classNames from 'classnames';
import styles from './styles.module.scss';
import type { Field } from '@/types';
import get from 'lodash/get';

type Props<T> = Field<T>;

export const FormTextField = <T extends Record<string, unknown>>({
  name,
  label,
  type = 'text',
}: Props<T>) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const error = get(errors, name) as FieldError | undefined;

  const errorMessage = typeof error?.message === 'string' ? error.message : '';

  return (
    <div
      className={classNames(styles.group, {
        [styles['group--invalid']]: !!error,
      })}
    >
      <label htmlFor={String(name)} className={styles.group__label}>
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          {...register(name)}
          id={String(name)}
          className={styles.group__field}
          disabled={isSubmitting}
        />
      ) : (
        <input
          {...register(name)}
          id={String(name)}
          className={styles.group__field}
          type='text'
          disabled={isSubmitting}
        />
      )}

      {errorMessage && <p className={styles.group__err}>{errorMessage}</p>}
    </div>
  );
};
