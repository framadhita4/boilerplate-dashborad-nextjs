import { z } from 'zod';

export interface RoleFormType {
  name: string;
  code: string;
  description: string;
}

export const defaultRoleForm: RoleFormType = {
  name: '',
  code: '',
  description: '',
};

export const roleFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  code: z.string().min(1, { message: 'Code is required' }),
  description: z.string(),
});
