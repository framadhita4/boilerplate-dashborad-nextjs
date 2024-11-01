'use client';

import { useState } from 'react';

import Image from 'next/image';

import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import PasswordInput from '../../components/ui/form/PasswordInput';
import TextInput from '../../components/ui/form/TextInput';
import useLogin from '../../lib/hooks/service/auth/useLogin';
import { loginDefault, LoginFormType, loginSchema } from './_utils/login-schema';

const Page = () => {
  const [error, setError] = useState('');
  const { control, handleSubmit } = useForm<LoginFormType>({
    defaultValues: loginDefault,
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin({ errorCallback: (message) => setError(message) });

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary-800 to-primary-400 shadow-black/75 drop-shadow-lg">
      <div className="flex flex-col">
        <Image
          alt="stp-logo"
          src="/imgs/logo_stp_w.png"
          width={300}
          height={100}
          className="mx-auto mb-8 w-2/3"
        />
        <div className="flex min-w-96 flex-col items-center rounded-xl bg-white p-6">
          {/* <Typography variant="h5">Sign in to your account</Typography> */}

          <form
            className="flex w-full flex-col gap-4"
            onSubmit={handleSubmit((d) => {
              setError('');
              mutate(d);
            })}
          >
            <Typography variant="body1" className="font-semibold">
              Sign in
            </Typography>

            <TextInput control={control} fullWidth name="email" label="Email" />
            <PasswordInput control={control} fullWidth name="password" />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <LoadingButton
              loading={isPending}
              type="submit"
              variant="outlined"
              className="mt-4 p-3"
            >
              Sign In
            </LoadingButton>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
