import { createBrowserRouter } from 'react-router-dom';
import { routeList } from './route-list';
import { HomePage } from '__root/pages';

export const router = createBrowserRouter([
  {
    path: routeList.home.path,
    element: <HomePage/>,
  },
]);
