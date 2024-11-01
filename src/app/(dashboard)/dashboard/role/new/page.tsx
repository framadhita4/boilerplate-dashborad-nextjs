'use client';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import useCreateRole from '@/lib/hooks/service/role/useCreateRole';

import RoleForm from '../_components/RoleForm';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'Role',
      href: '/dashboard/role',
    },
    {
      label: 'New Role',
    },
  ];

  const { mutate, isPending } = useCreateRole();

  return (
    <main>
      <DashboardTitle title="Create a new role" breadcrumbs={breadcrumbs} />

      <RoleForm onSubmit={mutate} isLoading={isPending} />
    </main>
  );
};

export default Page;
