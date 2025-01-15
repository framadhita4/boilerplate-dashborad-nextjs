import { useMemo, useRef } from 'react';

import { DataGrid as MuiDataGrid, DataGridProps, GridPaginationMeta } from '@mui/x-data-grid';

import { ChevronDown, ChevronUp, Ellipsis, Eye, EyeOff, Filter } from 'lucide-react';

import { PaginationType } from '@/lib/types/globals.type';
import { cn } from '@/lib/utils';

interface Props extends DataGridProps {
  paginationResponse?: PaginationType;
}

const CustomIcon = (IconComponent: any) =>
  function CustomIconWrapper(props: any) {
    return <IconComponent size={20} {...props} />;
  };

const DataGrid = ({
  className,
  slotProps,
  slots,
  paginationResponse,
  columns,
  ...props
}: Props) => {
  const rowCountRef = useRef(paginationResponse?.total_data || 0);
  const paginationMetaRef = useRef<GridPaginationMeta>(undefined);
  const prevPaginationResponse = useRef(paginationResponse);

  const rowCount = useMemo(() => {
    if (paginationResponse?.total_data !== undefined) {
      rowCountRef.current = paginationResponse.total_data;
    }
    return rowCountRef.current;
  }, [paginationResponse?.total_data]);

  const paginationMeta = useMemo(() => {
    if (!paginationResponse?.next_page || !props.paginationModel?.page)
      return { hasNextPage: false };

    const hasNextPage = paginationResponse?.next_page < props.paginationModel?.page;

    if (hasNextPage !== undefined && paginationMetaRef.current?.hasNextPage !== hasNextPage) {
      paginationMetaRef.current = { hasNextPage };
    }
    return paginationMetaRef.current;
  }, [paginationResponse]);

  const memoizedPaginationResponse = useMemo(() => {
    if (
      typeof paginationResponse === 'undefined' &&
      typeof prevPaginationResponse.current === 'undefined'
    )
      return undefined;

    if (typeof paginationResponse === 'undefined') return prevPaginationResponse.current;

    prevPaginationResponse.current = paginationResponse;
    return paginationResponse;
  }, [paginationResponse]);

  return (
    <MuiDataGrid
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10, 20, 50]}
      rowCount={memoizedPaginationResponse ? rowCount : undefined}
      paginationMode={memoizedPaginationResponse ? 'server' : 'client'}
      paginationMeta={memoizedPaginationResponse ? paginationMeta : undefined}
      rowHeight={88}
      checkboxSelection
      disableRowSelectionOnClick
      slotProps={{
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'linear-progress',
        },
        columnsManagement: {
          getTogglableColumns: () =>
            columns.filter((col) => !col.disableColumnMenu).map((col) => col.field),
        },
        ...slotProps,
      }}
      slots={{
        columnSortedAscendingIcon: CustomIcon(ChevronUp),
        columnMenuSortAscendingIcon: CustomIcon(ChevronUp),
        columnSortedDescendingIcon: CustomIcon(ChevronDown),
        columnMenuSortDescendingIcon: CustomIcon(ChevronDown),
        columnMenuManageColumnsIcon: CustomIcon(Eye),
        columnMenuHideIcon: CustomIcon(EyeOff),
        columnMenuFilterIcon: CustomIcon(Filter),
        columnFilteredIcon: CustomIcon(Filter),
        columnMenuIcon: CustomIcon(Ellipsis),
        ...slots,
      }}
      sx={{ borderRadius: '0.6rem' }}
      className={cn('flex-grow', className)}
      columns={columns.map((col) => ({
        minWidth: col.width ? 0 : 100 * (col.flex || 1),
        ...col,
      }))}
      {...props}
    />
  );
};

export default DataGrid;
