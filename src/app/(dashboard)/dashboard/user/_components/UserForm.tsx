'use react';

import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AutoComplete from '@/components/ui/form/AutoComplete';
import FormCard from '@/components/ui/form/FormCard';
import PasswordInput from '@/components/ui/form/PasswordInput';
import TelInput from '@/components/ui/form/TelephoneInput';
import TextInput from '@/components/ui/form/TextInput';
import useGetRoles from '@/lib/hooks/service/role/useGetRoles';

import { defaultUserForm, userFormSchema, UserFormType } from '../_utils/user-schema';
import ProfileImageInput from './ProfileImageInput';

interface Props {
  initialValue?: UserFormType;
  isLoading?: boolean;
  onSubmit: (data: UserFormType) => void;
}

const UserForm = ({ initialValue, isLoading, onSubmit }: Props) => {
  const { control, handleSubmit, reset } = useForm<UserFormType>({
    defaultValues: defaultUserForm,
    resolver: zodResolver(userFormSchema),
  });

  const { data: roles } = useGetRoles();

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
  }, [initialValue]);

  return (
    <form className="!mx-0 !max-w-none form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-6">
        <FormCard
          paperClassName="w-1/2 h-fit"
          className="flex flex-col items-center justify-center gap-8 py-8"
        >
          <ProfileImageInput control={control} name="photo_uuid" />
        </FormCard>
        <FormCard className="grid grid-cols-2" paperClassName="w-full h-fit">
          <TextInput control={control} name="name" label="Name" className="col-span-2" />

          <TextInput control={control} name="email" label="Email" />
          <TelInput control={control} name="phone_number" label="Phone number" />

          <PasswordInput control={control} name="password" label="Password" />
          <PasswordInput
            control={control}
            name="password_confirmation"
            label="Password confirmation"
          />

          <TextInput control={control} name="position" label="Position" />
          <AutoComplete
            control={control}
            name="role_uuid"
            options={
              roles ? roles.data.map((role) => ({ label: role.name, value: role.uuid })) : []
            }
            renderInputProps={{ label: 'Role' }}
          />
          {/* <TextInput control={control} name="asset_category" label="Asset category" /> */}
        </FormCard>
      </div>

      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        color="black"
        className="ml-auto w-fit"
      >
        {initialValue ? 'Save Changes' : 'Create User'}
      </LoadingButton>
    </form>
  );
};

export default UserForm;
