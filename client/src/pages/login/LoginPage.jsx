import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Alert, Input } from 'antd';

import { loginUser } from '../../store/slices/authStore/authActions';
import { resetErrors } from '../../store/slices/authStore/authSlice';
import MainLayoutComponent from '../../components/mainLayout/MainLayoutComponent';
import {
  LoginContainer,
  LoginButton,
  LinkButton,
  LinkWrapper,
} from './LoginPageStyles';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(loginUser(values));
  };
  useEffect(() => () => dispatch(resetErrors()), [dispatch]);

  return (
    <MainLayoutComponent>
      <LoginContainer>
        {error && <Alert type="error" message={error} banner />}
        <br />
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input size="large" placeholder="Your Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <LoginButton type="primary" htmlType="submit" loading={isLoading}>
              Login
            </LoginButton>
          </Form.Item>
          <Form.Item>
            <LinkWrapper>
              <LinkButton to="/">Registrate</LinkButton>
            </LinkWrapper>
          </Form.Item>
        </Form>
      </LoginContainer>
    </MainLayoutComponent>
  );
};

export default Login;
