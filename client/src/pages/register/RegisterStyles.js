import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Typography } from 'antd';

const { Title } = Typography;

export const RequestAccessContainer = styled.div`
  margin: 70px auto 0;
  max-width: 691px;
  width: 100%;
`;

export const RequestAccessTitle = styled(Title)`
  text-align: center;
`;
export const CancelButton = styled(Link)`
  line-height: 1;
  width: 169px;
  font-size: 14px;
  height: 40px;
  color: var(--primary-color);
  border: 2px solid #c7c2fc;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: var(--primary-color);
  }
`;

export const SubmitButton = styled(Button)`
  background-color: var(--primary-color);
  font-size: 14px;
  width: 169px;
  height: 40px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
