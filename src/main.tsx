import React from 'react';
import ReactDOM from 'react-dom/client';
import '__root/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from '__root/router';
import '__root/locales';
import { ConfigProvider as AntConfigProvider, message } from 'antd';

message.config({ prefixCls: 'sv-message' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AntConfigProvider prefixCls={'sv'}>
      <RouterProvider router={router}/>
    </AntConfigProvider>
  </React.StrictMode>,
);
