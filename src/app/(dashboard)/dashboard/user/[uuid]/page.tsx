'use client';

import { use } from 'react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';
import useGetUser from '@/lib/hooks/service/user/useGetUser';
import useUpdateUser from '@/lib/hooks/service/user/useUpdateUser';

import UserForm from '../_components/UserForm';
import { UserFormType } from '../_utils/user-schema';

const Page = ({ params: paramsPromise }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = use(paramsPromise);

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

  const { data } = useGetUser(uuid);
  const { mutate, isPending } = useUpdateUser(uuid);

  const handleSubmit = (d: UserFormType) => {
    const newData: any = { ...d };

    if (typeof newData.photo_uuid === 'string' && data) {
      newData.photo_uuid = data?.photo?.uuid || '';
    } else if (newData.photo_uuid && data?.photo) {
      // newData.remove_picture = true;
    }

    mutate(newData);
  };

  return (
    <main>
      <DashboardTitle title="Edit user" breadcrumbs={breadcrumbs} />

      <UserForm
        onSubmit={handleSubmit}
        isLoading={isPending}
        initialValue={
          data && {
            ...data,
            photo_uuid: data.photo?.url || '',
            password: '',
            password_confirmation: '',
            role_uuid: data.role.uuid,
            name: data.user_information.name,
            phone_number: data.user_information.phone_number,
            position: data.user_information.position,
          }
        }
      />
    </main>
  );
};

export default Page;
