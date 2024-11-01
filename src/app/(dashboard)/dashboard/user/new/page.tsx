'use client';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import useCreateUser from '@/lib/hooks/service/user/useCreateUser';

import UserForm from '../_components/UserForm';

const Page = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      href: '/dashboard/home',
    },
    {
      label: 'User',
      href: '/dashboard/user',
    },
    {
      label: 'New User',
    },
  ];

  const { mutate, isPending } = useCreateUser();

  return (
    <main>
      <DashboardTitle title="Create a new user" breadcrumbs={breadcrumbs} />

      <UserForm onSubmit={mutate} isLoading={isPending} />
    </main>
  );
};

export default Page;
