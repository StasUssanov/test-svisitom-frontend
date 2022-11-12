import React from 'react';
import { useTranslation } from 'react-i18next';
import { routeList } from '__root/router';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';

export const MainHeader: React.FC = () => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();

  const items: MenuProps['items'] = Object.entries(routeList)
    .filter(([_, value]) => value.showInHeader)
    .map(([key, value]) => ({
      key: `header-menu-item-${key}`,
      label: t(value?.label ?? `main.${key}`),
      onClick: () => navigate(value.path),
    }));

  return (
    <Layout.Header>
      <Menu
        theme={'dark'}
        mode={'horizontal'}
        defaultSelectedKeys={['header-menu-item-0']}
        items={items}
      />
    </Layout.Header>
  );
};
