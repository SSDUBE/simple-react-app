import { lazy } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet } from 'react-router-dom';
import { Home } from '../views/Home';

interface IBaseRoute {
  path: string;
  Component: any;
}

export interface IRoute {
  paths: string[];
  Component: any;
  Icon?: any;
  name: string;
  roles?: string[];
}

interface IRouteItem {
  base: IBaseRoute;
  routes: IRoute[];
}

interface IRouteItems {
  [key: string]: IRouteItem;
}

const Signin = lazy(() => import('../views/Signin'));

export const RouteItems: IRouteItems = {
  open: {
    base: {
      path: '/',
      Component: null,
    },
    routes: [
      {
        paths: ['/signin'],
        Component: Signin,
        name: 'Signin',
      },
    ],
  },
  restricted: {
    base: {
      path: '/',
      Component: <Outlet />,
    },
    routes: [
      {
        paths: ['/home'],
        Component: Home,
        Icon: HomeIcon,
        name: 'Home',
        roles: ['ADMIN'],
      },
    ],
  },
};
