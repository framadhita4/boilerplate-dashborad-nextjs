'use client';

import { usePathname } from 'next/navigation';

import { Typography } from '@mui/material';

import { motion } from 'framer-motion';

import { useAppSelector } from '../../lib/redux/hooks';
import { getIsSideNavOpen } from '../../lib/redux/slice/navigation';
import DashboardHeader from './_components/Header';
import SideNav from './_components/SideNav';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isSideNavOpen = useAppSelector(getIsSideNavOpen);
  const path = usePathname();

  return (
    <div className="flex min-h-screen w-full">
      <SideNav />
      <motion.div
        animate={{
          paddingLeft: isSideNavOpen ? '310px' : '100px',
        }}
        className="relative flex h-screen w-full flex-col"
      >
        <DashboardHeader />
        <motion.main
          key={path}
          variants={{
            out: {
              opacity: 0,
              y: 40,
              transition: {
                duration: 0,
              },
            },
            in: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.75,
                delay: 0.25,
                type: 'spring',
              },
            },
          }}
          animate="in"
          initial="out"
          exit="out"
          className="mx-auto flex w-full flex-1 flex-grow flex-col gap-8 p-6 px-12 pb-6 2xl:pb-16"
        >
          {children}
        </motion.main>
        <div className="w-full border-t px-4 py-2 text-end">
          <Typography variant="body2" className="w-full">
            PT. Sinergi Teknoglobal Perkasa
          </Typography>
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;
