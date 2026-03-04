import { createBrowserRouter } from 'react-router';
import { Overview } from './pages/Overview';
import { Monitor } from './pages/Industrial';
import { Tariff } from './pages/Tariff';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Overview,
  },
  {
    path: '/monitor',
    Component: Monitor,
  },
  {
    path: '/industrial',
    Component: Monitor,
  },
  {
    path: '/stats/:serviceNo',
    Component: Tariff,
  },
  {
    path: '/tariff',
    Component: Tariff,
  },
]);
