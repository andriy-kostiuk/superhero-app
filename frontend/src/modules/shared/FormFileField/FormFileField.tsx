import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { SharedSvg } from '../SharedSvg';

interface Props {
  name: string;
  label: string;
  accept?: string;
  max?: number;
  disabled?: boolean;
}

export const FormFileField = ({
  name,
  label,
  accept = 'image/*',
  max = 10,
  disabled = false,
}: Props) => {
  const {
    setValue,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useFormContext();

  const files = (useWatch({ name, control }) as File[]) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combined = [...files, ...newFiles].slice(0, max);
    setValue(name, combined, { shouldValidate: true });

    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setValue(name, updated, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    register(name);
  }, [name, register]);

  const error = errors[name];
  const errorMessage =
    typeof error?.message === 'string' ? error.message : undefined;

  return (
    <div
      className={classNames(styles.group, {
        [styles['group--invalid']]: !!error,
      })}
    >
      <input
        id={name}
        type='file'
        accept={accept}
        multiple
        onChange={handleChange}
        className={classNames(styles.group__field, 'visually-hidden')}
        disabled={isSubmitting || disabled}
      />

      <label htmlFor={name} className={styles.group__label}>
        {label}

        {files.length > 0 && ` (${files.length}/${max} selected)`}
      </label>

      {errorMessage && <p className={styles.group__err}>{errorMessage}</p>}

      {files.length > 0 && (
        <ul className={styles.group__previewList}>
          {files.map((file, i) => (
            <li
              className={styles.group__previewItem}
              key={`${file.name}-${file.size}-${i}`}
            >
              <button
                type='button'
                onClick={() => handleRemove(i)}
                className={styles.group__removeBtn}
              >
                <SharedSvg type='close' />
              </button>
              <img
                className={styles.group__previewImage}
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <p>
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
