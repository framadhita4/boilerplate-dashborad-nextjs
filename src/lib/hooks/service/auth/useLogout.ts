import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { deleteCookie } from 'cookies-next';
import { enqueueSnackbar } from 'notistack';

import TAGS from '../../../../constant/tags';
import { getQueryCLient } from '../../../react-query/providers';
import fetchHelper from '../../../react-query/service/fetchHelper';

const useLogout = (callback?: () => void) => {
  const queryClient = getQueryCLient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const result = await fetchHelper('/do-logout', 'POST');
      return result;
    },
    onSuccess: () => {
      enqueueSnackbar('Logout Successfully', { variant: 'success' });
      deleteCookie('token');
      // router.push('/login');

      queryClient.invalidateQueries({ queryKey: [TAGS.AUTH] });

      if (callback) callback();
    },
    onError: (error) => {
      enqueueSnackbar(error.message || 'Logout failed', { variant: 'error' });
    },
  });
};

export default useLogout;
