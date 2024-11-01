import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@mui/material';

import { OverViewItem_2 } from '../nav_items';

interface Props {
  item: OverViewItem_2;
  last: boolean;
}

const NavButtonChildren = ({ item, last }: Props) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return item.isHome
      ? pathname === item.pathname
      : pathname === `${item.pathname}` || pathname.startsWith(`${item.pathname}/`);
  }, [pathname]);

  return (
    <div className="relative w-full pl-8">
      <div className="absolute left-4 top-0 h-2/3 w-4 rounded-bl-lg border-2 border-r-0 border-t-0 border-gray-300" />
      {!last && <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300" />}
      <Button
        variant={isActive ? 'ghost' : 'text'}
        LinkComponent={Link}
        href={item.pathname}
        color="gray"
        className="mt-1 w-full justify-start !py-2 px-4"
      >
        {item.label}
      </Button>
    </div>
  );
};

export default NavButtonChildren;
