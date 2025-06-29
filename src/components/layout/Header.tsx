'use client';
import Image from 'next/image';
import React, {useState} from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Parrot-Chat
        </Typography>
        <Button
          color="inherit"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : 'undefined'}
          aria-haspopup="true"
          aria-expanded={open ? true : undefined}
          onClick={handleClick}
        >
          ログアウト
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>ログアウトする</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
