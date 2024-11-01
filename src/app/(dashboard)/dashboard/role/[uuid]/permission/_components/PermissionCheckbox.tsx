import { useEffect } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';

import _ from 'lodash';

import { usePermission } from '@/lib/hooks/service/permission/usePermission';
import useTogglePermission from '@/lib/hooks/service/permission/useTogglePermission';
import { AllPermissionsType } from '@/lib/types/permission.type';

interface Props {
  data: AllPermissionsType;
  role_uuid: string;
}

const PermissionCheckbox = ({ data, role_uuid }: Props) => {
  const checkPermission = usePermission(role_uuid);

  const { mutate } = useTogglePermission(role_uuid);

  return (
    <div className="flex h-full flex-wrap items-center gap-6">
      {data.permission.map(({ name, uuid }, i) => (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              disabled={
                !checkPermission('assign_permission_to_role', 'add_remove_permission' as any)
              }
              className="!pr-0"
              checked={!!checkPermission(data.mod_name, name as any)}
              onChange={(__, value) =>
                mutate({ value, mod_name: data.mod_name, permission_name: name, uuid })
              }
            />
          }
          label={_.words(name.replaceAll('_', ' ')).map(_.capitalize).join(' ')}
        />
      ))}
    </div>
  );
};

export default PermissionCheckbox;
