'use client';

import { use, useMemo } from 'react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import useGetRole from '@/lib/hooks/service/role/useGetRole';

import PermissionTable from './_components/PermissionTable';

const Page = ({ params: paramsPromise }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = use(paramsPromise);

  const { data } = useGetRole(uuid);

  const breadcrumbs = useMemo(() => {
    return [
      {
        label: 'Dashboard',
        href: '/dashboard/home',
      },
      {
        label: 'Role',
        href: '/dashboard/role',
      },
      {
        label: data?.name || 'Role',
        href: `/dashboard/role/${uuid}`,
      },
      {
        label: 'Permission',
      },
    ];
  }, [data]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="Permission Configuration" breadcrumbs={breadcrumbs} />
      </div>

      <PermissionTable uuid={uuid} />
    </div>
  );
};

export default Page;
