'use client';

import { useMemo } from 'react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import useGetRole from '@/lib/hooks/service/role/useGetRole';
import useUpdateRole from '@/lib/hooks/service/role/useUpdateRole';

import RoleForm from '../_components/RoleForm';

const Page = ({ params: { uuid } }: { params: { uuid: string } }) => {
  const { data } = useGetRole(uuid);
  const { mutate, isPending } = useUpdateRole(uuid);

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
        label: data?.name || 'Edit Role',
      },
    ];
  }, [data]);

  return (
    <main>
      <DashboardTitle title="Edit role" breadcrumbs={breadcrumbs} />

      <RoleForm
        onSubmit={mutate}
        isLoading={isPending}
        initialValues={
          data && {
            ...data,
          }
        }
      />
    </main>
  );
};

export default Page;
