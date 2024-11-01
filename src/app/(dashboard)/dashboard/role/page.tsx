'use client';

import Link from 'next/link';

import Button from '@mui/material/Button';

import _ from 'lodash';
import { CirclePlus } from 'lucide-react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import { usePermission } from '@/lib/hooks/service/permission/usePermission';

import RoleTable from './_components/RoleTable';

const Page = () => {
  const checkPermission = usePermission();

  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'Role',
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="Role List" breadcrumbs={breadcrumbs} />

        {checkPermission('role', 'create') && (
          <Button
            startIcon={<CirclePlus />}
            variant="contained"
            color="black"
            LinkComponent={Link}
            href="/dashboard/role/new"
          >
            New Role
          </Button>
        )}
      </div>

      <RoleTable />
    </div>
  );
};

export default Page;
