import { HTMLProps } from 'react';

import Typography from '@mui/material/Typography';

import Breadcrumbs from './breadcrumbs';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  subTitle?: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

const DashboardTitle = ({ breadcrumbs, title, subTitle }: Props) => {
  return (
    <div className="w-fit">
      <div className="mb-3">
        <Typography variant="h5" className="font-bold">
          {title}
        </Typography>
        {subTitle && <Typography variant="body2">{subTitle}</Typography>}
      </div>

      {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
    </div>
  );
};

export default DashboardTitle;
