import _ from 'lodash';

import { NavItem } from '../nav_items';
import NavButton from './NavButton';

const NavListClose = ({ nav_items, isLoading }: { nav_items: NavItem[]; isLoading: boolean }) => {
  return (
    <div className="flex h-full flex-col gap-2 overflow-auto px-1 py-4">
      {isLoading ? (
        <div className="h-[63px] w-[73px] animate-wave rounded-lg bg-gray-200" />
      ) : (
        nav_items.map((item1) =>
          _.flatten(item1.items).map((item2, j) => <NavButton key={j} item={item2} />),
        )
      )}
    </div>
  );
};

export default NavListClose;
