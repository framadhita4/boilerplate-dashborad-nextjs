import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { enqueueSnackbar } from 'notistack';

import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';

interface Body {
  email: string;
  password: string;
}

interface CallbackType {
  callback?: () => void;
  errorCallback?: (err: string) => void;
}

const useLogin = ({ callback, errorCallback }: CallbackType) => {
  const queryClient = getQueryCLient();
  const router = useRouter();
  const params = useSearchParams();

  return useMutation<any, any, Body>({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await fetchHelper('/do-login', 'POST', { email, password });
      return result;
    },
    onSuccess: (data) => {
      setCookie('token', data.data.token, { sameSite: true });
      enqueueSnackbar(data.message, { variant: 'success' });

      const fallbackUrl = params.get('fallback');
      router.push(fallbackUrl || '/dashboard/home');

      queryClient.invalidateQueries({ queryKey: [TAGS.AUTH] });

      if (callback) callback();
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error('Error : ', err);
      if (errorCallback) errorCallback((err as any).response.data.message);
    },
  });
};

export default useLogin;
