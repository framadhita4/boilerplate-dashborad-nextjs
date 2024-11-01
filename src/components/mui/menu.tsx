'use client';

import React, { useState } from 'react';

import { ButtonProps, IconButtonProps } from '@mui/material';
import MuiMenu, { MenuProps } from '@mui/material/Menu';

interface Props extends Omit<MenuProps, 'open'> {
  Button: any;
  buttonProps?: Partial<ButtonProps | IconButtonProps>;
}

const Menu = ({ Button, buttonProps, children, ...props }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} {...buttonProps} />
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        {...props}
      >
        {children}
      </MuiMenu>
    </>
  );
};

export default Menu;
