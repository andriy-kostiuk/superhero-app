import { useCallback } from 'react';

type FormDataValue = string | number | boolean | File | null | undefined;
type FormDataInput = Record<string, FormDataValue | FormDataValue[]>;

export const useFormData = () => {
  const createFormData = useCallback((data: FormDataInput): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(key, item);
          } else if (item != null && item !== '') {
            formData.append(key, String(item));
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value != null) {
        formData.append(key, String(value));
      }
    });

    return formData;
  }, []);

  return {
    createFormData,
  };
};

export type { FormDataInput, FormDataValue };
