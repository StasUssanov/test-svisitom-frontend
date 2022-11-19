import React from 'react';
import './main-header.less';
import { useTranslation } from 'react-i18next';
import { routeList } from '__root/router';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, MenuProps, Tooltip } from 'antd';
import { LocaleSelector } from '__root/locales';
import { LogoutOutlined } from '@ant-design/icons';
import { usePresenter } from './main-header.use-presenter';

export const MainHeader: React.FC = () => {
  const { t } = useTranslation('navigation');
  const pr = usePresenter();
  const navigate = useNavigate();

  const items: MenuProps['items'] = Object.entries(routeList)
    .filter(([_, value]) => value.showInHeader)
    .map(([key, value]) => ({
      key: `header-menu-item-${key}`,
      label: t(value?.label ?? `main.${key}`),
      onClick: () => navigate(value.path),
    }));

  return (
    <Layout.Header className={'sv-main-header'}>
      <Menu
        mode={'horizontal'}
        defaultSelectedKeys={['header-menu-item-0']}
        items={items}
      />
      <div className={'sv-main-header__right-box'}>
        <LocaleSelector/>
        <Tooltip title={t('auth:button.signOut')}>
          <Button
            type={'ghost'}
            shape={'circle'}
            icon={<LogoutOutlined/>}
            onClick={pr.onSignOut}
            loading={pr.loading}
          />
        </Tooltip>
      </div>
    </Layout.Header>
  );
};
