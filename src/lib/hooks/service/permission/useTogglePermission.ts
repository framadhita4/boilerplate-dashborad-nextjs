import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import _ from 'lodash';
import { enqueueSnackbar } from 'notistack';

import TAGS from '@/constant/tags';
import { getQueryCLient } from '@/lib/react-query/providers';
import fetchHelper from '@/lib/react-query/service/fetchHelper';
import { PermissionType } from '@/lib/types/permission.type';

type MutationContext = {
  previousData?: PermissionType[];
};

const useTogglePermission = (
  role_uuid: string,
  options?: UseMutationOptions<
    void,
    Error,
    { uuid: string; mod_name: string; permission_name: string; value: boolean },
    MutationContext
  >,
) => {
  const queryClient = getQueryCLient();

  return useMutation<
    void,
    Error,
    { uuid: string; mod_name: string; permission_name: string; value: boolean },
    MutationContext
  >({
    ...options,
    mutationFn: async ({ uuid }) =>
      fetchHelper(`/role/update-role-permission`, 'PUT', { role_uuid, permission_uuid: uuid }),
    // onSuccess: (data, variables, context) => {
    //   options?.onSuccess?.(data, variables, context);

    //   queryClient.invalidateQueries({ queryKey: [TAGS.PERMISSIONS, role_uuid] });
    //   enqueueSnackbar('Permission deleted successfully', { variant: 'success' });
    // },
    onMutate: async ({ mod_name, permission_name, value }) => {
      await queryClient.cancelQueries({ queryKey: [TAGS.PERMISSIONS, role_uuid] });

      const previousData = queryClient.getQueryData<PermissionType[]>([
        TAGS.PERMISSIONS,
        role_uuid,
      ]);

      if (previousData) {
        queryClient.setQueryData<PermissionType[]>([TAGS.PERMISSIONS, role_uuid], (oldData) =>
          oldData?.map((item) => {
            if (item.mod_name === mod_name) {
              return {
                ...item,
                permission: item.permission.map((data) => {
                  if (typeof data[permission_name] === 'boolean') {
                    return {
                      ...data,
                      [permission_name]: value,
                    };
                  }
                  return data;
                }),
              };
            }
            return item;
          }),
        );
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);

      queryClient.setQueryData([TAGS.PERMISSIONS, role_uuid], context?.previousData);
      enqueueSnackbar(
        `Failed to update permission ${_.words(variables.mod_name.replaceAll('_', ' ')).map(_.capitalize).join(' ')}`,
        { variant: 'error' },
      );
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables as any, context);

      // queryClient.invalidateQueries({ queryKey: [TAGS.PERMISSIONS, role_uuid] });
    },
  });
};

export default useTogglePermission;
