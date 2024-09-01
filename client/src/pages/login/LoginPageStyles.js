import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';

export const LoginContainer = styled.div`
  margin: 23vh auto 0;
  max-width: 355px;
  width: 100%;
`;
export const LinkButton = styled(Link)`
  border-bottom: 2px solid #c7c2fc;
  line-height: 1;
  color: var(--primary-color);
  font-size: 14px;
  &:hover {
    color: var(--primary-color);
  }
  &:first-child {
    margin-bottom: 15px;
  }
`;

export const LoginButton = styled(Button)`
  background-color: var(--primary-color);
  width: 100%;
  height: 40px;
  font-size: 14px;
`;
export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
