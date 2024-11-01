import { useQuery } from '@tanstack/react-query';

import TAGS from '../../../../constant/tags';
import fetchHelper from '../../../react-query/service/fetchHelper';
import { AuthType } from '../../../types/auth.type';

const useGetUserInfo = () => {
  return useQuery<AuthType>({
    queryKey: [TAGS.AUTH],
    queryFn: async () => fetchHelper('/get-user-session-information'),
  });
};

export default useGetUserInfo;
