import _ from 'lodash';

import { NavItem } from '../nav_items';
import NavItemOpen from './NavItem';

const NavListOpen = ({ nav_items, isLoading }: { nav_items: NavItem[]; isLoading: boolean }) => {
  return (
    <div className="flex h-full flex-col gap-5 overflow-auto px-5 py-4 scrollbar">
      {isLoading ? (
        <div>
          <div className="mb-2 h-6 w-1/2 animate-wave rounded bg-gray-200" />
          <div className="flex flex-col gap-2">
            {_.times(6, (index) => `nav_open_${index}`).map((item) => (
              <div key={item} className="h-12 w-full animate-wave rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      ) : (
        nav_items.map((navItem, index) => <NavItemOpen key={index} navItem={navItem} />)
      )}
    </div>
  );
};

export default NavListOpen;
