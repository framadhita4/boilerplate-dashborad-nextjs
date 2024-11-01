import { useRouter } from 'next/navigation';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { UserFormType } from '@/app/(dashboard)/dashboard/user/_utils/user-schema';
import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import parseObjectRequest from '@/lib/utils/parseObjectRequest';

const useCreateUser = (options?: UseMutationOptions<any, unknown, UserFormType, unknown>) => {
  const queryClient = getQueryCLient();
  const router = useRouter();

  return useMutation({
    ...options,
    mutationFn: async (data) => fetchHelper(`/user`, 'POST', await parseObjectRequest(data)),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      queryClient.invalidateQueries({ queryKey: [TAGS.USER] });
      enqueueSnackbar('User created successfully', { variant: 'success' });

      router.push('/dashboard/user');
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);

      enqueueSnackbar('Failed to create user', { variant: 'error' });
    },
  });
};

export default useCreateUser;
