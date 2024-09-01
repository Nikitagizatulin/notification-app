import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoginPage = lazy(() => import('./login/LoginPage'));
const RegisterPage = lazy(() => import('./register/RegisterPage'));
const NotificationSettings = lazy(() =>
  import('./notificationSettings/NotificationSettings')
);
const PageNotFound = lazy(() => import('./notFound/PageNotFound'));
const ProtectedRoute = lazy(() => import('../components/ProtectedRoute'));

const SpinWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Router = () => {
  const { token, user } = useSelector((state) => state.auth);
  const authenticatedUser = token && user;

  return (
    <Suspense
      fallback={
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      }
    >
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!authenticatedUser}
              redirectPath={'/notification-settings'}
            />
          }
        >
          <Route index element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={authenticatedUser} />}>
          <Route
            path="notification-settings"
            element={<NotificationSettings />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
