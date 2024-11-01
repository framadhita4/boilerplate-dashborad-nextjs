import { z } from 'zod';

export interface LoginFormType {
  email: string;
  password: string;
}

export const loginDefault: LoginFormType = {
  email: '',
  password: '',
};

export const loginSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }),
  password: z.string().trim().min(1, { message: 'Password is required' }),
});
