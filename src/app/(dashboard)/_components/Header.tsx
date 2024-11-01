'use client';

import Link from 'next/link';

import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import { BadgeDollarSign } from 'lucide-react';

import ProfileMenu from '../../_components/ProfileMenu';

const DashboardHeader = () => {
  return (
    <nav className="x-12 sticky top-0 z-50 flex w-full items-center justify-between gap-8 border-b bg-white/50 px-6 py-2 backdrop-blur backdrop-filter">
      <Link href="/">ATENSI</Link>
      <div className="flex items-center gap-4">
        <ProfileMenu>
          {/* <Link href="/">
            <MenuItem>
              <ListItemIcon>
                <BadgeDollarSign size={20} />
              </ListItemIcon>
              Cashier
            </MenuItem>
          </Link> */}
        </ProfileMenu>
      </div>
    </nav>
  );
};

export default DashboardHeader;
