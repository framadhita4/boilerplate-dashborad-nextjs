import { HTMLProps } from 'react';

import Link from 'next/link';

import MuiBreadCrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import { Dot } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props extends HTMLProps<HTMLDivElement> {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
}

const Breadcrumbs = ({ breadcrumbs, className, ...props }: Props) => {
  return (
    <div className={cn('flex', className)} {...props}>
      <MuiBreadCrumbs separator={<Dot className="-mx-2" />}>
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.href ? (
            <Link
              key={index}
              href={breadcrumb.href}
              className="text-sm font-medium text-slate-900 hover:underline"
            >
              <Typography variant="body2">{breadcrumb.label}</Typography>
            </Link>
          ) : (
            <Typography key={index} variant="body2" className="pointer-events-none !text-slate-400">
              {breadcrumb.label}
            </Typography>
          ),
        )}
      </MuiBreadCrumbs>
    </div>
  );
};

export default Breadcrumbs;
