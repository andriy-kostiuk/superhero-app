import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { HeroImage } from '@/types';
import type { HeroEditFormValues } from '@/modules/shared/zodSchema/hero';
import { createUrl } from '@/utils/utility';
import { FormFileField } from '@/modules/shared/FormFileField';

import styles from './styles.module.scss';
import classNames from 'classnames';

interface Props {
  initialImages: HeroImage[];
}

export const HeroImagesEditor: React.FC<Props> = ({ initialImages }) => {
  const { setValue, register } = useFormContext<HeroEditFormValues>();
  const deletedImageIds = useWatch({ name: 'deletedImageIds' }) || [];

  const toggleImageDelete = (id: number, checked: boolean) => {
    const updated = checked
      ? Array.from(new Set([...deletedImageIds, id]))
      : deletedImageIds.filter((v: number) => v !== id);

    setValue('deletedImageIds', updated, { shouldValidate: true });
  };

  useEffect(() => {
    register('deletedImageIds');
  }, [register]);

  return (
    <div className={styles.editor}>
      {!!initialImages.length && (
        <div className={styles.editor__block}>
          <p className={styles.editor__title}>Existing Images</p>
          <ul className={styles.editor__list}>
            {initialImages.map((img) => {
              const imgUrl = createUrl(img.url);
              const isDeleted = deletedImageIds.includes(img.id);

              return (
                <li key={img.id} className={styles.editor__item}>
                  <label
                    htmlFor={`image-${img.id}`}
                    className={classNames(styles.editor__label, {
                      [styles['editor__label--checked']]: isDeleted,
                    })}
                  >
                    <span className='visually-hidden'>
                      Toggle image deleting
                    </span>
                    <img
                      src={imgUrl}
                      alt={`Hero image ${img.id}`}
                      className={styles.editor__image}
                      loading='lazy'
                    />
                  </label>

                  <input
                    id={`image-${img.id}`}
                    type='checkbox'
                    checked={isDeleted}
                    onChange={(e) =>
                      toggleImageDelete(+img.id, e.target.checked)
                    }
                    className='visually-hidden'
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <FormFileField name='images' label='Upload New Images' />
    </div>
  );
};
