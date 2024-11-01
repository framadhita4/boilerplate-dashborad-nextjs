import { useRouter } from 'next/navigation';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { RoleFormType } from '@/app/(dashboard)/dashboard/role/_utils/role-schema';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';

const useUpdateRole = (
  uuid: string,
  options?: UseMutationOptions<any, unknown, RoleFormType, unknown>,
) => {
  const queryClient = getQueryCLient();
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: async (data) => fetchHelper(`/role/${uuid}`, 'PUT', data),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.invalidateQueries({ queryKey: [TAGS.ROLE] });
      queryClient.invalidateQueries({ queryKey: [TAGS.ROLE, uuid] });
      enqueueSnackbar('Role updated successfully', { variant: 'success' });

      router.push('/dashboard/role');
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);

      enqueueSnackbar('Failed to update role', { variant: 'error' });
    },
  });
};

export default useUpdateRole;
