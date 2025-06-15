import { useCallback, useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { heroSchema, type HeroFormValues } from '../../zodSchema/hero';
import { Loading } from '@/modules/shared/Loading';
import { Popup } from '@/modules/shared/Popup';

import styles from './styles.module.scss';
import { createHero } from '@/api/hero';
import { ApiError } from '@/utils/apiError';
import { useFormData } from '@/hooks';

type FieldName = keyof HeroFormValues;

interface Field {
  name: FieldName;
  label: string;
  type: 'text' | 'textarea';
}

const fields: Field[] = [
  { name: 'nickname', label: 'Nickname', type: 'text' },
  { name: 'real_name', label: 'Real Name', type: 'text' },
  {
    name: 'origin_description',
    label: 'Origin Description',
    type: 'textarea',
  },
  {
    name: 'superpowers',
    label: 'Superpowers',
    type: 'textarea',
  },
  {
    name: 'catch_phrase',
    label: 'Catch Phrase',
    type: 'text',
  },
];

type PopupType = 'error' | 'success';

interface Props {
  triggerHeroesReload?: () => void;
}

export const HeroForm: FC<Props> = ({ triggerHeroesReload = () => {} }) => {
  const { createFormData } = useFormData();
  const [popup, setPopup] = useState<{ message: string; type: PopupType }>({
    message: '',
    type: 'error',
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
  });

  const images = watch('images') || [];

  const onSubmit = async (data: HeroFormValues) => {
    const formData = createFormData(data);

    try {
      await createHero(formData);
      reset();
      setPopup({ message: 'Hero created successfully!', type: 'success' });
      triggerHeroesReload();
    } catch (error) {
      if (error instanceof ApiError) {
        setPopup({ message: error.message, type: 'error' });
      } else {
        setPopup({ message: String(error), type: 'error' });
      }
    }
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      setValue('images', Array.from(files), { shouldValidate: true });
    },
    [setValue]
  );

  const handlePopupClose = useCallback(() => {
    setPopup((prev) => ({ ...prev, message: '' }));
  }, []);

  return (
    <>
      <div className={styles.heroForm}>
        <div className='container'>
          <h2 className={styles.heroForm__title}>Create your hero now!</h2>
          <form
            className={styles.heroForm__form}
            onSubmit={handleSubmit(onSubmit)}
            encType='multipart/form-data'
          >
            {fields.map(({ name, label, type }) => {
              const errorMessage = errors[name]?.message?.toString();

              return (
                <div
                  key={name}
                  className={classNames(styles.heroForm__group, {
                    [styles['heroForm__group--invalid']]: !!errors[name],
                  })}
                >
                  <label className={styles.heroForm__label} htmlFor={name}>
                    {label}
                  </label>
                  {type === 'textarea' ? (
                    <textarea
                      {...register(name)}
                      id={name}
                      className={styles.heroForm__field}
                      disabled={isSubmitting}
                    />
                  ) : (
                    <input
                      {...register(name)}
                      id={name}
                      className={styles.heroForm__field}
                      type='text'
                      disabled={isSubmitting}
                    />
                  )}
                  {errorMessage && (
                    <p className={styles.heroForm__err}>{errorMessage}</p>
                  )}
                </div>
              );
            })}

            <div
              className={classNames(styles.heroForm__group, {
                [styles['heroForm__group--invalid']]: !!errors.images,
              })}
            >
              <label className={styles.heroForm__label} htmlFor='images'>
                Images (max 10)
              </label>
              <input
                type='file'
                accept='image/png, image/jpeg, image/webp'
                multiple
                onChange={handleFileChange}
                className={styles.heroForm__field}
                disabled={isSubmitting}
                id='images'
              />
              {errors.images?.message && (
                <p className={styles.heroForm__err}>{errors.images.message}</p>
              )}
              {images.length > 0 && (
                <ul className={styles.heroForm__previewList}>
                  {images.map((file, idx) => (
                    <li className={styles.heroForm__previewItem} key={idx}>
                      <p>{file.name}</p>
                      <p>({(file.size / 1024).toFixed(1)} KB)</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.heroForm__submitWrapper}>
              {isSubmitting && (
                <div className={styles.heroForm__loading} role='status'>
                  <Loading />
                </div>
              )}
              <button
                type='submit'
                disabled={isSubmitting}
                className={styles.heroForm__submit}
              >
                {isSubmitting ? 'Creating Hero...' : 'Create Hero'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Popup
        message={popup.message}
        type={popup.type}
        onClose={handlePopupClose}
        autoClose={3000}
      />
    </>
  );
};
