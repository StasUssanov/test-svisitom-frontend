import { createBrowserRouter } from 'react-router-dom';
import { routeList } from './route-list';
import { AuthPage, HomePage } from '__root/pages';
import { RequireAuth } from './require-auth';

export const router = createBrowserRouter([
  {
    path: routeList.auth.path,
    element: <AuthPage/>,
  },
  {
    element: <RequireAuth/>,
    children: [
      {
        path: routeList.home.path,
        element: <HomePage/>,
      },
    ],
  },
]);
