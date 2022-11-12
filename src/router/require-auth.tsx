import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { routeList } from '__root/router/route-list';
import { config } from '__root/config';

export const RequireAuth: React.FC = () => {
  if (!localStorage.getItem(config.tokens.access)) return (<Navigate to={routeList.auth.path} replace/>);
  return <Outlet/>;
};
