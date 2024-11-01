import { memo, useMemo, useState } from 'react';

import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { GridColDef } from '@mui/x-data-grid';

import { useDebounce } from '@uidotdev/usehooks';
import { EllipsisVertical, Pencil, ShieldCheck, Trash2 } from 'lucide-react';

import ImageContainer from '@/components/ImageContainer';
import DataGrid from '@/components/mui/data-grid';
import Menu from '@/components/mui/menu';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import TAGS from '@/constant/tags';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';
import useDeleteRole from '@/lib/hooks/service/role/useDeleteRole';
import useGetRoles from '@/lib/hooks/service/role/useGetRoles';
import useTablePagination from '@/lib/hooks/useTablePagination';
import generateCreatedUpdatedColumn from '@/lib/utils/generateCreatedUpdatedColumn';
import searchFilter from '@/lib/utils/searchFilter';

import RoleTableToolbar, { RoleTableToolbarProps } from './RoleTableToolbar';

const RoleTable = () => {
  const checkPermission = usePermission();
  const [uuid, setUuid] = useState('');

  const { paginationModel, setPaginationModel, search, setSearch } = useTablePagination();

  const { data: rawData, isLoading } = useGetRoles({
    with_pagination: 'true',
    page: `${paginationModel.page + 1}`,
    per_page: `${paginationModel.pageSize}`,
    search_param: search,
  });
  const { mutate, isPending } = useDeleteRole();

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
      flex: 1,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 120,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
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
            <Link
              href={
                checkPermission('role_permission', 'edit')
                  ? `/dashboard/role/${params.value}/permission`
                  : '#'
              }
            >
              <MenuItem disabled={!checkPermission('role_permission', 'edit')}>
                <ListItemIcon>
                  <ShieldCheck size={20} />
                </ListItemIcon>
                Permission
              </MenuItem>
            </Link>
            <Link href={checkPermission('role', 'edit') ? `/dashboard/role/${params.value}` : '#'}>
              <MenuItem disabled={!checkPermission('role', 'view')}>
                <ListItemIcon>
                  <Pencil size={20} />
                </ListItemIcon>
                Edit
              </MenuItem>
            </Link>
            <MenuItem
              className="text-red-500"
              onClick={() => setUuid(params.value)}
              disabled={!checkPermission('role', 'delete')}
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
  //   return searchFilter(data, debounceSearch, ['name', 'description', 'code']);
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
            } as RoleTableToolbarProps,
          }}
          slots={{
            toolbar: RoleTableToolbar as any,
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
        title="Delete Role"
        content="Are you sure you want to delete this role? This action cannot be undone."
      />
    </>
  );
};

export default memo(RoleTable);
