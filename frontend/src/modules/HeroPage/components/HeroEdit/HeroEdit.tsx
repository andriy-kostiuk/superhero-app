import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateHero } from '@/api/hero';
import { ApiError } from '@/utils/apiError';
import { type Field, type Hero } from '@/types';
import { HeroImagesEditor } from '../HeroImagesEditor';
import {
  heroEditSchema,
  type HeroEditFormValues,
} from '@/modules/shared/zodSchema/hero';
import { FormTextField } from '@/modules/shared/FormTextField';

import styles from './styles.module.scss';
import { ButtonWithLoader } from '@/modules/shared/ButtonWithLoader';
import { useFormData } from '@/hooks';
import { Popup } from '@/modules/shared/Popup';
import { useEffect, useRef, useState } from 'react';

const fields: Field<HeroEditFormValues>[] = [
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

interface Props {
  hero: Hero;
  onSave: (hero: Hero) => void;
  onCancel: () => void;
  onRefetch: () => void;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export const HeroEdit: React.FC<Props> = ({
  hero,
  onSave,
  onCancel,
  onRefetch,
  onSubmittingChange,
}) => {
  const { createFormData } = useFormData();
  const [error, setError] = useState('');

  const prevSubmittingRef = useRef(false);

  const form = useForm<HeroEditFormValues>({
    resolver: zodResolver(heroEditSchema),
    defaultValues: {
      nickname: hero.nickname,
      real_name: hero.real_name || '',
      origin_description: hero.origin_description || '',
      superpowers: hero.superpowers || '',
      catch_phrase: hero.catch_phrase || '',
      images: [],
      deletedImageIds: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (prevSubmittingRef.current !== isSubmitting) {
      onSubmittingChange?.(isSubmitting);
      prevSubmittingRef.current = isSubmitting;
    }

    return () => {
      if (onSubmittingChange) {
        onSubmittingChange(false);
      }
    };
  }, [isSubmitting, onSubmittingChange]);

  const onSubmit = async (data: HeroEditFormValues) => {
    setError('');
    const formData = createFormData(data);

    try {
      const updatedHero = await updateHero(hero.id, formData);

      onSave(updatedHero);
      onCancel();
      onRefetch();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {fields.map(({ name, label, type }) => (
            <FormTextField<HeroEditFormValues>
              key={name}
              name={name}
              label={label}
              type={type}
            />
          ))}

          <HeroImagesEditor initialImages={hero.images} />

          <ButtonWithLoader isSubmitting={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </ButtonWithLoader>
        </form>
      </FormProvider>

      {error && <Popup type='error' message={error} autoClose={3000} />}
    </>
  );
};
