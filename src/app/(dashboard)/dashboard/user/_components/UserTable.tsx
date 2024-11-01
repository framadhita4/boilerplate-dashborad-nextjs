import { memo, useMemo, useState } from 'react';

import Link from 'next/link';

import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';

import { useDebounce } from '@uidotdev/usehooks';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import DataGrid from '@/components/mui/data-grid';
import Menu from '@/components/mui/menu';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';
import useDeleteUser from '@/lib/hooks/service/user/useDeleteUser';
import useGetUsers from '@/lib/hooks/service/user/useGetUsers';
import useTablePagination from '@/lib/hooks/useTablePagination';
import generateCreatedUpdatedColumn from '@/lib/utils/generateCreatedUpdatedColumn';
import searchFilter from '@/lib/utils/searchFilter';

import UserTableToolbar, { UserTableToolbarProps } from './UserTableToolbar';

const UserTable = () => {
  const checkPermission = usePermission();
  const [uuid, setUuid] = useState('');
  const { paginationModel, setPaginationModel, search, setSearch } = useTablePagination();

  const { data: rawData, isLoading } = useGetUsers({
    with_pagination: 'true',
    page: `${paginationModel.page + 1}`,
    per_page: `${paginationModel.pageSize}`,
    search_param: search,
  });

  const { mutate, isPending } = useDeleteUser({
    onSuccess: () => setUuid(''),
  });

  const data = useMemo(() => {
    return rawData
      ? rawData.data.map((item) => ({
          ...item,
          id: item.uuid,
        }))
      : [];
  }, [rawData]);

  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: 'name',
      headerName: 'Name',
      hideable: false,
      flex: 3,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="flex h-full items-center gap-3 py-3">
            <Avatar className="size-12" src={row.photo?.url} />
            <Typography variant="body1" className="truncate">
              {row.user_information.name}
              <br />
              <Typography variant="caption">{row.email}</Typography>
            </Typography>
          </div>
        );
      },
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
      valueGetter: (_, v) => v.user_information.position,
    },
    {
      field: 'phone_number',
      headerName: 'Phone number',
      flex: 1,
      valueGetter: (_, v) => v.user_information.phone_number,
    },
    {
      field: 'role_name',
      headerName: 'Role',
      flex: 1,
      valueGetter: (_, v) => v.role.name,
    },
    ...generateCreatedUpdatedColumn(),
    {
      field: 'uuid',
      headerName: '',
      width: 50,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      type: 'actions',
      renderCell: (params) => {
        return (
          <Menu
            Button={IconButton}
            buttonProps={{
              children: <EllipsisVertical size={20} />,
            }}
            PaperProps={{
              className: 'min-w-40',
            }}
          >
            <Link href={checkPermission('user', 'edit') ? `/dashboard/user/${params.value}` : '#'}>
              <MenuItem disabled={!checkPermission('user', 'edit')}>
                <ListItemIcon>
                  <Pencil size={20} />
                </ListItemIcon>
                Edit
              </MenuItem>
            </Link>
            <MenuItem
              className="text-red-500"
              onClick={() => setUuid(params.value)}
              disabled={!checkPermission('user', 'delete')}
            >
              <ListItemIcon>
                <Trash2 size={20} className="text-red-500" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        );
      },
    },
  ];

  // const [searchText, setSearchText] = useState('');
  // const debounceSearch = useDebounce(searchText, 300);

  // const filteredRows = useMemo(() => {
  //   return searchFilter(data, debounceSearch, [
  //     'user_information.name',
  //     'email',
  //     'user_information.phone_number',
  //     'user_information.position',
  //     'role.name',
  //   ]);
  // }, [debounceSearch, data]);

  return (
    <>
      <div className="flex h-1 flex-grow flex-col">
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          checkboxSelection={false}
          slotProps={{
            toolbar: {
              onSearch: (val) => setSearch(val),
            } as UserTableToolbarProps,
          }}
          slots={{
            toolbar: UserTableToolbar as any,
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationResponse={rawData?.pagination}
        />
      </div>
      <DeleteConfirmationModal
        open={!!uuid}
        onClose={() => setUuid('')}
        onConfirm={() => mutate({ uuid })}
        loading={isPending}
        title="Delete User"
        content="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
};

export default memo(UserTable);
