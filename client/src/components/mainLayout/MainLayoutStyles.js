import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Avatar, Menu } from 'antd';
const { Header } = Layout;

export const HeaderTitle = styled.p`
  float: left;
  color: var(--primary-color);
  line-height: normal;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
`;

export const LayoutLink = styled(Link)`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  text-transform: capitalize;
  transition: 0.3s;
  border-bottom: 1px solid transparent;
`;

export const LogoutButton = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  text-transform: capitalize;
`;

export const LayoutWrapper = styled(Layout)`
  background-color: #f9f9f9;
  min-height: 100vh;
  li.ant-menu-overflow-item:nth-last-child(2) {
    margin-left: auto;
  }
`;

export const CustomHeader = styled(Header)`
  max-width: 1500px;
  background-color: transparent;
  padding-inline: 25px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const UserAvatar = styled(Avatar)`
  background-color: var(--primary-color);
`;

export const HeaderMenu = styled(Menu)`
  border: none;
  flex-grow: 1;
  background: transparent;
  .ant-menu-item:hover,
  .ant-menu-item-selected {
    color: black !important;
    background-color: rgb(221, 230, 249) !important;
  }
  .ant-menu-item {
    transition: 0.3s;
    color: #858585;
    &:after {
      content: none !important ;
    }
  }
`;
