import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Divider } from 'antd';

import { LayoutWrapper } from './MainLayoutStyles';
import MainLayoutHeader from './MainLayoutHeader';
const { Content } = Layout;

const MainLayoutComponent = ({ children }) => (
  <LayoutWrapper>
    <MainLayoutHeader />
    <Divider style={{ margin: 0 }} />
    <Content style={{ display: 'flex', flexDirection: 'column', padding: 15 }}>
      {children}
    </Content>
  </LayoutWrapper>
);
MainLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayoutComponent;
