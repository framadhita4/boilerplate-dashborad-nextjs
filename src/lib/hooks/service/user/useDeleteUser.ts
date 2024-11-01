import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';

const useDeleteUser = (options?: UseMutationOptions<any, unknown, { uuid: string }, unknown>) => {
  const queryClient = getQueryCLient();

  return useMutation({
    ...options,
    mutationFn: async ({ uuid }) => fetchHelper(`/user/${uuid}`, 'DELETE'),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.invalidateQueries({ queryKey: [TAGS.USER] });
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);

      enqueueSnackbar('Failed to delete user', { variant: 'error' });
    },
  });
};

export default useDeleteUser;
