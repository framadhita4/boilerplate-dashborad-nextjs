import { useMemo, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Popover } from '@mui/material';
import Button from '@mui/material/Button';
import Typograhy from '@mui/material/Typography';

import { ChevronRight } from 'lucide-react';

import { OverViewItem } from '../nav_items';

const NavButton = ({ item }: { item: OverViewItem }) => {
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = open ? 'hover-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        variant={pathname === item.pathname ? 'ghost' : 'text'}
        color={pathname === item.pathname ? 'primary' : 'gray'}
        className="relative w-full flex-col px-4 py-3"
        LinkComponent={item.children ? undefined : Link}
        href={item.children ? undefined : item.pathname}
        onClick={handleClick}
      >
        <Typograhy variant="body1" className="flex flex-col items-center gap-1 px-2 text-xs">
          <item.icon size="1.2rem" />
          {item.label}
        </Typograhy>
        {item.children && <ChevronRight size="1.2rem" className="absolute right-1 top-3" />}
      </Button>
      {item.children && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={() => setAnchorEl(null)}
        >
          <div className="flex min-w-52 flex-col gap-1 p-2" role="menu" tabIndex={0}>
            {item.children?.map((child, i) => (
              <Button
                LinkComponent={Link}
                href={child.pathname}
                key={i}
                className="justify-start"
                onClick={() => setAnchorEl(null)}
                color="gray"
              >
                {child.label}
              </Button>
            ))}
          </div>
        </Popover>
      )}
    </>
  );
};

export default NavButton;
