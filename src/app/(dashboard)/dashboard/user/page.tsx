'use client';

import Link from 'next/link';

import Button from '@mui/material/Button';

import _ from 'lodash';
import { CirclePlus } from 'lucide-react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';

import UserTable from './_components/UserTable';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'User',
    },
  ];

  const checkPermission = usePermission();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="User List" breadcrumbs={breadcrumbs} />

        {checkPermission('user', 'create') && (
          <Button
            startIcon={<CirclePlus />}
            variant="contained"
            color="black"
            LinkComponent={Link}
            href="/dashboard/user/new"
          >
            New User
          </Button>
        )}
      </div>

      <UserTable />
    </div>
  );
};

export default Page;
