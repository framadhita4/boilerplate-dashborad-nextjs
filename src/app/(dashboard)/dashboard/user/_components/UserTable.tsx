import { memo, useMemo, useState } from 'react';

import Link from 'next/link';

import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';

import { randBoolean, randEmail, randFullName, randNumber, randPastDate } from '@ngneat/falso';
import { useDebounce } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import DataGrid from '@/components/mui/data-grid';
import Menu from '@/components/mui/menu';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';
import useDeleteUser from '@/lib/hooks/service/user/useDeleteUser';
import useGetUsers from '@/lib/hooks/service/user/useGetUsers';
import useTablePagination from '@/lib/hooks/useTablePagination';
import UserType from '@/lib/types/user.type';
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
      flex: 2,
      // renderCell: (params) => {
      //   const { row } = params;
      //   return (
      //     <div className="flex h-full items-center gap-3 py-3">
      //       <Typography variant="body1" className="truncate">
      //         {row.name}
      //         <br />
      //         <Typography variant="caption">{row.email}</Typography>
      //       </Typography>
      //     </div>
      //   );
      // },
    },
    {
      field: 'role_name',
      headerName: 'Role',
      flex: 1,
      valueGetter: (_, v) => v.role.name,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'last_login',
      headerName: 'Last Login',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      type: 'boolean',
    },
    {
      field: 'project_assigned',
      headerName: 'Project Assigned',
      flex: 1,
    },
    // ...generateCreatedUpdatedColumn(),
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

  return (
    <>
      <div className="flex h-1 flex-grow flex-col">
        <DataGrid
          rows={Array.from({ length: 10 }).map(() => ({
            id: randNumber({ min: 10000, max: 99999 }).toString(),
            name: randFullName(),
            email: randEmail(),
            last_login: dayjs(randPastDate()).format('YYYY-MM-DD HH:mm:ss'),
            project_assigned: randNumber({ min: 1, max: 20 }),
            status: randBoolean(),
            role: {
              name: 'Admin',
              uuid: randNumber({ min: 10000, max: 99999 }).toString(),
            },
          }))}
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
          // paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          // paginationResponse={rawData?.pagination}
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
