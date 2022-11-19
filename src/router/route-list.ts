import { TRouteList } from './types';

export const routeList: TRouteList = {
  auth: {
    path: '/login',
    showInHeader: false,
  },
  home: {
    path: '/',
    showInHeader: true,
  },
};
