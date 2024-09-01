import React, { useEffect, useCallback } from 'react';
import { Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined,BellOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { logout } from '../../store/slices/authStore/authSlice';
import {
  LayoutLink,
  LogoutButton,
  UserAvatar,
  CustomHeader,
  HeaderMenu,
  HeaderTitle,
} from './MainLayoutStyles';

export default function MainLayoutHeader() {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    let authJWT = localStorage.getItem('userToken');
    authJWT = authJWT ? jwt_decode(authJWT) : null;
    if (authJWT?.exp * 1000 < Date.now()) {
      onLogOut();
    }
  }, [onLogOut]);

  const { token, user } = useSelector((state) => state.auth);
  const authenticatedUser = token && user;

  const items = [
    {
      key: '1',
      danger: true,
      icon: <LogoutOutlined rotate={180} />,
      onClick: onLogOut,
      label: <LogoutButton>Logout</LogoutButton>,
    },
  ];
  const menuItems = [];
  if (authenticatedUser) {
    menuItems.push({
      key: '/notification-settings',
      label: (
        <LayoutLink to={'/notification-settings'}>
          Notification Settings
        </LayoutLink>
      ),
    });
  }
  if (authenticatedUser) {
    menuItems.push({
      key: 'logout',
      label: (
        <Dropdown menu={{ items }} trigger="click" placement="bottom">
          <UserAvatar
            size="large"
            icon={<UserOutlined style={{ fontSize: '24px' }} />}
          />
        </Dropdown>
      ),
    });
  } else {
    menuItems.push({
      key: 'login',
      label: <LayoutLink to="/login">Login</LayoutLink>,
    });
  }
  return (
    <CustomHeader>
      <HeaderTitle>
        Notification app <BellOutlined />
      </HeaderTitle>
      <HeaderMenu mode="horizontal" selectedKeys={[]} items={menuItems} />
    </CustomHeader>
  );
}
