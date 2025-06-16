import { useCallback, useState, type FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  heroSchema,
  type HeroFormValues,
} from '@/modules/shared/zodSchema/hero';
import { Popup } from '@/modules/shared/Popup';
import { createHero } from '@/api/hero';
import { ApiError } from '@/utils/apiError';
import { useFormData } from '@/hooks';
import { FormTextField } from '@/modules/shared/FormTextField';
import { FormFileField } from '@/modules/shared/FormFileField';

import styles from './styles.module.scss';
import type { Field } from '@/types';
import { ButtonWithLoader } from '@/modules/shared/ButtonWithLoader';

const fields: Field<HeroFormValues>[] = [
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

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

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

  const handlePopupClose = useCallback(() => {
    setPopup((prev) => ({ ...prev, message: '' }));
  }, []);

  return (
    <>
      <div className={styles.heroForm}>
        <div className='container'>
          <h2 className={styles.heroForm__title}>Create your hero now!</h2>
          <FormProvider {...form}>
            <form
              className={styles.heroForm__form}
              onSubmit={handleSubmit(onSubmit)}
              encType='multipart/form-data'
            >
              {fields.map(({ name, label, type }) => {
                return (
                  <FormTextField<HeroFormValues>
                    key={name}
                    name={name}
                    type={type}
                    label={label}
                  />
                );
              })}

              <FormFileField
                name='images'
                accept='image/png, image/jpeg, image/webp'
                label='Images (max 10)'
              />

              <ButtonWithLoader isSubmitting={isSubmitting}>
                {isSubmitting ? 'Creating Hero...' : 'Create Hero'}
              </ButtonWithLoader>
            </form>
          </FormProvider>
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
