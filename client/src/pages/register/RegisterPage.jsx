import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Alert, Input } from 'antd';

import SubmitButton from '../../components/common/SubmitButton';
import {
  ButtonWrapper,
  CancelButton,
  RequestAccessContainer,
  RequestAccessTitle,
} from './RegisterStyles';
import MainLayoutComponent from '../../components/mainLayout/MainLayoutComponent';
import { registerUser } from '../../store/slices/authStore/authActions';
import { resetErrors } from '../../store/slices/authStore/authSlice';

const RequestAccess = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => () => dispatch(resetErrors()), [dispatch]);

  const onFinish = (values) => {
    dispatch(registerUser(values));
  };

  return (
    <MainLayoutComponent>
      <RequestAccessContainer>
        {error && <Alert type="error" message={error} banner />}
        <br />
        <RequestAccessTitle level={2}>Registration form</RequestAccessTitle>
        <Form name="register" onFinish={onFinish} scrollToFirstError>
          <Row gutter={[10, 0]}>
            <Col sm={12} xs={24}>
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
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name="userName"
                rules={[
                  {
                    max: 30,
                    min: 3,
                    required: true,
                    message: 'Please input your full name!',
                    whitespace: true,
                  },
                ]}
              >
                <Input size="large" placeholder="User Full Name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="password"
            maxLength={32}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern:
                  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                message:
                  'Password must contain from 8 to 32 letters, with at least a symbol, upper and lower case letters and a number',
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Password Confirm" />
          </Form.Item>
          <ButtonWrapper>
            <CancelButton to="/login">Cencel</CancelButton>
            <SubmitButton type="primary" htmlType="submit" loading={isLoading}>
              Register
            </SubmitButton>
          </ButtonWrapper>
        </Form>
      </RequestAccessContainer>
    </MainLayoutComponent>
  );
};
export default RequestAccess;
