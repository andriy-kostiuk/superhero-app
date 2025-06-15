import z from 'zod';

export const heroSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: 'Please enter a nickname' })
    .max(100, { message: 'Nickname is too long (max 100 characters)' }),

  real_name: z
    .string()
    .max(100, { message: 'Real name is too long (max 100 characters)' })
    .optional()
    .or(z.literal('')),

  origin_description: z
    .string()
    .max(2000, {
      message: 'Origin description is too long (max 2000 characters)',
    })
    .optional()
    .or(z.literal('')),

  superpowers: z
    .string()
    .max(500, {
      message: 'Superpowers field is too long (max 500 characters)',
    })
    .optional()
    .or(z.literal('')),

  catch_phrase: z
    .string()
    .max(200, { message: 'Catch phrase is too long (max 200 characters)' })
    .optional()
    .or(z.literal('')),

  images: z
    .array(z.instanceof(File))
    .optional()
    .refine((arr) => !arr || arr.length <= 10, {
      message: 'You can upload up to 10 images only',
    })
    .refine(
      (arr) =>
        !arr ||
        arr.every((file) =>
          ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(
            file.type
          )
        ),
      {
        message: 'Only image files (jpg, jpeg, png, webp) are allowed',
      }
    ),
});

export type HeroFormValues = z.infer<typeof heroSchema>;
