import { Typography } from '@mui/material';

const generateCreatedUpdatedColumn = () => {
  return [
    {
      field: 'created',
      headerName: 'Created',
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="flex h-full flex-col justify-center gap-0.5">
            <Typography variant="body2">At: {params.row.created.at}</Typography>
            <Typography variant="body2">By: {params.row.created.by}</Typography>
          </div>
        );
      },
    },
    {
      field: 'updated',
      headerName: 'Updated',
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="flex h-full flex-col justify-center gap-0.5">
            <Typography variant="body2">At: {params.row.updated.at}</Typography>
            <Typography variant="body2">By: {params.row.updated.by}</Typography>
          </div>
        );
      },
    },
  ];
};

export default generateCreatedUpdatedColumn;
