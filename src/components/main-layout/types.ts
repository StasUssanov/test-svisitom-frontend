import React from 'react';

export interface ILayoutProps {
  className?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
}
