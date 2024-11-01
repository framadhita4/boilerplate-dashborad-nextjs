'use client';

import React from 'react';

import DashboardTitle from '@/components/ui/dashboard/DashboardTitle';

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex w-full items-center justify-between">
        <DashboardTitle title="Hi, Welcome back 👋" />
      </div>

      <div className="flex flex-1 flex-col gap-6">lorem</div>
    </div>
  );
};

export default Page;
