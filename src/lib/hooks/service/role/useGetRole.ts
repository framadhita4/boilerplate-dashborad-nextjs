import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import RoleType from '@/lib/types/role.type';

const useGetRole = (uuid: string, options?: UseQueryOptions<RoleType>) => {
  return useQuery<RoleType>({
    ...options,
    queryFn: async () => {
      const res = await fetchHelper(`/role/${uuid}`);
      return res.data;
    },
    queryKey: [TAGS.ROLE, uuid],
  });
};

export default useGetRole;
