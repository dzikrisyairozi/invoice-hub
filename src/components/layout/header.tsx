/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import { ThemeToggle } from '../theme-toggle';

export function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-end px-4">
        <div className="flex items-center space-x-2">
          <ThemeToggle />

          <IconButton className="text-gray-600 hover:text-gray-900">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenu}
            className="text-gray-600 hover:text-gray-900"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                src="https://github.com/shadcn.png"
                alt="John Doe"
                className="h-full w-full object-cover"
              />
            </div>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className="mt-2"
          >
            <div className="px-4 py-2">
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-500">Verified Member</div>
            </div>
            <MenuItem onClick={handleClose} className="hover:bg-gray-50">
              Profile Settings
            </MenuItem>
            <MenuItem onClick={handleClose} className="hover:bg-gray-50">
              Sign out
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}
