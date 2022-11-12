import React from 'react';
import { ILayoutProps } from './types';
import './main-layout.less';
import { Layout as AntdLayout } from 'antd';
import classNames from 'classnames';
import { MainFooter, MainHeader, MainSidebar } from '__root/components';

const { Content } = AntdLayout;

export const MainLayout: React.FC<ILayoutProps> = (props) => {
  const {
    showHeader = true,
    showSidebar = false,
  } = props;

  return (
    <AntdLayout className={classNames('sv-layout', props.className)}>
      {showHeader && <MainHeader/>}
      <AntdLayout>
        {showSidebar && <MainSidebar/>}
        <AntdLayout>
          <Content
            className={'sv-layout__content'}
            children={props.children}
          />
          <MainFooter/>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};
