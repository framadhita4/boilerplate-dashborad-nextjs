import { memo, useMemo, useState } from 'react';

import { GridColDef } from '@mui/x-data-grid';

import { useDebounce } from '@uidotdev/usehooks';

import DataGrid from '@/components/mui/data-grid';
import useGetPermissions from '@/lib/hooks/service/permission/useGetPermissions';
import searchFilter from '@/lib/utils/searchFilter';

import PermissionCheckbox from './PermissionCheckbox';
import PermissionTableToolbar, { RoleTableToolbarProps } from './PermissionTableToolbar';

interface Props {
  uuid: string;
}

const PermissionTable = ({ uuid }: Props) => {
  const { data: rawData, isLoading } = useGetPermissions();

  const data = useMemo(() => {
    return rawData
      ? rawData.map((item, i) => ({
          ...item,
          id: i + 1,
        }))
      : [];
  }, [rawData]);

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: 'name',
      headerName: 'Permission',
      flex: 1,
    },
    {
      field: 'access',
      headerName: 'Access',
      flex: 3,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return <PermissionCheckbox role_uuid={uuid} data={row} />;
      },
    },
  ];

  const [searchText, setSearchText] = useState('');
  const debounceSearch = useDebounce(searchText, 300);

  const filteredRows = useMemo(() => {
    return searchFilter(data, debounceSearch, ['name']);
  }, [debounceSearch, data]);

  return (
    <div className="flex h-1 flex-grow flex-col">
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={isLoading}
        checkboxSelection={false}
        slotProps={{
          toolbar: {
            onSearch: (val) => setSearchText(val),
          } as RoleTableToolbarProps,
        }}
        slots={{
          toolbar: PermissionTableToolbar as any,
        }}
      />
    </div>
  );
};

export default memo(PermissionTable);
