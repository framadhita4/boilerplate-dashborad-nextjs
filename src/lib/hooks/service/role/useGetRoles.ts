import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import { ResponseWrapperType } from '@/lib/types/globals.type';
import RoleType from '@/lib/types/role.type';

const useGetRoles = (
  params?: Record<string, string>,
  options?: UseQueryOptions<ResponseWrapperType<RoleType[]>>,
) => {
  return useQuery<ResponseWrapperType<RoleType[]>>({
    ...options,
    queryFn: async () => {
      const res = await fetchHelper(`/role?${new URLSearchParams(params)}`);
      return res;
    },
    queryKey: [TAGS.ROLE, params],
  });
};

export default useGetRoles;
