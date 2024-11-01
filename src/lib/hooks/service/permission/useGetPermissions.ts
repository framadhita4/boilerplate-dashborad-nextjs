import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import { AllPermissionsType } from '@/lib/types/permission.type';

const useGetPermissions = (options?: UseQueryOptions<AllPermissionsType[]>) => {
  return useQuery<AllPermissionsType[]>({
    ...options,
    queryFn: async () => fetchHelper(`/get-all-permission`),
    queryKey: [TAGS.PERMISSIONS],
  });
};

export default useGetPermissions;
