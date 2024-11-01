import { useMemo, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button, Collapse, Typography } from '@mui/material';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { OverViewItem } from '../nav_items';
import NavButtonChildren from './NavButtonChildren';

interface Props {
  item: OverViewItem;
  className?: string;
}

const NavChildrenWrapper = ({ item, className }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return (
      pathname === item.pathname ||
      (pathname.startsWith(`${item.pathname}/`) && !pathname.startsWith(`${item.pathname}-`))
    );
  }, [pathname]);

  return (
    <div className="w-full">
      <Button
        variant={open || isActive ? 'ghost' : 'text'}
        // eslint-disable-next-line no-nested-ternary
        color={isActive ? 'primary' : open ? 'black' : 'gray'}
        className={cn('w-full items-center justify-between px-4 py-3', className)}
        onClick={() => setOpen(!open)}
      >
        <Typography variant="body1" className="flex items-center gap-3 font-normal">
          <item.icon size="1.2rem" />
          {item.label}
        </Typography>
        <ChevronRight
          size="1.2rem"
          className={cn('transform transition-transform', { 'rotate-90': open })}
        />
      </Button>
      <Collapse in={open}>
        {item.children?.map((child, index) => (
          <NavButtonChildren
            key={index}
            item={child}
            last={index === (item.children || []).length - 1}
          />
        ))}
      </Collapse>
    </div>
  );
};

export default NavChildrenWrapper;
