import { skipToken, useQuery, UseQueryOptions } from '@tanstack/react-query';

import TAGS from '@/constant/tags';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import { PermissionType } from '@/lib/types/permission.type';

const useGetPermissionUser = (
  uuid: string | undefined,
  options?: UseQueryOptions<PermissionType[]>,
) => {
  return useQuery<PermissionType[]>({
    ...options,
    queryFn: uuid ? async () => fetchHelper(`/role/${uuid}/get-user-permission`) : skipToken,
    queryKey: [TAGS.PERMISSIONS, uuid],
  });
};

export default useGetPermissionUser;
