import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import MainLayoutComponent from '../../components/mainLayout/MainLayoutComponent';

const NotFound = () => (
  <MainLayoutComponent>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button>
          <Link to="/">Back</Link>
        </Button>
      }
    />
  </MainLayoutComponent>
);

export default NotFound;
