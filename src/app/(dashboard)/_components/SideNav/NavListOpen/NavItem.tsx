import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import { ChevronRight } from 'lucide-react';

import { NavItem } from '../nav_items';
import NavButton from './NavButton';

const NavItemOpen = ({ navItem }: { navItem: NavItem }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Typography
        variant="caption"
        className="group mb-1 flex w-fit cursor-pointer items-center uppercase duration-200 hover:text-inherit"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`${open ? 'rotate-90' : 'rotate-0'} w-0 overflow-hidden duration-200 group-hover:w-4`}
        >
          <ChevronRight size="1rem" />
        </span>
        {navItem.title}
      </Typography>
      <Collapse in={open}>
        {navItem.items.map((item, index) => (
          <NavButton key={index} item={item} className={index !== 0 ? 'mt-2' : ''} />
        ))}
      </Collapse>
    </div>
  );
};

export default NavItemOpen;
