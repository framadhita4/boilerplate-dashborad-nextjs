import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import { LogOut, UserRoundPen } from 'lucide-react';

import useGetUserInfo from '@/lib/hooks/service/auth/useGetUserInfo';
import useLogout from '@/lib/hooks/service/auth/useLogout';

import Menu from '../../components/mui/menu';

const ProfileMenu = ({ children }: { children?: React.ReactNode }) => {
  const { data } = useGetUserInfo();

  const { mutate, isPending } = useLogout();

  return (
    <Menu
      Button={Button}
      buttonProps={{
        children: (
          <>
            <Avatar className="border border-primary bg-transparent uppercase text-primary" />
            {data?.role.name}
          </>
        ),
        className: 'gap-2',
      }}
      PaperProps={{
        className: 'min-w-40',
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {/* <Link href="/dashboard/edit-profile">
        <MenuItem>
          <ListItemIcon>
            <UserRoundPen size={20} />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
      </Link> */}
      {children}
      {/* <Divider className="my-1" /> */}
      <MenuItem disabled={isPending} onClick={() => mutate()} color="error">
        <ListItemIcon>
          <LogOut size={20} />
        </ListItemIcon>
        Log-Out
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
