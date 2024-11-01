import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';

const useDeleteRole = (options?: UseMutationOptions<any, unknown, { uuid: string }, unknown>) => {
  const queryClient = getQueryCLient();

  return useMutation({
    ...options,
    mutationFn: async ({ uuid }) => fetchHelper(`/role/${uuid}`, 'DELETE'),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.invalidateQueries({ queryKey: [TAGS.ROLE] });
      enqueueSnackbar('Role deleted successfully', { variant: 'success' });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);

      enqueueSnackbar('Failed to delete role', { variant: 'error' });
    },
  });
};

export default useDeleteRole;
