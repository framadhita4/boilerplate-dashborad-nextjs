import { z } from 'zod';

export interface UserFormType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  position: string;
  role_uuid: string;
  // asset_category: string;
  photo_uuid?: string;
}

export const defaultUserForm: UserFormType = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone_number: '62',
  position: '',
  role_uuid: '',
  // asset_category: '',
  photo_uuid: '',
};

export const userFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Email not valid' }),
    password: z.string().min(1, { message: 'Password is required' }),
    password_confirmation: z.string().min(1, { message: 'Password confirmation is required' }),
    phone_number: z.string().min(4, { message: 'Phone number is required' }),
    position: z.string().min(1, { message: 'Position is required' }),
    role_uuid: z.string().min(1, { message: 'Role is required' }),
    // asset_category: z.string().min(1, { message: 'Asset category is required' }),
    photo_uuid: z.union([
      z.string({ message: 'Image is required' }).min(1, { message: 'Image is required' }),
      z.instanceof(File, { message: 'Image is required' }).refine(
        (file) => {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

          return allowedTypes.includes(file.type) && file.size <= maxSizeInBytes;
        },
        {
          message:
            'Invalid file. Only JPEG/PNG images are allowed and file size should not exceed 5MB.',
        },
      ),
    ]),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  });
