import React from 'react';
import { Layout, Typography } from 'antd';

export const MainFooter: React.FC = () => {
  return (
    <Layout.Footer>
      <Typography.Text
        type={'secondary'}
        children={'Footer'}
      />
    </Layout.Footer>
  );
};
