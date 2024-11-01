import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import { ResponseWrapperType } from '@/lib/types/globals.type';
import UserType from '@/lib/types/user.type';

const useGetUsers = (
  params?: Record<string, string>,
  options?: UseQueryOptions<ResponseWrapperType<UserType[]>>,
) => {
  return useQuery<ResponseWrapperType<UserType[]>>({
    ...options,
    queryFn: async () => {
      const res = await fetchHelper(`/user?${new URLSearchParams(params)}`);
      return res;
    },
    queryKey: [TAGS.USER, params],
  });
};

export default useGetUsers;
