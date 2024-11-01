'use react';

import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormCard from '@/components/ui/form/FormCard';
import TextInput from '@/components/ui/form/TextInput';

import { defaultRoleForm, roleFormSchema, RoleFormType } from '../_utils/role-schema';

interface Props {
  isLoading?: boolean;
  onSubmit: (data: RoleFormType) => void;
  initialValues?: RoleFormType;
}

const RoleForm = ({ initialValues, onSubmit, isLoading }: Props) => {
  const { control, handleSubmit, reset } = useForm<RoleFormType>({
    defaultValues: defaultRoleForm,
    resolver: zodResolver(roleFormSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues); // Update the form values when initialValues changes
    }
  }, [initialValues, reset]);

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="Details" subTitle="Name, code, description...">
        <TextInput control={control} name="name" label="Nama" />
        <TextInput control={control} name="code" label="Code" />
        <TextInput control={control} name="description" label="Description" rows={3} multiline />
      </FormCard>

      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        color="black"
        className="ml-auto w-fit"
      >
        {initialValues ? 'Save Changes' : 'Create Role'}
      </LoadingButton>
    </form>
  );
};

export default RoleForm;
