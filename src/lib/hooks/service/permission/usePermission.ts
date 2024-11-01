'use client';

import { useCallback, useEffect } from 'react';

import { setCookie } from 'cookies-next';

import { encryptData } from '@/lib/utils/encrypt';

import useGetUserInfo from '../auth/useGetUserInfo';
import useGetPermissionUser from './useGetPermissionUser';

export const usePermission = (uuid?: string) => {
  const { data, isLoading } = useGetUserInfo();
  const { data: permissionsData } = useGetPermissionUser(uuid || data?.role?.uuid);

  useEffect(() => {
    if (permissionsData) setCookie('permissions', encryptData(permissionsData), { sameSite: true });
  }, [permissionsData]);

  return useCallback(
    (moduleName: string, permission: 'view' | 'create' | 'edit' | 'delete') => {
      const mod = permissionsData?.find((module) => module.mod_name === moduleName);
      return mod?.permission?.some((d) => d[permission]);
    },
    [permissionsData],
  );
};
