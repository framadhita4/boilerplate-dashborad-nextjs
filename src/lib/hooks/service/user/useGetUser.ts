import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import UserType from '@/lib/types/user.type';

const useGetUser = (uuid: string, options?: UseQueryOptions<UserType>) => {
  return useQuery<UserType>({
    ...options,
    queryFn: async () => {
      const res = await fetchHelper(`/user/${uuid}`);
      return res.data;
    },
    queryKey: [TAGS.USER, uuid],
  });
};

export default useGetUser;
