'use client';
import Image from 'next/image';
import React, {useCallback, useContext, useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1
        style={{
          background: '#006BD6',
          fontSize: '28px',
          color: 'white',
          padding: '8px 10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        チャットルーム
      </h1>
    </header>
  );
};

export default Header;
