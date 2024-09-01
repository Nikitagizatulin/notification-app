import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './pages/router';
import { createGlobalStyle } from 'styled-components';
import { store } from './store';
import { ConfigProvider } from 'antd';

const GlobalStyle = createGlobalStyle`
html{
    min-height:100%;
    position:relative;
}
body{
    height:100%;
    min-height: 100vh;
}
:root {
   --primary-color: ${({ colorPrimary }) => colorPrimary};
}
`;
const colorPrimary = '#2662dc';

const App = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
          colorBgMask: '#022366a8',
        },
        components: {
          Switch: {
            colorPrimary: '#1AAE9F',
            colorPrimaryHover: '#1AAE9F',
          },
        },
      }}
    >
      <BrowserRouter>
        <GlobalStyle colorPrimary={colorPrimary} />
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

export default App;
