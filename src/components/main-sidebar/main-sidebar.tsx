import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, MenuProps } from 'antd';
import { routeList } from '__root/router';
import { useNavigate } from 'react-router-dom';

export const MainSidebar: React.FC = () => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();

  const items: MenuProps['items'] = Object.entries(routeList)
    .filter(([_, value]) => value.showInSidebar)
    .map(([key, value]) => ({
      key: `header-menu-item-${key}`,
      label: t(value?.label ?? `sider.main.${key}`),
      onClick: () => navigate(value.path),
    }));

  return (
    <Layout.Sider>
      <Menu
        mode={'inline'}
        items={items}
      />
    </Layout.Sider>
  );
};
