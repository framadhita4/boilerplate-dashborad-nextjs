'use client';

import { useMemo } from 'react';

import IconButton from '@mui/material/IconButton';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import useGetUserInfo from '@/lib/hooks/service/auth/useGetUserInfo';
import useGetPermissionUser from '@/lib/hooks/service/permission/useGetPermissionUser';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getIsSideNavOpen, toggleSideNav } from '@/lib/redux/slice/navigation';

import NAV_ITEMS from './nav_items';
import NavListClose from './NavListClose';
import NavListOpen from './NavListOpen';

const SideNav = () => {
  const dispatch = useAppDispatch();
  const isSideNavOpen = useAppSelector(getIsSideNavOpen);

  const { data } = useGetUserInfo();
  const { isLoading, isPending } = useGetPermissionUser(data?.role?.uuid);
  const checkPermission = usePermission();

  const filteredNavItems = useMemo(() => {
    return NAV_ITEMS.map((overview) => {
      const tempNav = overview.items.map((item) => {
        if (item.children) {
          const filteredChildren = item.children.filter((child) =>
            checkPermission(child.permission_module, 'view'),
          );
          return { ...item, children: filteredChildren };
        }
        return item;
      });

      return {
        ...overview,
        items: tempNav.filter((item) => {
          if (typeof item.children !== 'undefined') {
            if (item.children.length === 0) return false;
            return true;
          }

          return checkPermission(item.permission_module || '', 'view');
        }),
      };
    }).filter((overview) => overview.items.length > 0);
  }, [NAV_ITEMS, checkPermission]);

  return (
    <motion.nav
      animate={{
        width: isSideNavOpen ? '300px' : '90px',
      }}
      className="fixed left-0 top-0 z-[99] h-screen overflow-visible border-r border-gray-200 px-1"
    >
      <motion.div
        className="absolute right-0 top-5 z-10 h-fit w-fit"
        animate={{
          x: '50%',
          rotate: isSideNavOpen ? 180 : 0,
        }}
      >
        <IconButton
          size="small"
          variant="outlined"
          color="gray"
          className="border-gray-300 bg-white p-1 text-gray-400 hover:bg-gray-50"
          onClick={() => dispatch(toggleSideNav())}
        >
          <ChevronRight size={20} />
        </IconButton>
      </motion.div>

      {isSideNavOpen ? (
        <NavListOpen nav_items={filteredNavItems} isLoading={isLoading || isPending} />
      ) : (
        <NavListClose nav_items={filteredNavItems} isLoading={isLoading || isPending} />
      )}
    </motion.nav>
  );
};

export default SideNav;
