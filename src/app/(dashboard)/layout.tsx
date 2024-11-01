'use client';

import { Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { useAppSelector } from '../../lib/redux/hooks';
import { getIsSideNavOpen } from '../../lib/redux/slice/navigation';
import DashboardHeader from './_components/Header';
import SideNav from './_components/SideNav';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isSideNavOpen = useAppSelector(getIsSideNavOpen);

  return (
    <div className="flex min-h-screen w-full">
      <SideNav />
      <motion.div
        animate={{
          paddingLeft: isSideNavOpen ? '300px' : '90px',
        }}
        className="relative flex h-screen w-full flex-col"
      >
        <DashboardHeader />
        <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-grow flex-col gap-8 p-6 pb-6 2xl:pb-16">
          {children}
        </main>
        <div className="w-full border-t px-4 py-2 text-end">
          <Typography variant="body2" className="w-full">
            PT. Boilerplate TEST
          </Typography>
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;
